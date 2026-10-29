/**
 * @file utils.js
 * @description Utility functions for className composition and Tailwind CSS class conflict resolution.
 * @architecture Common helper library utilized by UI components (e.g. MagicUI `Meteors`, custom design system components)
 * to safely merge conditional and custom Tailwind styles.
 * @agent_note Combines `clsx` for conditional truthy/falsy evaluation and `tailwind-merge` for deduplicating conflicting utility classes.
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * @desc Merges conditional class names and resolves Tailwind CSS class specificity collisions.
 * @param {...(string|number|boolean|undefined|null|Object|Array)} inputs - Class names, conditional objects, or class arrays.
 * @returns {string} Optimized and merged single className string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

