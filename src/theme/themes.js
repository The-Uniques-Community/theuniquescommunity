/**
 * @file themes.js
 * @description Theme factory assembling Material-UI theme configurations.
 * @architecture Imports palettes (`lightPalette`, `darkPalette`) and font definitions (`typography`), constructs
 * custom responsive breakpoints, and produces `lightTheme` and `darkTheme` consumed by `src/theme/ThemeProvider.jsx`.
 * @agent_note Modifying breakpoints here will alter responsive rendering behaviors of MUI grid and hidden components throughout the app.
 */

import { createTheme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';

/**
 * @desc Responsive grid breakpoint values for Material-UI layouts.
 * @type {Object}
 */
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

/**
 * @desc Material-UI Theme instance for Light Mode.
 * @type {import('@mui/material/styles').Theme}
 */
export const lightTheme = createTheme({
  palette: lightPalette,
  breakpoints,
  typography,
});

/**
 * @desc Material-UI Theme instance for Dark Mode.
 * @type {import('@mui/material/styles').Theme}
 */
export const darkTheme = createTheme({
  palette: darkPalette,
  breakpoints,
  typography,
});

