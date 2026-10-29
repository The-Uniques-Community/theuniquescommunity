/**
 * @file NavigationScroll.jsx
 * @description Window scroll-reset utility wrapper for route navigation.
 * @architecture Wraps root route layouts and pages in `src/routes/index.jsx` ensuring that navigations
 * reset the window viewport scroll position to the top.
 * @agent_note Executes `window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })` inside an empty dependency `useEffect`.
 */

import PropTypes from 'prop-types';
import { useEffect } from 'react';

/**
 * @component NavigationScroll
 * @description Layout utility component resetting browser window scroll coordinates to (0, 0) upon mounting.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} [props.children] - Child nodes rendered directly without DOM wrapper.
 * @returns {React.ReactNode|null} Pass-through rendered children or null.
 * @sideeffects Triggers `window.scrollTo` smooth scroll on initial mount.
 */
const NavigationScroll = ({ children }) => {
  useEffect(() => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return children || null;
};

NavigationScroll.propTypes = {
  children: PropTypes.node
};

export default NavigationScroll;
