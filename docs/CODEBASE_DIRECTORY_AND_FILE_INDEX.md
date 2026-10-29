# Complete Codebase Directory & File Index: The Uniques Community

This document serves as an exhaustive reference index cataloging every source file, component, hook, utility, and dataset across **The Uniques Community Website** (`theuniquescommunity`).

---

## 1. Root & Configuration Files

| File | Role & Responsibilities | Key Dependencies & Notes |
| :--- | :--- | :--- |
| [`package.json`](file:///run/media/jimfleax/DEV/Projects/theuniquescommunity/package.json) | Project manifest specifying React 18, Vite, Material UI, Tailwind, Lenis, and build scripts. | Run with `npm run dev` and `npm run build`. |
| [`vite.config.js`](file:///run/media/jimfleax/DEV/Projects/theuniquescommunity/vite.config.js) | Bundler configuration setting `@` alias to `src/`, port 5173, and chunk optimization. | Consumed by Vite build runner. |
| [`tailwind.config.js`](file:///run/media/jimfleax/DEV/Projects/theuniquescommunity/tailwind.config.js) | Tailwind CSS tokens including brand primary `#ca0019` and dark mode classes. | Consumed by PostCSS and Tailwind. |
| [`src/config.js`](file:///run/media/jimfleax/DEV/Projects/theuniquescommunity/src/config.js) | Central API endpoint resolution and Axios request interceptor injecting JWT bearer tokens. | Maps `BASE_URL` (`http://localhost:5001` or Vercel cloud backend). |
| [`src/main.jsx`](file:///run/media/jimfleax/DEV/Projects/theuniquescommunity/src/main.jsx) | Application entry point mounting React root, Redux Provider, ThemeProvider, and Lenis smooth scroll. | Bootstraps `App.jsx`. |
| [`src/App.jsx`](file:///run/media/jimfleax/DEV/Projects/theuniquescommunity/src/App.jsx) | Root router component rendering `RouterProvider` and Suspense boundaries. | Mounts `routes/index.jsx`. |

---

## 2. Directory Index by Subsystem

### 2.1. Home Landing Components (`src/views/Landing/homComponents/`)
- **`AboutSection.jsx`**: Summary of community mission and academic partnership with SVVIET.
- **`HomeHero.jsx`**: Animated landing hero banner with call to action.
- **`HelloHero.jsx`**: Welcome statement section.
- **`Logo.jsx`**: Glowing animated community emblem.
- **`CurvedLoop.jsx`**: Decorative SVG looping ribbon animation.
- **`Counts.jsx`** & **`LandingStats.jsx`**: Animated numerical counters linked to `GET ${BASE_URL}/api/stats`.
- **`Highlight.jsx`**: Headline event banner linked to `GET ${BASE_URL}/api/events?limit=1`.
- **`Batches.jsx`**: Student cohort carousel linked to `GET ${BASE_URL}/api/public/members` and `/api/public/members/counts`.
- **`BlogSection.jsx`**: Recent blog preview linked to `GET ${BASE_URL}/api/blogs?limit=3`.
- **`Event.jsx`**: Upcoming hackathons linked to `GET ${BASE_URL}/api/events`.
- **`Placements.jsx`** & **`Startups.jsx`**: Industry recruiter logos and student venture highlights.
- **`DomeGallery.jsx`** & **`Gallery.jsx`**: 3D dome and masonry photo streams.
- **`YoutubeSection.jsx`**: Video player parsing YouTube keynotes.
- **`TestimonialCard.jsx`**: Testimonial card stream from alumni.
- **`TrainingTabs.jsx`**: Tabbed switcher hosting domain curriculums.
  - Sub-tabs: `MernTab.jsx`, `WebDevTab.jsx`, `AndroidTab.jsx`, `GenAiTab.jsx`, `InceptionTab.jsx`.
- **`CorporateCultureSection.jsx`**: Bridging academic culture to enterprise expectations.
- **`CommunityPartners.jsx`**: Partner institutions and tech sponsors.
- **`WhyUs.jsx`**: Community benefits and peer learning advantages.
- **`CallToAction.jsx`**: Bottom enrollment prompt.

---

### 2.2. Domain Views (`src/views/Landing/`)

#### Events (`src/views/Landing/Event/`)
- **`Index.jsx`**: Primary event list with search and filter tabs.
- **`Componant/Event.jsx`**: Event list card presentation.
- **`Componant/EventDetailPage.jsx`**: Full event specifications, speaker agenda, and registration form (`POST ${BASE_URL}/api/events/:id/register`).

#### Batches (`src/views/Landing/Batches/`)
- **`index.jsx`**: Master cohort viewer for `The Uniques 1.0` through `6.0`.
- **`components/AchievementCard.jsx`**: Student hackathon victory card.
- **`components/MemberCard.jsx`**: Student card with avatar resolving via `GET ${BASE_URL}/api/image-proxy/:fileId`.
- **`data/`**: Static fallback rosters (`batchesData.jsx`, `membersData.jsx`, `achievementsData.jsx`).

#### Projects (`src/views/Landing/Projects/`)
- **`index.jsx`**: Filterable project gallery querying `GET ${BASE_URL}/api/projects`.
- **`ProjectDetails.jsx`**: Deep-dive project specification view with GitHub and live links.

#### Success Stories (`src/views/Landing/SuccessStories/`)
- **`index.jsx`**: Alumni placement list querying `GET ${BASE_URL}/api/success-stories`.
- **`StudentStory.jsx`**: Individual placement journey narrative (`GET /api/success-stories/:id`).
- **`HomeContent.jsx`**: Placement statistics banner (`GET /api/success-stories/stats`).
- **`SuccessTimeline.jsx`**: Chronological journey from orientation to offer letter.
- **`VideoMessage.jsx`**: Embedded student video testimonials.
- **`ProfileInformation.jsx`**: Detailed recruiter offer breakdown.
- **`Sidebar.jsx`**: Quick navigation between student stories.
- **`ChatbotLink.jsx`**: AI placement counselor popup prompt.

#### Training Model (`src/views/Landing/Training-model/`)
- **`Training.jsx`**: 4-phase corporate readiness curriculum overview.
- **`components/FourPhase.jsx`**: Phase breakdown (Foundations, Deep Dive, Projects, Production).
- **`components/Trainers.jsx`**: Instructor roster querying `GET ${BASE_URL}/api/admin/trainers/all-trainers`.
- **`components/TrainingTimeLine.jsx`**: Semester-wise progression roadmap.
- **`components/Trainingculture.jsx`**: Daily standups, code reviews, and sprint retrospectives.

#### Trainers (`src/views/Landing/Trainers/`)
- **`index.jsx`**: Public instructor faculty directory.
- **`TrainerCard.jsx`**: Summary card showing domain, experience, and LinkedIn links.

#### About & Journey (`src/views/Landing/About/` & `HowItStarted/`)
- **`About/index.jsx`**: Founding vision, leadership team, and SVVIET infrastructure.
  - Sub-components: `Ankur1.jsx`, `Batches.jsx`, `Faq.jsx`, `Fifth.jsx`, `Fourth.jsx`, `Infrastructure.jsx`, `Mentor.jsx`, `Testimonial.jsx`, `Third.jsx`, `TraningModel.jsx`, `Vision.jsx`.
- **`HowItStarted/index.jsx`**: Origin story from the first 2020 cohort to a national student body.
  - Sub-components: `Flight.jsx`, `TimeLine.jsx`, `CallToAction.jsx`.

#### Contact, Community & Legal
- **`Contact/index.jsx`** & **`components/ContactForm.jsx`**: Corporate inquiry submission submitting `POST ${BASE_URL}/api/contact`.
- **`Community/index.jsx`**: Membership guidelines and eligibility criteria.
  - Sub-components: `About.jsx`, `CallToAction.jsx`, `Eligiblity.jsx`, `Guidlines.jsx`, `Hero.jsx`, `SlideCard.jsx`, `Sliding.jsx`, `SpotCard.jsx`.
- **`Profile/MemberProfile.jsx`**: Public student profile sheet.
- **`Notices/index.jsx`**: Official community notices and circulars.
- **`AdvisoryBoard/index.jsx`**: Senior faculty and industry advisors.
- **`TermsOfService/index.jsx`** & **`PrivacyPolicy/index.jsx`**: Legal and data governance terms.
- **`NotFound/index.jsx`**: Custom branded 404 page.

#### Authentication (`src/views/Authentication/`)
- **`login/index.jsx`**: Email login and Google OAuth redirection.
- **`login/ForgetPassword.jsx`**: 3-step OTP password recovery wizard.
- **`signup/index.jsx`**: Prospective member onboarding registration view.

---

### 2.3. UI Atoms & Helpers (`src/utils/`)

- **Cards (`src/utils/Card/`)**:
  - `MemberCard.jsx`: Student card with status badges and modal inspection.
  - `BlogCard.jsx` & `BlogCard2.jsx`: Article cards with zoomable thumbnails.
  - `HoverCard.jsx`, `SpotLightCard.jsx`, `TitledCard.jsx`: 3D and mouse-follow interactive cards.
  - `CommunityCard.jsx`, `ShapedCard.jsx`, `ReviewCard.jsx`, `WeirdCard.jsx`: Specialized showcase cards.
- **Buttons (`src/utils/Buttons/`)**:
  - `Button.jsx`, `HoverButton.jsx`: Styled buttons with hover motion fills.
- **Modals (`src/utils/Modal/`)**:
  - `ProfileModal.jsx`, `ConfirmationModal.jsx`, `Community.jsx`: Accessible popups with scroll isolation.
- **Loaders & Layout**:
  - `Loader/CustomLoader.jsx`: Branded splash screen.
  - `Container/Container.jsx` & `ContainerFull.jsx`: Responsive layout constraints.
  - `NavBar/Navbar.jsx` & `Footer/Footer.jsx`: Universal site header and footer.
  - `Sidebar/index.jsx`: Drawer navigation menu.
- **Animations & Visual Effects**:
  - `Orbit/Orbit.jsx`: Multi-ring orbital avatar motion.
  - `clickSpark/ClickSpark.jsx`: Particle canvas bursting on clicks.
  - `GridBackground.jsx/GridBackground.jsx`: Interactive coordinates backdrop.
  - `ScrollStack/ScrollStack.jsx`: Card stacking on scroll.
  - `Timeline/Timeline.jsx`: Milestone roadmap timeline.
- **Data & Cache Helpers**:
  - `batchProfilesData.js`, `batchesData.js`: Cohort cache and fetch layer.
  - `projectsData.js`: Project catalog caching.
  - `statsData.js`: Headline numbers caching.
  - `communityBenefitsData.js`: Member perks dataset.
  - `imageHelper.js`: Google Drive proxy image resolver.
  - `lazyWithRetry.js`: Chunk loading failure recovery.

---

### 2.4. Core Application Infrastructure (`src/`)

- **`components/`**:
  - `ApplicationForm.jsx`: Student enrollment application dialog.
  - `ChatBot.jsx`: Interactive helper bot widget.
  - `LazyViewport.jsx`: Zero-CLS viewport rendering optimizer.
  - `RouteErrorBoundary.jsx`: Graceful error boundary preventing full app crashes.
  - `SectionSkeleton.jsx`: Skeleton loading states for landing sections.
  - `magicui/meteors.jsx`: Angled shooting star particle animation.
- **`layout/`**:
  - `NavMotion.jsx`: Framer motion page transition wrapper.
  - `NavigationScroll.jsx`: Reset scroll position on route changes.
  - `Landing/index.jsx`: Main navbar/footer shell for landing routes.
  - `Landing/successStories/index.jsx`: Dedicated layout for placement stories.
- **`routes/`**:
  - `index.jsx`: Primary React Router configuration.
  - `successStories/index.jsx`: Sub-routes for placement stories.
- **`theme/`**:
  - `ThemeProvider.jsx`: Dark/light mode theme provider.
  - `palette.js`, `themes.js`, `typography.js`: Material UI theme definitions.
- **`redux/`**:
  - `store.js`: Redux store instance.
  - `slices/userSlice.js`: Active user session and credentials slice.
- **`assets/dummyData/`**: Offline mock data fallback fixtures (`blogData.js`, `corporateModel.js`, `eventsData.js`, `gdpData.js`, `memberData.js`, `reviewData.js`).
