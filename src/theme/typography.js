/**
 * @file typography.js
 * @description Typography and font configuration tokens for Material-UI themes.
 * @architecture Exported to `src/theme/themes.js` to establish global typography scales and font styling for MUI components.
 * @agent_note Configures custom display font `"Absans"` with fallback to `"Roboto"` and `"Arial"`. Explicitly disables uppercase transformation on buttons.
 */

/**
 * @desc Material-UI typography variant and scale rules.
 * @type {Object}
 */
export const typography = {
	fontFamily: '"Absans", "Roboto", "Arial", sans-serif',
	h1: {
	  fontSize: '2.5rem',
	  fontWeight: 700,
	},
	h2: {
	  fontSize: '2rem',
	  fontWeight: 600,
	},
	body1: {
	  fontSize: '1rem',
	  lineHeight: 1.5,
	},
	button: {
	  textTransform: 'none', // Disable uppercase for buttons
	},
  };

  