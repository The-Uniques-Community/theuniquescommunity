# Audit of Frontend-to-Backend References & Risk Analysis of Removing `Backend/`

**Date:** 2026-10-19  
**Repository:** `theuniquescommunity`  
**Scope:** Investigation into where the frontend (`src/`) references files, functions, and endpoints from the `Backend/` directory, and the comprehensive risks associated with deleting or removing the `Backend/` directory.

---

## 1. Executive Summary

1. **Direct Code Imports / Function References: 0 Instances**
   - The frontend (`src/`) has **zero compile-time module dependencies** (`import` / `require`) on the `Backend/` folder.
   - The frontend build process (`npm run build`) runs in complete isolation and passes with exit code 0 without accessing `Backend/`.
   - The frontend and backend act as completely decoupled codebases co-located within the same repository (a pseudo-monorepo).

2. **Runtime / Network API References: 120+ Invocations across 35+ Files**
   - The frontend communicates with the backend exclusively over HTTP REST endpoints via `axios` and native `fetch`.
   - All network calls are anchored to `BASE_URL` defined in [`src/config.js`](../src/config.js#L3-L5), which defaults to `http://localhost:5001` in local development and falls back to `https://the-uniques-portal.vercel.app` in production.

3. **Risk Level of Removing `Backend/`:**
   - **Build & Bundle Risk:** **None**. Vite builds the frontend cleanly without `Backend/`.
   - **Local Development Risk:** **High**. Without a running backend on `localhost:5001` or an explicit `.env` pointer (`VITE_API_BASE_URL`), all authenticated, dynamic, or administrative features will fail with network errors.
   - **Deployment & Production Risk:** **Critical (if Vercel is tied to this repo)**. `Backend/vercel.json` deploys the backend server to Vercel (`the-uniques-portal.vercel.app`). Removing `Backend/` from this repository would delete the deployment configuration and source code for the production API.
   - **Data & Feature Loss Risk:** **Critical**. Removing `Backend/` destroys 15+ Mongoose data schemas, Google Drive file upload/proxy handlers, Nodemailer email services, Passport Google OAuth configurations, and database seed scripts.

---

## 2. Compile-Time Code Dependencies Audit

A deep code search across all files in `src/`, `public/`, and the repository root revealed:
- **Direct imports from `Backend/`:** 0
- **Shared utility or type imports:** 0
- **Build-time dependency on `Backend/`:** None

*Note on root `package.json`:* The root [`package.json`](../package.json#L46-L59) contains residual backend dependencies (`express`, `mongoose`, `multer`, `googleapis`) which are never imported by frontend files in `src/`.

---

## 3. Comprehensive Inventory of Frontend API References

Frontend files communicate with backend endpoints using `BASE_URL` or relative paths. Below is the categorized list of all references and the backend controllers/routes they target.

### 3.1. Authentication, Sessions & Password Reset
Frontend uses cookies and JWT tokens stored in `localStorage` ([`src/config.js`](../src/config.js#L10-L19)).

| Frontend File & Line | Method & Endpoint | Backend Handler / Controller |
| :--- | :--- | :--- |
| [`src/views/Landing/Authentication/Login/index.jsx#L143`](../src/views/Landing/Authentication/Login/index.jsx#L143) | `POST ${BASE_URL}/auth/emaillogin` | `Backend/controller/Authentication/auth.controller.js` (`emailLogin`) |
| [`src/views/Landing/Authentication/Login/index.jsx#L177`](../src/views/Landing/Authentication/Login/index.jsx#L177) | `GET ${BASE_URL}/auth/google` | `Backend/routes/Authentication/auth.routes.js` (Passport Google OAuth) |
| [`src/utils/NavBar/Navbar.jsx#L52`](../src/utils/NavBar/Navbar.jsx#L52) | `GET ${BASE_URL}/auth/verify_user` | `Backend/controller/Authentication/auth.controller.js` (`getCurrentUser`) |
| [`src/utils/NavBar/Navbar.jsx#L68`](../src/utils/NavBar/Navbar.jsx#L68) | `POST ${BASE_URL}/auth/logout` | `Backend/controller/Authentication/auth.controller.js` (`logout`) |
| [`src/views/Admin/index.jsx#L107`](../src/views/Admin/index.jsx#L107) | `POST ${BASE_URL}/auth/logout` | `Backend/controller/Authentication/auth.controller.js` (`logout`) |
| [`src/views/Uniques/Coordinator/index.jsx#L125`](../src/views/Uniques/Coordinator/index.jsx#L125) | `POST ${BASE_URL}/auth/logout` | `Backend/controller/Authentication/auth.controller.js` (`logout`) |
| [`src/views/Landing/Authentication/ForgotPassword/index.jsx#L61`](../src/views/Landing/Authentication/ForgotPassword/index.jsx#L61) | `POST ${BASE_URL}/auth/password-reset/send-otp` | `Backend/controller/Authentication/passwordReset.controller.js` (`sendResetOTP`) |
| [`src/views/Landing/Authentication/ForgotPassword/index.jsx#L112`](../src/views/Landing/Authentication/ForgotPassword/index.jsx#L112) | `POST ${BASE_URL}/auth/password-reset/verify-otp` | `Backend/controller/Authentication/passwordReset.controller.js` (`verifyResetOTP`) |
| [`src/views/Landing/Authentication/ForgotPassword/index.jsx#L162`](../src/views/Landing/Authentication/ForgotPassword/index.jsx#L162) | `POST ${BASE_URL}/auth/password-reset/resend-otp` | `Backend/controller/Authentication/passwordReset.controller.js` (`resendOTP`) |
| [`src/views/Landing/Authentication/ForgotPassword/index.jsx#L201`](../src/views/Landing/Authentication/ForgotPassword/index.jsx#L201) | `POST ${BASE_URL}/auth/password-reset/reset-password` | `Backend/controller/Authentication/passwordReset.controller.js` (`resetPassword`) |

---

### 3.2. Member Profile & Dashboard
Manages individual student member profiles, achievements, certifications, projects, internships, events, and fines.

| Frontend File & Line | Method & Endpoint | Backend Handler / Controller |
| :--- | :--- | :--- |
| [`src/views/Uniques/Member/index.jsx#L4074`](../src/views/Uniques/Member/index.jsx#L4074) | `GET ${API_BASE_URL}/api/member/getProfile` | `Backend/controller/member/memberController.js` (`getProfile`) |
| [`src/views/Uniques/Member/index.jsx#L4202`](../src/views/Uniques/Member/index.jsx#L4202) | `GET ${API_BASE_URL}/api/admin/member/${user._id}/fine` | `Backend/controller/admin/fineController.js` (`getFineHistory`) |
| [`src/views/Uniques/Member/index.jsx#L4287`](../src/views/Uniques/Member/index.jsx#L4287) | `PUT ${API_BASE_URL}/api/member/members/${user._id}/editProfile` | `Backend/controller/member/memberController.js` (`editProfile`) |
| [`src/views/Uniques/Member/index.jsx#L4434`](../src/views/Uniques/Member/index.jsx#L4434) | `POST/PUT .../members/${user._id}/achievements` | `Backend/controller/member/memberController.js` (`updateAchievements`) |
| [`src/views/Uniques/Member/index.jsx#L4650`](../src/views/Uniques/Member/index.jsx#L4650) | `POST/PUT .../members/${user._id}/certifications` | `Backend/controller/member/memberController.js` (`updateCertifications`) |
| [`src/views/Uniques/Member/index.jsx#L4782`](../src/views/Uniques/Member/index.jsx#L4782) | `POST/PUT .../members/${user._id}/projects` | `Backend/controller/member/memberController.js` (`updateProjects`) |
| [`src/views/Uniques/Member/index.jsx#L4931`](../src/views/Uniques/Member/index.jsx#L4931) | `POST/PUT .../members/${user._id}/internships` | `Backend/controller/member/memberController.js` (`updateInternships`) |
| [`src/views/Uniques/Member/index.jsx#L5081`](../src/views/Uniques/Member/index.jsx#L5081) | `POST/PUT .../members/${user._id}/events` | `Backend/controller/member/memberController.js` (`updateEvents`) |
| [`src/views/Uniques/Member/index.jsx#L5216`](../src/views/Uniques/Member/index.jsx#L5216) | `POST/PUT .../members/${user._id}/academics` | `Backend/controller/member/memberController.js` (`updateAcademics`) |
| [`src/views/Landing/Profile/MemberProfile.jsx#L50`](../src/views/Landing/Profile/MemberProfile.jsx#L50) | `GET ${BASE_URL}/api/public/members` | `Backend/controller/landing/memberController.js` (`getPublicMembers`) |
| [`src/views/Landing/homComponents/Batches.jsx#L112`](../src/views/Landing/homComponents/Batches.jsx#L112) | `GET ${BASE_URL}/api/public/members/counts` | `Backend/controller/landing/memberController.js` (`getMemberCounts`) |

---

### 3.3. Admin & Coordinator Operations (Members, Fines, Trainers, Enquiries)

| Frontend File & Line | Method & Endpoint | Backend Handler / Controller |
| :--- | :--- | :--- |
| [`src/views/Admin/Members/index.jsx#L172`](../src/views/Admin/Members/index.jsx#L172) | `GET ${BASE_URL}/api/admin/member/count` | `Backend/controller/admin/memberController.js` (`getAllMembers` count) |
| [`src/views/Admin/Members/index.jsx#L206`](../src/views/Admin/Members/index.jsx#L206) | `GET ${BASE_URL}/api/admin/member?page=...` | `Backend/controller/admin/memberController.js` (`getAllMembers`) |
| [`src/views/Admin/Members/index.jsx#L273`](../src/views/Admin/Members/index.jsx#L273) | `POST ${BASE_URL}/api/admin/member/add` | `Backend/controller/admin/adminControllers.js` (`addMember`) |
| [`src/views/Admin/Members/index.jsx#L341`](../src/views/Admin/Members/index.jsx#L341) | `PUT ${BASE_URL}/api/admin/member/${id}` | `Backend/controller/admin/memberController.js` (`updateMemberProfile`) |
| [`src/views/Admin/Members/index.jsx#L373`](../src/views/Admin/Members/index.jsx#L373) | `DELETE ${BASE_URL}/api/admin/member/${id}` | `Backend/controller/admin/memberController.js` (`deleteMember`) |
| [`src/utils/Modal/ProfileModal.jsx#L111`](../src/utils/Modal/ProfileModal.jsx#L111) | `PATCH ${BASE_URL}/api/admin/member/${id}/block` | `Backend/controller/admin/memberController.js` (`toggleBlockStatus`) |
| [`src/utils/Modal/ProfileModal.jsx#L210`](../src/utils/Modal/ProfileModal.jsx#L210) | `POST ${BASE_URL}/api/admin/member/${id}/fine` | `Backend/controller/admin/adminControllers.js` (`imposeFine`) |
| [`src/views/Admin/Accounts/index.jsx#L57`](../src/views/Admin/Accounts/index.jsx#L57) | `GET ${API_BASE_URL}/fine/fines/statistics` | `Backend/controller/admin/fineController.js` (`getFineStatistics`) |
| [`src/views/Admin/Accounts/index.jsx#L75`](../src/views/Admin/Accounts/index.jsx#L75) | `GET ${API_BASE_URL}/fine/fines/pending/members` | `Backend/controller/admin/fineController.js` (`getMembersWithPendingFines`) |
| [`src/views/Admin/Accounts/components/TransactionTable.jsx#L159`](../src/views/Admin/Accounts/components/TransactionTable.jsx#L159) | `PUT .../fine/members/${memberId}/fines/${fineId}` | `Backend/controller/admin/fineController.js` (`updateFineStatus`) |
| [`src/views/Admin/Accounts/components/TransactionTable.jsx#L530`](../src/views/Admin/Accounts/components/TransactionTable.jsx#L530) | `POST .../fine/members/${id}/fines` | `Backend/controller/admin/fineController.js` (`imposeFine`) |
| [`src/views/Admin/Trainers/index.jsx#L83`](../src/views/Admin/Trainers/index.jsx#L83) | `GET ${burl}/api/admin/trainers/all-trainers` | `Backend/controller/admin/trainerController.js` (`getAllTrainers`) |
| [`src/views/Admin/Trainers/index.jsx#L149`](../src/views/Admin/Trainers/index.jsx#L149) | `PUT .../trainers/update-trainer/${id}` | `Backend/controller/admin/trainerController.js` (`updateTrainer`) |
| [`src/views/Admin/Trainers/index.jsx#L154`](../src/views/Admin/Trainers/index.jsx#L154) | `POST .../trainers/add-trainer` | `Backend/controller/admin/trainerController.js` (`addTrainer`) |
| [`src/views/Admin/Trainers/index.jsx#L230`](../src/views/Admin/Trainers/index.jsx#L230) | `DELETE .../trainers/delete-trainer/${id}` | `Backend/controller/admin/trainerController.js` (`deleteTrainer`) |
| [`src/views/Admin/Enquiry/index.jsx#L100`](../src/views/Admin/Enquiry/index.jsx#L100) | `GET ${BASE_URL}/api/admin/enquiry` | `Backend/controller/admin/enquiryController.js` (`getAllEnquiries`) |
| [`src/views/Admin/Enquiry/index.jsx#L206`](../src/views/Admin/Enquiry/index.jsx#L206) | `POST ${BASE_URL}/api/admin/enquiry/${id}/reply` | `Backend/controller/admin/enquiryController.js` (`replyToEnquiry`) |
| [`src/views/Landing/Contact/index.jsx#L137`](../src/views/Landing/Contact/index.jsx#L137) | `POST ${BASE_URL}/api/contact` | `Backend/controller/landing/memberController.js` (`submitContactForm`) |

---

### 3.4. Events Management, Budgets, Guests & Registration

| Frontend File & Line | Method & Endpoint | Backend Handler / Controller |
| :--- | :--- | :--- |
| [`src/views/Landing/Event/Index.jsx#L73`](../src/views/Landing/Event/Index.jsx#L73) | `GET ${BASE_URL}/api/events` | `Backend/controller/events/eventController.js` (`getAllEvents`) |
| [`src/views/Landing/Event/Componant/EventDetailPage.jsx#L209`](../src/views/Landing/Event/Componant/EventDetailPage.jsx#L209) | `GET ${BASE_URL}/api/events/${id}` | `Backend/controller/events/eventController.js` (`getEventById`) |
| [`src/views/Landing/Event/Componant/EventDetailPage.jsx#L366`](../src/views/Landing/Event/Componant/EventDetailPage.jsx#L366) | `POST ${BASE_URL}/api/events/${id}/register` | `Backend/controller/events/eventController.js` (`submitFormResponse`) |
| [`src/utils/event/EventForm.jsx#L389`](../src/utils/event/EventForm.jsx#L389) | `POST ${BASE_URL}/api/events` | `Backend/controller/events/eventController.js` (`createEvent`) |
| [`src/utils/event/EventForm.jsx#L383`](../src/utils/event/EventForm.jsx#L383) | `PUT ${BASE_URL}/api/events/${id}` | `Backend/controller/events/eventController.js` (`updateEvent`) |
| [`src/utils/event/EventForm.jsx#L162`](../src/utils/event/EventForm.jsx#L162) | `GET ${BASE_URL}/api/guest/get-all-guests` | `Backend/controller/guest/guestController.js` (`getAllGuests`) |
| [`src/utils/event/EventForm.jsx#L436`](../src/utils/event/EventForm.jsx#L436) | `POST ${BASE_URL}/api/guest/add-guest` | `Backend/controller/guest/guestController.js` (`addGuest`) |
| [`src/views/Admin/Events/Budget.jsx#L417`](../src/views/Admin/Events/Budget.jsx#L417) | `POST/DELETE .../budget-allocations` | `Backend/controllers/eventBudgetController.js` / `eventController.js` |
| [`src/views/Admin/Events/Budget.jsx#L566`](../src/views/Admin/Events/Budget.jsx#L566) | `POST/DELETE .../sponsors` | `Backend/controllers/eventBudgetController.js` (`addSponsor`) |
| [`src/views/Admin/Events/Budget.jsx#L640`](../src/views/Admin/Events/Budget.jsx#L640) | `POST/DELETE .../expenses` | `Backend/controllers/eventBudgetController.js` (`addExpense`) |

---

### 3.5. Community Data (Projects, Batches, Stats, Benefits, Blogs, Ambassador)

| Frontend File & Line | Method & Endpoint | Backend Handler / Controller | Fallback Behavior |
| :--- | :--- | :--- | :--- |
| [`src/utils/project/projectsData.js#L418-L504`](../src/utils/project/projectsData.js#L418-L504) | `GET/POST/PUT/DELETE ${BASE_URL}/api/projects` | `Backend/controller/Community/projectController.js` | Falls back to cached local projects array |
| [`src/utils/stats/statsData.js#L35-L65`](../src/utils/stats/statsData.js#L35-L65) | `GET/POST ${BASE_URL}/api/stats` | `Backend/controller/Community/statsController.js` | Falls back to static counts |
| [`src/utils/batch/batchesData.js#L39-L83`](../src/utils/batch/batchesData.js#L39-L83) | `GET/POST ${BASE_URL}/api/batches/all` | `Backend/controller/Community/batchController.js` | Falls back to cached batch list |
| [`src/utils/batch/batchProfilesData.js#L94-L133`](../src/utils/batch/batchProfilesData.js#L94-L133) | `GET/POST ${BASE_URL}/api/batches/profiles` | `Backend/controller/Community/batchController.js` | Falls back to cached coordinator profiles |
| [`src/utils/member/customMembersData.js#L42-L140`](../src/utils/member/customMembersData.js#L42-L140) | `GET/POST/PUT/DELETE ${BASE_URL}/api/custom-members` | `Backend/controller/Community/customMemberController.js` | Falls back to localStorage |
| [`src/utils/community/communityBenefitsData.js#L84-L135`](../src/utils/community/communityBenefitsData.js#L84-L135) | `GET/POST ${BASE_URL}/api/community-benefits` | `Backend/controller/Community/communityBenefitsController.js` | Falls back to default benefits cards |
| [`src/components/ApplicationForm.jsx#L37`](../src/components/ApplicationForm.jsx#L37) | `POST ${BASE_URL}/api/campus-ambassador/apply` | `Backend/controller/Community/community.controller.js` | **No fallback** (Form submission fails) |
| [`src/views/Uniques/Member/Blog/index.jsx#L42`](../src/views/Uniques/Member/Blog/index.jsx#L42) | `GET/POST/PUT/DELETE ${BASE_URL}/api/blogs` | `Backend/controller/member/blogController.js` | **No fallback** (Blog dashboard fails) |

---

### 3.6. Google Drive File Uploads & Image Proxy
The backend handles streaming and uploading media files directly to Google Drive via the Google API Client (`googleapis`) and Multer.

| Frontend File & Line | Method & Endpoint | Backend Handler / Controller |
| :--- | :--- | :--- |
| [`src/utils/imageHelper.js#L70`](../src/utils/imageHelper.js#L70) | `GET ${BASE_URL}/api/image-proxy/${fileId}` | `Backend/index.js#L172-L208` (Google Drive stream proxy) |
| [`src/views/Landing/Training-model/components/Trainers.jsx#L45`](../src/views/Landing/Training-model/components/Trainers.jsx#L45) | `GET ${BASE_URL}/api/image-proxy/1SH3BoI8...` | `Backend/index.js` (Google Drive stream proxy) |
| [`src/utils/Card/TrainerCardDashboard.jsx#L41`](../src/utils/Card/TrainerCardDashboard.jsx#L41) | `GET ${BASE_URL}/api/image-proxy/${fileId}` | `Backend/index.js` (Google Drive stream proxy) |
| [`src/views/Uniques/Member/index.jsx#L4362`](../src/views/Uniques/Member/index.jsx#L4362) | `POST ${BASE_URL}/upload/file_upload` | `Backend/routes/googleDriveUpload.routes.js` |
| [`src/utils/event/EventForm.jsx#L267`](../src/utils/event/EventForm.jsx#L267) | `POST ${BASE_URL}/upload/event_file_upload` | `Backend/routes/googleDriveUpload.routes.js` |
| [`src/utils/adminTrainer.js#L59`](../src/utils/adminTrainer.js#L59) | `POST ${BASE_URL}/upload/trainer_file_upload` | `Backend/routes/googleDriveUpload.routes.js` |
| [`src/views/Admin/Accounts/components/TransactionTable.jsx#L83`](../src/views/Admin/Accounts/components/TransactionTable.jsx#L83) | `POST ${BASE_URL}/upload/fine_file_upload` | `Backend/routes/googleDriveUpload.routes.js` |
| [`src/views/Admin/Events/Budget.jsx#L332`](../src/views/Admin/Events/Budget.jsx#L332) | `POST ${BASE_URL}/upload/budget_file_upload` | `Backend/routes/googleDriveUpload.routes.js` |

---

## 4. Comprehensive Risk Matrix of Removing `Backend/`

| Risk Dimension | Impact Level | Description & Consequence |
| :--- | :---: | :--- |
| **Frontend Build / CI (`vite build`)** | **None (0% Risk)** | No compile-time imports exist. Vite produces `dist/` cleanly regardless of whether `Backend/` is present. |
| **Local Development Workflow** | **Critical (100% Failure without remote API)** | If `Backend/` is removed, developers cannot run `node Backend/index.js`. Local API calls to `localhost:5001` will fail. Developers would be forced to proxy all dev traffic to a live production database/API. |
| **Production API Deployment** | **Critical (Irreversible loss if unmigrated)** | `Backend/vercel.json` deploys the backend server directly to Vercel (`the-uniques-portal.vercel.app`). Deleting `Backend/` without first configuring a separate repo/deployment will kill the live production API. |
| **Authentication & Access Control** | **Catastrophic Failure** | All user and administrator logins, password reset OTP flows, session verifications (`/auth/verify_user`), and Google OAuth logins will fail completely. |
| **Portal Management & Database Sync** | **Catastrophic Failure** | Admin, Coordinator, and Member dashboards will be completely unable to read or write data to MongoDB. |
| **File Storage & Google Drive Images** | **Catastrophic Failure** | All Google Drive image proxies (`/api/image-proxy/:fileId`) will return errors or placeholder SVGs. All file uploads (resumes, certificates, budget slips, event banners) will fail. |
| **Transactional Email Services** | **Loss of Service** | Welcoming members with credentials, sending approval emails, OTP delivery, and replying to contact enquiries via Nodemailer will stop functioning. |
| **Schema & Seeding Assets** | **Permanent Data Model Loss** | 15+ Mongoose models, database connection setups, migration scripts, and `seedProjects.js` will be lost unless migrated. |

---

## 5. Prerequisites & Recommendations Before Any Removal

If the objective is to **split the repository into a separate backend service** or transition to a multi-repo architecture, perform the following steps **before** deleting `Backend/`:

1. **Extract `Backend/` to a Standalone Repository:**
   - Clone or use `git subtree split -P Backend -b backend-repo` to retain the entire Git commit history for backend files.
   - Set up independent CI/CD (e.g. Vercel, Railway, Render, or Docker).
2. **Configure Environment Variables:**
   - Ensure the new backend has all required secrets (`MONGODB_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, Google Drive Service Account credentials).
   - In the frontend root, update `.env` and deployment environment variables:
     ```env
     VITE_API_BASE_URL=https://your-new-backend-domain.com
     ```
3. **Clean Up Root Frontend `package.json`:**
   - Uninstall backend-only packages from root (`npm uninstall express mongoose multer googleapis`).
4. **Verify Google Drive Image Proxy & CORS:**
   - Ensure the new backend domain is allowed in CORS and correctly proxies images through `/api/image-proxy/:fileId`.
