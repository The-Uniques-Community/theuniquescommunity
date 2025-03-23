import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SCOPES = ['https://www.googleapis.com/auth/drive'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let auth;
if (process.env.NODE_ENV === 'production') {
  // Load credentials from environment variable
  const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: SCOPES,
  });
} else {
  // Load credentials from a local service.json file for development
  const KEYFILEPATH = path.join(__dirname, '../service.json');
  auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
}

const drive = google.drive({ version: 'v3', auth });

/**
 * Create a folder on Google Drive.
 */
export async function createFolder(name, parentId = null) {
  const fileMetadata = {
    name,
    mimeType: 'application/vnd.google-apps.folder',
    ...(parentId && { parents: [parentId] }),
  };

  const folder = await drive.files.create({
    resource: fileMetadata,
    fields: 'id, name',
  });
  return folder.data;
}

/**
 * Find a folder by name under a specific parent.
 */
export async function findFolder(name, parentId = null) {
  let query = `mimeType='application/vnd.google-apps.folder' and name='${name}' and trashed=false`;
  if (parentId) {
    query += ` and '${parentId}' in parents`;
  }
  const res = await drive.files.list({
    q: query,
    fields: 'files(id, name)',
  });
  return res.data.files && res.data.files.length > 0 ? res.data.files[0] : null;
}

/**
 * Create or retrieve the folder structure:
 *  - Main folder (e.g. "The Uniques 2.0")
 *  - Student folder (using the student ID) inside the main folder
 *  - One or more subfolders (e.g. "certificate", "achievement", "profile") inside the student folder
 */
export async function createFolderStructure(mainFolderName, studentId, subfolders = []) {
  // Main folder
  let mainFolder = await findFolder(mainFolderName);
  if (!mainFolder) {
    mainFolder = await createFolder(mainFolderName);
  }
  // Student-specific folder inside the main folder
  let studentFolder = await findFolder(studentId, mainFolder.id);
  if (!studentFolder) {
    studentFolder = await createFolder(studentId, mainFolder.id);
  }
  // Create subfolders inside the student folder
  const createdSubfolders = {};
  for (const subfolderName of subfolders) {
    let subfolder = await findFolder(subfolderName, studentFolder.id);
    if (!subfolder) {
      subfolder = await createFolder(subfolderName, studentFolder.id);
    }
    createdSubfolders[subfolderName] = subfolder;
  }
  return {
    mainFolder,
    studentFolder,
    subfolders: createdSubfolders,
  };
}

/**
 * Upload a file to a specific folder on Google Drive.
 */
export async function uploadFile(filePath, destinationFolderId) {
  const fileName = path.basename(filePath);
  const fileMetadata = {
    name: fileName,
    parents: [destinationFolderId],
  };
  const media = {
    body: fs.createReadStream(filePath),
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id, name',
  });
  const fileId = file.data.id;
  const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
  return {
    fileName: file.data.name,
    fileId,
    fileUrl,
  };
}
