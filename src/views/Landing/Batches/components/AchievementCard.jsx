/**
 * @file AchievementCard.jsx
 * @description Presentational card component rendering batch accomplishment titles, descriptions, and color-coded icon badges.
 * @architecture Used in cohort achievement showcases within the Batches landing domain views.
 * @agent_note Pure presentational component; accepts standard achievement data props.
 */

import React from "react"

// interface AchievementCardProps {
//   title: string
//   description: string
//   icon: React.ReactNode
//   color: string
// }

/**
 * @component AchievementCard
 * @description Visual card highlighting a single batch milestone or achievement with custom icon accent.
 * @param {Object} props - Component properties
 * @param {string} props.title - Title of the achievement
 * @param {string} props.description - Detailed text of the achievement
 * @param {React.ReactNode} props.icon - Icon element rendered inside circular badge
 * @param {string} props.color - CSS color class applied to icon container
 */
const AchievementCard = ({ title, description, icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className={`${color} text-white p-2  rounded-full w-10 h-10 flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

export default AchievementCard

