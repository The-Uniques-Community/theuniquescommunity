/**
 * @file ThemeProvider.jsx
 * @description Theme context provider bridging Material-UI and Tailwind CSS color modes.
 * @architecture Mounted near the React tree root in `src/main.jsx`. Supplies active theme state to custom hooks
 * (`useThemeContext`), controls the root `<html>` `.dark` CSS class for Tailwind styling, and renders Material-UI's `MUIThemeProvider`.
 * @agent_note Persists mode selections to `localStorage.getItem('theme')` and automatically respects OS system preferences
 * via `window.matchMedia('(prefers-color-scheme: dark)')` when no user override is stored.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './themes';

const ThemeContext = createContext();

/**
 * @component ThemeProvider
 * @description State provider managing light and dark themes across both Material-UI and Tailwind CSS systems.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child elements rendered within the themed context.
 * @state {boolean} isDarkMode - Flag indicating whether the active interface theme is dark mode.
 * @returns {JSX.Element} Context provider with Material-UI CssBaseline and MUIThemeProvider wrapper.
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MUIThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline /> {/* Resets default browser styles */}
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

/**
 * @hook useThemeContext
 * @description Hook providing access to theme state and theme toggling functionality.
 * @returns {{ isDarkMode: boolean, toggleTheme: Function }} Active theme status and toggle function.
 */
export const useThemeContext = () => useContext(ThemeContext);

