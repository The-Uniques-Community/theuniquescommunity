/**
 * @file NavMotion.jsx
 * @description Framer Motion page entrance and exit transition wrapper.
 * @architecture Wraps layout outlet content and subviews in `src/routes` and `src/layout` hierarchies to provide smooth page transition effects.
 * @agent_note Implements tween transitions with an anticipate easing curve on initial mounting and exit animations.
 */

import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * @component NavMotion
 * @description Motion wrapper component animating opacity and scale during navigation transitions.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child elements or routed route outlets to animate.
 * @returns {JSX.Element} Framer Motion animated container.
 */
const NavMotion = ({ children }) => {
  const motionVariants = {

    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const motionTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={motionVariants} transition={motionTransition}>
      {children}
    </motion.div>
  );
};

NavMotion.propTypes = {
  children: PropTypes.node
};

export default NavMotion;
