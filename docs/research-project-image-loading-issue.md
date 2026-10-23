# Research Report: Project Image Loading Failure Analysis

**Author:** Antigravity Engineering  
**Date:** 2026-10-22  
**Repositories Investigated:**  
- Frontend: `theuniquescommunity` (`/run/media/jimfleax/DEV/Projects/theuniquescommunity`)
- Backend: `The-Uniques-Portal` (`/run/media/jimfleax/DEV/Projects/The-Uniques-Portal`)

---

## 1. Executive Summary

When inspecting the Projects page in `theuniquescommunity`, local static project assets such as `/projects/unicare.webp` load successfully, whereas Google Drive-backed proxy assets such as `/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz` fail to load and present broken image icons.

This report documents the root causes discovered through primary source analysis across source code, network traces, server configuration, and live API responses.

### Key Finding
The issue is **not** that the backend fails to serve the image. Direct querying of the backend server (`https://the-uniques-portal.vercel.app/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz`) returns `HTTP/2 200 OK` with `Content-Type: image/png`.

The root failure is an **origin mismatch and routing collapse**:
1. The backend stores and returns `image: "/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz"` as a **root-relative path**.
2. The frontend web application is hosted on a separate domain (e.g. `https://www.theuniques.in` in production, or `localhost:5173` without full URL resolution).
3. In `Projects/index.jsx` and `ProjectDetails.jsx`, the frontend passes `project.image` directly to `<img src={project.image} />` without prepending the backend `BASE_URL`.
4. The browser resolves root-relative `/api/...` against the **frontend host** (`https://www.theuniques.in/api/image-proxy/...`).
5. The frontend's host configuration (`vercel.json`) has a single catch-all SPA rewrite (`/(.*) -> /index.html`) with no reverse-proxy rule for `/api/*`.
6. As a result, the frontend host responds with `HTTP 200` containing `<!DOCTYPE html><html lang="en">...` (`Content-Type: text/html`). The browser attempts to parse this HTML document as an image binary, fails, and fires an `error` event.
7. Conversely, `/projects/unicare.webp` loads because the file physically exists on the frontend file system at `public/projects/unicare.webp` and is served as static WebP by the web server.

---

## 2. Evidence & Primary Source Investigation

### 2.1 Backend Live API Verification
We queried the backend endpoint currently running in production at `https://the-uniques-portal.vercel.app/api/projects`.

**API Response Item (`_id: 6ad918977074f56f2bf16e18`):**
```json
{
  "_id": "6ad918977074f56f2bf16e18",
  "title": "UNIQUE eGYAN",
  "batch": "Uniques 4.0",
  "description": "UNIQUE eGYAN is a study platform for Uniques Community students...",
  "image": "/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz",
  "technologies": ["REACT", "NODE.JS", "MONGODB"],
  "category": "Academic & Learning",
  "link": "https://uniques-egyan.theuniques.in",
  "status": "Active"
}
```
*Source:* `GET https://the-uniques-portal.vercel.app/api/projects`

### 2.2 Direct Backend Proxy Test
We executed an HTTP request directly against the backend image proxy endpoint:
```bash
curl -i "https://the-uniques-portal.vercel.app/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz"
```
**Result:**
```http
HTTP/2 200 
access-control-allow-credentials: true
cache-control: public, max-age=86400
content-type: image/png
server: Vercel
x-vercel-cache: HIT
```
*Source:* Backend Express route in `The-Uniques-Portal/server/index.js#L188-L212`:
```javascript
app.get("/api/image-proxy/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  const drive = getDrive();
  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  res.setHeader("Content-Type", response.headers["content-type"] || "image/jpeg");
  res.setHeader("Cache-Control", "public, max-age=86400");
  response.data.pipe(res);
});
```
The file ID exists in Google Drive, the service account successfully authenticates and streams it, and the backend returns the image as `image/png`.

### 2.3 Live Frontend Request Test
We simulated the exact request issued by a user's browser visiting the frontend at `https://theuniques.in`:
```bash
curl -i -L "https://theuniques.in/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz"
```
**Result:**
```http
HTTP/2 200 
content-type: text/html
cache-control: public, must-revalidate, max-age=30

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
```
*Source:* `theuniquescommunity/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
Because the frontend has no `/api/*` route handler or proxy rewrite in `vercel.json`, Vercel rewrites the request to `/index.html`. The browser receives HTML text instead of image bytes.

### 2.4 Why `/projects/unicare.webp` Works
We inspected `theuniquescommunity/public/projects/`:
```
total 404
-rw-r--r--. 1 jimfleax jimfleax 36026 Oct 18 22:39 codecrusade.webp
-rw-r--r--. 1 jimfleax jimfleax 40076 Oct 18 22:39 elevate.webp
-rw-r--r--. 1 jimfleax jimfleax 50302 Oct 18 22:39 eureka.webp
-rw-r--r--. 1 jimfleax jimfleax 38698 Oct 18 22:39 ideajam2026.webp
-rw-r--r--. 1 jimfleax jimfleax 24838 Oct 18 22:39 ideajam.webp
-rw-r--r--. 1 jimfleax jimfleax 123212 Oct 18 22:39 libraria.webp
-rw-r--r--. 1 jimfleax jimfleax 18334 Oct 18 22:39 tuportal.webp
-rw-r--r--. 1 jimfleax jimfleax 55452 Oct 18 22:39 unicare.webp
```
When `<img src="/projects/unicare.webp" />` is rendered:
1. Browser requests `https://theuniques.in/projects/unicare.webp`.
2. Vercel checks the static build output (`dist/projects/unicare.webp`).
3. Static files take precedence over SPA rewrite rules in Vercel.
4. Vercel returns `HTTP 200 Content-Type: image/webp` with 55,452 bytes.

### 2.5 Code-Level Deficiencies in Frontend Image Handling

#### Problem 1: `Projects/index.jsx` does not use `getSafeImageUrl`
In `src/views/Landing/Projects/index.jsx` (lines 339-344):
```jsx
<img
  src={project.image}
  alt={project.title}
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  loading="lazy"
/>
```
The raw `project.image` string is injected directly without normalization or sanitation.

#### Problem 2: `ProjectDetails.jsx` does not normalize images
In `src/views/Landing/Projects/ProjectDetails.jsx` (lines 133, 227-235):
```jsx
const image = project.image || "/projects/unicare.webp";
...
<img
  src={image}
  alt={title}
  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
  onError={(e) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";
  }}
/>
```
`image` remains `/api/image-proxy/...`. When it fails, it swaps to an Unsplash photo rather than resolving the actual project image.

#### Problem 3: `imageHelper.js` does not handle `/api/image-proxy/:fileId`
In `src/utils/imageHelper.js`:
```javascript
export const extractDriveFileId = (source) => {
  // Pattern 1: id query param (?id=XYZ)
  // Pattern 2: /d/XYZ
  // Pattern 3: raw Drive ID (length >= 20 without slashes)
  return null;
};
```
If `source` is `"/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz"`:
- Pattern 3 rejects it because it contains `/`.
- Pattern 1 and 2 don't match.
- `extractDriveFileId` returns `null`.
Then in `getSafeImageUrl(source)`:
```javascript
  if (typeof source === "string") {
    const trimmed = source.trim();
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("/") ||
      trimmed.startsWith("data:")
    ) {
      return trimmed;
    }
  }
```
Because `trimmed.startsWith("/")` is true, `getSafeImageUrl` returns the relative path `"/api/image-proxy/..."` completely unchanged without prefixing `BASE_URL`.

---

## 3. Root Cause Summary Table

| Layer | Symptom / Code | Consequence |
|---|---|---|
| **Database** (`Project.image`) | Stores relative `/api/image-proxy/:fileId` | Lacks origin; portable but requires client or proxy resolution |
| **Backend Upload Route** (`googleDriveUpload.routes.js:1044`) | Saves `image: "/api/image-proxy/${fileId}"` | Documents created via thumbnail upload store relative path |
| **Frontend Image Utility** (`imageHelper.js`) | `extractDriveFileId` ignores `/api/image-proxy/` and returns raw string if starting with `/` | Even callers of `getSafeImageUrl` receive unresolved relative path |
| **Frontend Projects Views** (`Projects/index.jsx`, `ProjectDetails.jsx`) | Bypasses `getSafeImageUrl`, binding `src={project.image}` directly | No URL transformation, no robust fallback |
| **Frontend CDN Routing** (`vercel.json`) | Catch-all rewrite `/(.*) -> /index.html` | Requests to `/api/image-proxy/*` return HTML document instead of image binary |

---

## 4. Architectural Solutions

A robust, production-grade fix requires an end-to-end strategy across both client and deployment layers:

1. **Frontend Image Resolver Enhancement (`imageHelper.js`)**:
   - Update `extractDriveFileId` to extract the file ID from `/api/image-proxy/:fileId` or `${BASE_URL}/api/image-proxy/:fileId`.
   - Update `getSafeImageUrl` to check if `source` starts with `/api/image-proxy/` or contains `api/image-proxy`. If relative, prepend `BASE_URL`. If `BASE_URL` is configured, always yield `https://the-uniques-portal.vercel.app/api/image-proxy/:fileId`.
2. **Project Data Normalization (`projectsData.js`)**:
   - In `normalizeProject`, normalize `project.image` through `getSafeImageUrl` so that any cached or fetched project object immediately holds a valid, fully qualified image URL.
3. **Component UI & Fallback Hardening (`Projects/index.jsx`, `ProjectDetails.jsx`, `Admin/Projects/View.jsx`)**:
   - Use `getSafeImageUrl(project.image, '/projects/unicare.webp')` in all render locations.
   - Add safe `onError` fallbacks that avoid infinite reload loops (`e.currentTarget.onerror = null; e.currentTarget.src = '/projects/unicare.webp'`).
4. **Vercel & Azure Deployment Proxy (`vercel.json`, `staticwebapp.config.json`)**:
   - Add rewrite rule in `vercel.json` routing `/api/(.*)` to `https://the-uniques-portal.vercel.app/api/$1`.
   - Update `staticwebapp.config.json` to exclude `/api/*` from navigation fallback.
   - This provides defense-in-depth: even if a relative URL reaches the network layer, Vercel proxies it to the backend instead of returning HTML.
5. **Backend Data Layer (`The-Uniques-Portal`)**:
   - Provide unit/integration tests confirming `/api/image-proxy/:fileId` returns correct binary headers.
   - Ensure `projectController` and `googleDriveUpload.routes.js` consistently handle both relative and absolute proxy URLs.
