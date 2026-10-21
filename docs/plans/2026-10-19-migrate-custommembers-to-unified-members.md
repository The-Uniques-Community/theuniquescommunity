# Plan: Migrate and Unify `custommembers` into Canonical `members`

**Goal:** Deprecate and completely eliminate the redundant `custommembers` subsystem across the frontend repository (`theuniquescommunity`) and the hosted backend repository (`The-Uniques-Portal`). Establish the canonical `Member` / `User` collection as the single source of truth for both authenticated portal accounts and public directory showcase cards. Remove all client-side `localStorage` caching hacks, event listeners, and dual-write operations in Admin and Coordinator modules.

**Architecture:** Consolidate all member displays and operations to canonical backend routes (`/api/public/members` and `/api/admin/member`) backed by the unified `User` model. Drop local storage shims, client-side deduplication sets, and secondary collection writes.

**Tech Stack:** React 18, Vite, Node.js / Express, MongoDB / Mongoose, Axios.

---

### Task 1: Clean Public Batches View (`src/views/Landing/Batches/index.jsx`)

**Files:**
- Modify: `src/views/Landing/Batches/index.jsx`

**Step 1: Code modifications**
- Remove unused imports `getStoredCustomMembers` and `fetchCustomMembers` from `@/utils/member/customMembersData`.
- Remove `customMembersVersion` state, `custom-members-updated` event listener, and `handleCustomMembersUpdate`.
- Simplify `batchesData` memo: assign `memberCount` directly from `batchCounts[batchName] || 0` without adding `customCountForBatch`.
- In `fetchMembers`, assign `apiMembers` directly to `combined`, eliminating `matchingCustom` filtering, Set of custom IDs, and array concatenation.
- Update data refresh listeners to trigger on `"members-updated"`.

---

### Task 2: Clean Coordinator & Admin Member Panels (`Coordinator/Members`, `Admin/Members`, `Coordinator/index`)

**Files:**
- Modify: `src/views/Uniques/Coordinator/Members/index.jsx`
- Modify: `src/views/Admin/Members/index.jsx`
- Modify: `src/views/Uniques/Coordinator/index.jsx`

**Step 1: Code modifications**
- In `Coordinator/Members/index.jsx` and `Admin/Members/index.jsx`:
  - Drop imports of `getStoredCustomMembers`, `saveStoredCustomMember`, `deleteStoredCustomMember`, `updateStoredCustomMember`.
  - In `handleConfirmAddMember`: Remove `saveStoredCustomMember(newMember)`. Rely exclusively on `axios.post("${BASE_URL}/api/admin/member/add", newMember)`.
  - In `handleEditMemberSubmit`: Remove `updateStoredCustomMember()`. Rely exclusively on `axios.put("${BASE_URL}/api/admin/member/${editingMember._id}", editingMember)`.
  - In `handleConfirmDelete`: Remove `deleteStoredCustomMember()`. Rely exclusively on `axios.delete("${BASE_URL}/api/admin/member/${memberToDelete._id}")`.
  - In `fetchMembers`: Set `members` state directly from `apiMembers`, removing `matchingCustom` merge logic.
  - In `fetchTabCounts`: Compute counts purely from API responses.
  - Remove `window.addEventListener("custom-members-updated")`.
- In `src/views/Uniques/Coordinator/index.jsx`:
  - Remove `localStorage.getItem("tu_community_custom_members")` reading/merging.
  - Remove `"custom-members-updated"` event listener.

---

### Task 3: Deprecate `customMembersData.js`

**Files:**
- Modify: `src/utils/member/customMembersData.js`

**Step 1: Code modifications**
- Auto-clean `localStorage.removeItem("tu_community_custom_members")` on module execution.
- Export safe no-op stubs for backward compatibility.

---

### Task 4: Backend API Alignment (`The-Uniques-Portal`)

**Files:**
- Modify: `../The-Uniques-Portal/server/controller/landing/memberController.js`
- Modify: `../The-Uniques-Portal/server/index.js`
- Modify: `../The-Uniques-Portal/server/routes/community/customMemberRoute.js`

**Step 1: Code modifications**
- In `getMemberCounts` (`server/controller/landing/memberController.js`): Align filter with `getPublicMembers` by removing `isVerified: true` so all active batch members are counted accurately.
- In `server/routes/community/customMemberRoute.js`: Return empty array `{ success: true, data: [], message: "Deprecated" }` as a safe fallback for legacy callers.

---

### Task 5: Build, Test & Regression Verification

**Step 1: Build check**
- Run `npm run build` in `theuniquescommunity`.
- Ensure zero compile errors.

**Step 2: Endpoint verification**
- Curl `/api/public/members` and `/api/public/members/counts` to ensure consistent data delivery.
- Verify batch counts match rendered members across all cohorts.
