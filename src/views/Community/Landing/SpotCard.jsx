/**
 * @file SpotCard.jsx
 * @description Experimental spotlight wrapper component demo for Community views.
 * Demonstrates radial spotlight cursor illumination configured with warm tint (`rgba(255, 190, 190, 0.25)`).
 *
 * @architecture
 * - Part of the Community Landing UI atom sandbox (`views/Community/Landing/`).
 * - Wraps `SpotlightCard` from `src/utils/Card/SpotLightCard.jsx`.
 *
 * @agent_note
 * Prototype wrapper; active production views use `SpotlightCard` directly.
 */

import React from 'react'
import SpotlightCard from "@/utils/Card/SpotLightCard";

/**
 * SpotCard Component
 *
 * @component
 * @returns {JSX.Element} Spotlight preview wrapper.
 */
const SpotCard = () => {
  return (
    <div>';

      <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 190, 190, 0.25)">
          // Content goes here
      </SpotlightCard></div>
  )
}

export default SpotCard
