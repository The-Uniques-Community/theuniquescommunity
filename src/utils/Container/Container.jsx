/**
 * @file Container.jsx
 * @description Standard layout container enforcing centered, full-height framing with responsive margins and background styling.
 * @architecture Layout container primitive in src/utils/Container/ wrapping page views across desktop, tablet, and mobile breakpoints.
 * @agent_note Enforces a consistent 95% centered width (`w-[95%] mx-auto`) and minimum viewport height (`min-h-screen`).
 */

import React from 'react'

/**
 * @component Container
 * @description Page content wrapper providing padding, rounded borders, background coloration, and screen height constraints.
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child elements rendered inside the container
 * @param {string} [props.bgColor] - Optional background color applied via inline style
 * @state None
 * @api None
 */
const Container = ({children,bgColor}) => {
  return (
    <div style={{backgroundColor: bgColor}} className='p-4 m-3 rounded-md lg:min-h-screen md:min-h-screen min-h-screen w-[95%] mx-auto'>
        {children}
    </div>
  )
}

export default Container
