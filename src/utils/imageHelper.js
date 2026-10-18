import { BASE_URL } from "@/config";

/**
 * Extracts a Google Drive file ID from an object, URL, or raw ID string.
 * Supports:
 * - Object: { fileId: "..." }, { fileUrl: "..." }, { url: "..." }, { imageUrl: "..." }
 * - Direct UC URLs: https://drive.google.com/uc?id=XYZ&export=download
 * - File URLs: https://drive.google.com/file/d/XYZ/view or /preview
 * - Open/Thumbnail URLs: https://drive.google.com/open?id=XYZ or thumbnail?id=XYZ
 * - Usercontent URLs: https://drive.usercontent.google.com/download?id=XYZ
 * - Googleusercontent: https://lh3.googleusercontent.com/d/XYZ
 * - Raw Google Drive file IDs (alphanumeric string of length >= 20 without / or ?)
 */
export const extractDriveFileId = (source) => {
  if (!source) return null;

  if (typeof source === "object") {
    if (source.fileId && typeof source.fileId === "string") {
      return extractDriveFileId(source.fileId);
    }
    const candidateUrl =
      source.fileUrl || source.url || source.imageUrl || source.src || source.image;
    if (candidateUrl && typeof candidateUrl === "string") {
      return extractDriveFileId(candidateUrl);
    }
    return null;
  }

  if (typeof source !== "string") return null;

  const trimmed = source.trim();
  if (!trimmed) return null;

  // Pattern 1: id query param (e.g. ?id=XYZ, &id=XYZ)
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (idParamMatch && idParamMatch[1]) {
    return idParamMatch[1];
  }

  // Pattern 2: /d/XYZ or /d/XYZ/preview or /d/XYZ=w1200
  const dPathMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/i);
  if (dPathMatch && dPathMatch[1]) {
    return dPathMatch[1];
  }

  // Pattern 3: If it's a raw Drive ID without slashes, queries, or whitespace, length >= 20
  if (
    !trimmed.includes("/") &&
    !trimmed.includes("?") &&
    !trimmed.includes("&") &&
    !trimmed.includes(" ") &&
    trimmed.length >= 20
  ) {
    return trimmed;
  }

  return null;
};

/**
 * Returns a safe image URL that will NOT be blocked by Google's CORP / ORB policies.
 * Automatically proxies Google Drive files through the backend image proxy.
 */
export const getSafeImageUrl = (source, fallback = "/placeholder.svg") => {
  if (!source) return fallback;

  // 1. If it's a Drive file or contains a Drive ID, always route through backend image proxy
  const fileId = extractDriveFileId(source);
  if (fileId) {
    return `${BASE_URL}/api/image-proxy/${fileId}`;
  }

  // 2. If it's an object with a non-drive URL
  if (typeof source === "object") {
    const rawUrl = source.fileUrl || source.url || source.imageUrl || source.src;
    if (
      rawUrl &&
      typeof rawUrl === "string" &&
      !rawUrl.includes("drive.google.com") &&
      !rawUrl.includes("drive.usercontent.google.com")
    ) {
      return rawUrl;
    }
    return fallback;
  }

  // 3. If it's already an external non-Drive URL or asset path
  if (typeof source === "string") {
    const trimmed = source.trim();
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("/") ||
      trimmed.startsWith("data:")
    ) {
      // If it still points to Google Drive domain, don't use it directly (it will be blocked by ORB)
      if (
        trimmed.includes("drive.google.com") ||
        trimmed.includes("drive.usercontent.google.com")
      ) {
        return fallback;
      }
      return trimmed;
    }
  }

  return fallback;
};

/**
 * Returns a fallback avatar URL using initials.
 */
export const getAvatarFallback = (fullName = "Member") => {
  const safeName = (fullName && typeof fullName === "string" ? fullName : "Member").trim();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    safeName
  )}&background=ca0019&color=ffffff&size=300`;
};
