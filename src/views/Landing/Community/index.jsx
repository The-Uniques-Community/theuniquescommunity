/**
 * @file index.jsx
 * @description Experimental community landing card composition view.
 * Renders preview configurations of `WeirdCard` and `CommunityCard` using fallback fixtures.
 *
 * @architecture
 * - Part of the Landing Community experimental view sandbox (`views/Landing/Community/`).
 * - Employs `eventsData` from `@/assets/dummyData/eventsData` for mock event rendering.
 *
 * @agent_note
 * For the canonical public community lead page, see `views/Community/index.jsx` and `views/Community/Landing/`.
 */

import CommunityCard from "@/utils/Card/CommunityCard";
import WeirdCard from "@/utils/Card/WeirdCard";
import { events } from "@/assets/dummyData/eventsData";

/**
 * CommunityCardPreview Component
 *
 * @component
 * @returns {JSX.Element} Card playground wrapper.
 */
const index = () => {
  return (
    <div className="">
      <WeirdCard />
      <CommunityCard event={events[0]} />
    </div>
  )
}

export default index
