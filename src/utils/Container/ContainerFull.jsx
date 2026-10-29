/**
 * @file ContainerFull.jsx
 * @description Full-width layout wrapper providing viewport centering with configurable background color or image.
 * @architecture Layout container primitive in src/utils/Container/ utilized for full-bleed hero sections, splash screens, and auth views.
 * @agent_note Supports both inline `bgColor` and cover `bgImg`. Always centers child content flex-wise with `minHeight: '100vh'`.
 */

import React from 'react';

/**
 * @component ContainerFull
 * @description Full-viewport centered flex container with customizable background image and color fills.
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child elements rendered inside the wrapper
 * @param {string} [props.bgColor='transparent'] - CSS background color
 * @param {string} [props.bgImg] - Image URL for full-cover background image
 * @state None
 * @api None
 */
const ContainerFull = ({ children, bgColor = 'transparent', bgImg }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImg ? `url(${bgImg})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
      className="rounded-md w-full mx-auto flex justify-center items-center p-4"
    >
      {children}
    </div>
  );
};

export default ContainerFull;
