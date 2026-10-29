/**
 * @file index.jsx
 * @description Entry view component for the community success stories showcase, delegating layout rendering to HomeContent.
 * @architecture Mounted within `SuccessStoriesRoutes` at `/success-stories` under `SuccessStoriesLayout` (`src/layout/Landing/successStories/index.jsx`). Renders `HomeContent` which receives loaded student stories via `useOutletContext()`.
 * @agent_note The parent layout (`SuccessStoriesLayout`) executes `GET ${BASE_URL}/api/success-stories?all=true` against `The-Uniques-Portal/server/controller/Community/successStories.controller.js` (`getAllSuccessStories`) and supplies `{ students, isLoading }` through React Router outlet context.
 */

import HomeContent from './HomeContent';

/**
 * @component SuccessStories
 * @description Root delegate view component rendering `HomeContent` for the success stories home route.
 * @returns {JSX.Element} The rendered success stories index view.
 * @state None.
 * @api None directly; layout fetches full collection via `GET /api/success-stories?all=true`.
 */
const SuccessStories = () => {
  return <HomeContent />;
};

export default SuccessStories;
