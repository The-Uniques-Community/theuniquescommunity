/**
 * @file batchesData.jsx
 * @description Static definitions and descriptions for default community cohorts ("The Uniques 1.0" through "4.0").
 * @architecture Fallback dataset used across Batches landing pages when offline or when backend cohorts are hydrating.
 * @agent_note Static fallback; live cohorts are dynamically retrieved from `${BASE_URL}/api/batches` handled by `getAllBatches` in `The-Uniques-Portal/server/controller/Community/batchController.js`.
 */

// import type { Batch } from "../types"
import { Users, Sparkles, Zap, Rocket } from "lucide-react"

/**
 * @desc Baseline cohort batch metadata including icons, descriptive intros, and achievement IDs.
 * @type {Array<{id: string, name: string, description: string, icon: React.ReactNode, memberCount: number, achievements: Array<string>}>}
 */
export const batchesData= [
  {
    id: "batch1",
    name: "The Uniques 1.0",
    description:
      "The founding batch of The Uniques Community. These members laid the foundation for our community's growth and established our core values.",
    icon: <Users className="h-4 w-4" />,
    memberCount: 15,
    achievements: ["community-building", "foundation", "mentorship"],
  },
  {
    id: "batch2",
    name: "The Uniques 2.0",
    description:
      "The second generation of Uniques members who expanded our community's reach and introduced innovative projects and initiatives.",
    icon: <Sparkles className="h-4 w-4" />,
    memberCount: 20,
    achievements: ["innovation", "hackathon-winners", "open-source"],
  },
  {
    id: "batch3",
    name: "The Uniques 3.0",
    description:
      "This batch brought diverse skills and perspectives, strengthening our technical expertise and community engagement.",
    icon: <Zap className="h-4 w-4" />,
    memberCount: 25,
    achievements: ["technical-excellence", "community-growth", "workshops"],
  },
  {
    id: "batch4",
    name: "The Uniques 4.0",
    description:
      "Our newest batch of talented members, bringing fresh ideas and energy to the community while building on our established traditions.",
    icon: <Rocket className="h-4 w-4" />,
    memberCount: 30,
    achievements: ["rapid-growth", "diverse-skills", "collaboration"],
  },
]

