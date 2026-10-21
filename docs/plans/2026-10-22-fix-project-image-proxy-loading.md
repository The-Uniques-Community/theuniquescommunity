# Implementation Plan: Fix Project Image Proxy Loading

**Plan ID:** `2026-10-22-fix-project-image-proxy-loading`  
**Execution Methodology:** Subagent-Driven Development (Sequential with Code Review)  
**Testing Methodology:** Test-Driven Development (TDD: Red → Green → Review)  
**Target Repositories:**  
- Frontend: `theuniquescommunity` (`/run/media/jimfleax/DEV/Projects/theuniquescommunity`)  
- Backend: `The-Uniques-Portal` (`/run/media/jimfleax/DEV/Projects/The-Uniques-Portal`)

---

## 1. Agreed Seams Under Test

Before writing any implementation code or tests, the public interfaces (seams) are agreed upon:

| Seam ID | File Path | Public Interface Under Test |
|---|---|---|
| **S1** | `src/utils/imageHelper.js` | `extractDriveFileId(source)`, `getSafeImageUrl(source, fallback)` |
| **S2** | `src/utils/project/projectsData.js` | `normalizeProject(project)`, `getStoredProjects()`, `getProjectById(id)` |
| **S3** | `src/views/Landing/Projects/index.jsx` & `ProjectDetails.jsx` | Component image rendering with `getSafeImageUrl` and self-clearing `onError` fallback |
| **S4** | `vercel.json` & `staticwebapp.config.json` | Proxy rewrites `/api/(.*)` → `https://the-uniques-portal.vercel.app/api/$1` |
| **S5** | `../The-Uniques-Portal/server/index.js` | `GET /api/image-proxy/:fileId` binary stream and CORS headers |

---

## 2. Tasks Breakdown (Subagent-Driven Development)

### Task 1: [TDD] Core Image Resolution in `imageHelper.js`
- **Owner:** Subagent (Implementation)
- **Files Affected:**
  - `tests/utils/imageHelper.test.js` (NEW)
  - `src/utils/imageHelper.js` (MODIFIED)
- **TDD Steps:**
  1. **RED:** Write `tests/utils/imageHelper.test.js` using `node:test` and `node:assert`.
     - Test that `extractDriveFileId("/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz")` extracts `"1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz"`.
     - Test that `extractDriveFileId("https://the-uniques-portal.vercel.app/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz")` extracts `"1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz"`.
     - Test that `getSafeImageUrl("/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz")` returns `${BASE_URL}/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz`.
     - Test that `getSafeImageUrl("/projects/unicare.webp")` preserves local asset path `"/projects/unicare.webp"`.
     - Test that `getSafeImageUrl("https://images.unsplash.com/photo-123")` preserves external URLs.
     - Test that `getSafeImageUrl(null, "/fallback.webp")` returns `"/fallback.webp"`.
     - Run `node --test tests/utils/imageHelper.test.js` and verify failure (RED).
  2. **GREEN:** Update `src/utils/imageHelper.js`:
     - Add `/api/image-proxy/([a-zA-Z0-9_-]+)` matching to `extractDriveFileId`.
     - In `getSafeImageUrl`, if `source` starts with `/api/image-proxy/` or contains `api/image-proxy`, resolve with `BASE_URL`.
     - Run `node --test tests/utils/imageHelper.test.js` and verify all tests pass (GREEN).
- **Verification Command:** `node --test tests/utils/imageHelper.test.js`
- **Review Gate:** Dispatch code-reviewer subagent to verify seam adherence and zero regressions.

---

### Task 2: [TDD] Project Normalization Pipeline in `projectsData.js`
- **Owner:** Subagent (Implementation)
- **Files Affected:**
  - `tests/utils/projectsData.test.js` (NEW)
  - `src/utils/project/projectsData.js` (MODIFIED)
- **TDD Steps:**
  1. **RED:** Write `tests/utils/projectsData.test.js`:
     - Test that `normalizeProject({ title: "UNIQUE eGYAN", image: "/api/image-proxy/1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz" })` produces a project object whose `image` property is fully qualified via `getSafeImageUrl`.
     - Test that `normalizeProject({ title: "UNI CARE", image: "/projects/unicare.webp" })` preserves `image: "/projects/unicare.webp"`.
     - Test that `normalizeProject({ title: "No Image" })` defaults `image` to `"/projects/unicare.webp"`.
     - Run `node --test tests/utils/projectsData.test.js` and verify failure (RED).
  2. **GREEN:** Update `src/utils/project/projectsData.js`:
     - Update `normalizeProject` to process `p.image` through `getSafeImageUrl(p.image, "/projects/unicare.webp")`.
     - Run `node --test tests/utils/projectsData.test.js` and verify all tests pass (GREEN).
- **Verification Command:** `node --test tests/utils/projectsData.test.js`
- **Review Gate:** Dispatch code-reviewer subagent to verify no data loss or schema drift.

---

### Task 3: Projects Views & Detail Pages Image Hardening
- **Owner:** Subagent (Implementation)
- **Files Affected:**
  - `src/views/Landing/Projects/index.jsx` (MODIFIED)
  - `src/views/Landing/Projects/ProjectDetails.jsx` (MODIFIED)
  - `src/views/Admin/Projects/View.jsx` (MODIFIED)
- **Steps:**
  1. In `src/views/Landing/Projects/index.jsx`:
     - Import `getSafeImageUrl` from `@/utils/imageHelper`.
     - Update `<img>` tag:
       ```jsx
       <img
         src={getSafeImageUrl(project.image, "/projects/unicare.webp")}
         alt={project.title}
         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
         loading="lazy"
         onError={(e) => {
           e.currentTarget.onerror = null;
           e.currentTarget.src = "/projects/unicare.webp";
         }}
       />
       ```
  2. In `src/views/Landing/Projects/ProjectDetails.jsx`:
     - Import `getSafeImageUrl` from `@/utils/imageHelper`.
     - In line 133: `const image = getSafeImageUrl(project.image, "/projects/unicare.webp");`
     - Update `onError` on the detail banner `<img>` to prevent infinite error triggering and fall back safely.
  3. In `src/views/Admin/Projects/View.jsx`:
     - Import `getSafeImageUrl` from `@/utils/imageHelper`.
     - Normalize preview and card image sources.
- **Verification Command:** `npm run lint && npm run build`
- **Review Gate:** Dispatch code-reviewer subagent to inspect UI code.

---

### Task 4: Deployment & Reverse Proxy Resilience (`vercel.json` & `staticwebapp.config.json`)
- **Owner:** Subagent (Implementation)
- **Files Affected:**
  - `vercel.json` (MODIFIED)
  - `staticwebapp.config.json` (MODIFIED)
- **Steps:**
  1. In `vercel.json`, insert an edge proxy rewrite before the SPA catch-all rewrite:
     ```json
     {
       "rewrites": [
         {
           "source": "/api/(.*)",
           "destination": "https://the-uniques-portal.vercel.app/api/$1"
         },
         {
           "source": "/(.*)",
           "destination": "/index.html"
         }
       ]
     }
     ```
  2. In `staticwebapp.config.json`, ensure `/api/*` is excluded from SPA fallback.
- **Verification Command:** Verify JSON schema and ensure build succeeds.
- **Review Gate:** Dispatch code-reviewer subagent.

---

### Task 5: Backend Route & Upload Consistency Audit
- **Owner:** Subagent (Implementation)
- **Files Affected:**
  - `../The-Uniques-Portal/server/scratch/verify_project_upload.js`
- **Steps:**
  1. Run the existing backend test `node server/scratch/verify_project_upload.js`.
  2. Confirm `/upload/project_file_upload` returns both `fileId` and a valid `proxyUrl`.
  3. Ensure that `projectModel.js` and `projectController.js` can process both relative and absolute image proxy references seamlessly.
- **Verification Command:** `node ../The-Uniques-Portal/server/scratch/verify_project_upload.js`
- **Review Gate:** Backend test audit.

---

### Task 6: Full Verification & Review Gate
- **Owner:** Orchestrator
- **Steps:**
  1. Run all unit test suites (`node --test tests/**/*.test.js`).
  2. Run production build (`npm run build`).
  3. Dispatch final code-reviewer subagent to review git diff against `HEAD`.
  4. Confirm all plan requirements and acceptance criteria are satisfied.

---

## 3. Acceptance Criteria

- [ ] `extractDriveFileId` correctly detects and extracts Google Drive file IDs from both `/api/image-proxy/:fileId` and absolute URLs.
- [ ] `getSafeImageUrl` resolves relative `/api/image-proxy/:fileId` to `${BASE_URL}/api/image-proxy/:fileId`.
- [ ] Local static assets (such as `/projects/unicare.webp`) remain intact and load directly from frontend static assets.
- [ ] `normalizeProject` automatically wraps project image URLs so cached/fetched data is ready for direct `<img>` rendering.
- [ ] `Projects/index.jsx` and `ProjectDetails.jsx` render images through `getSafeImageUrl` with self-clearing `onError` fallback handlers.
- [ ] `vercel.json` proxies `/api/*` requests to `https://the-uniques-portal.vercel.app/api/*` as an edge safety net.
- [ ] 100% of automated tests pass without mock pollution.
- [ ] Frontend build (`npm run build`) finishes with 0 errors.
