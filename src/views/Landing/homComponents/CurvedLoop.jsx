/**
 * @file CurvedLoop.jsx
 * @description Interactive animated logo loop positioning logos along a mathematical quadratic Bezier curve with rotation tangents and drag interaction.
 * @architecture Presentation component used for showcasing sponsor/partner logos across curved paths, integrating with framer-motion `useInView`.
 * @agent_note Calculates Quadratic Bezier coordinates: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2, computing tangent angles via atan2(dY, dX) for smooth directional alignment. Pauses requestAnimationFrame when out of viewport.
 */

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import './CurvedLoop.css';

/**
 * @component CurvedLoop
 * @description Renders logos along an SVG arc with continuous automated scrolling, momentum drag interactions, and dark mode responsiveness.
 * @param {Object} props - Component properties
 * @param {Array<Object>} [props.logos=[]] - Array of logo objects containing `name` and `logo` image URL
 * @param {number} [props.speed=1] - Base movement speed in pixels per frame
 * @param {number} [props.curveAmount=100] - Curvature displacement height for the quadratic curve control point
 * @param {'left'|'right'} [props.direction='left'] - Initial scrolling direction
 * @param {boolean} [props.interactive=true] - Allows user touch/mouse drag manipulation
 * @param {boolean} [props.isDarkMode=false] - Inverts logo styles and curve stroke for dark themes
 * @state {number} width - Measured pixel width of the container element
 * @state {number} offset - Cumulative scroll offset driving logo positions along the curve
 * @api None (Purely mathematical animation and rendering)
 */
const CurvedLoop = ({
  logos = [],
  speed = 1,
  curveAmount = 100,
  direction = 'left',
  interactive = true,
  isDarkMode = false
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '150px 0px' });
  const [width, setWidth] = useState(1440);
  const [offset, setOffset] = useState(0);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const logoWidth = 140;
  const logoHeight = 60;

  // Handle responsiveness
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      setWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Animation Loop (Pauses when scrolled out of view)
  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        setOffset(prev => prev + delta);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [speed, isInView]);

  // Pointer/Drag Handlers
  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    setOffset(prev => prev + dx);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  // Math for Quadratic Bezier Curve:
  // P0 = (-margin, startY), P1 = (width/2, startY + curveAmount), P2 = (width + margin, startY)
  const margin = 200;
  const startX = -margin;
  const endX = width + margin;
  const totalCurveWidth = endX - startX;
  const startY = 40;

  // Render logos calculated along the path
  const visibleLogos = [];
  const totalLogosCount = logos.length;

  if (totalLogosCount > 0) {
    // Desired spacing
    const desiredSpacing = 280;
    // Calculate number of slots needed to cover the curve width
    const slotsCount = Math.max(totalLogosCount, Math.ceil(totalCurveWidth / desiredSpacing));
    // Divide the curve width exactly by the number of slots for a perfect loop
    const spacing = totalCurveWidth / slotsCount;

    for (let i = 0; i < slotsCount; i++) {
      const logo = logos[i % totalLogosCount];

      // Calculate raw x position with wrapping
      let rawX = (offset + i * spacing) % totalCurveWidth;
      if (rawX < 0) rawX += totalCurveWidth;

      // Map to curve coordinates (relative to startX)
      const x = startX + rawX;

      // Normalize to t [0, 1]
      const t = (x - startX) / totalCurveWidth;

      // Quadratic Bezier Formula
      // B(t) = (1-t)^2 * P0 + 2(1-t)*t * P1 + t^2 * P2
      const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * (startY + curveAmount) + t * t * startY;

      // Tangent Angle Calculation: dy/dt and dx/dt
      const dXdT = totalCurveWidth;
      const dYdT = 2 * (1 - 2 * t) * curveAmount;
      const angle = Math.atan2(dYdT, dXdT) * (180 / Math.PI);

      visibleLogos.push({
        ...logo,
        key: `logo-slot-${i}`,
        x: x - logoWidth / 2,
        y: y - logoHeight / 2,
        angle
      });
    }
  }

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      ref={containerRef}
      className="curved-loop-jacket relative w-full h-[220px] overflow-hidden select-none touch-none"
      style={{ cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* SVG curve background line for premium look */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <path
          d={`M ${startX} ${startY} Q ${width / 2} ${startY + curveAmount} ${endX} ${startY}`}
          fill="none"
          stroke={isDarkMode ? "#ffffff" : "#000000"}
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>

      {/* Render Logos along the path */}
      {visibleLogos.map(logo => (
        <div
          key={logo.key}
          className={`absolute flex items-center justify-center p-3 rounded-xl border transition-colors duration-300 ${
            isDarkMode
              ? "bg-[#1f1f1f]/90 border-white/5 shadow-lg shadow-black/20"
              : "bg-white/90 border-gray-100 shadow-md shadow-gray-200/50"
          }`}
          style={{
            width: `${logoWidth}px`,
            height: `${logoHeight}px`,
            left: `${logo.x}px`,
            top: `${logo.y}px`,
            transform: `rotate(${logo.angle}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <img
            src={logo.logo}
            alt={logo.name}
            className={`max-h-full max-w-full object-contain pointer-events-none select-none ${
              isDarkMode ? "brightness-0 invert opacity-80" : "opacity-80"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default CurvedLoop;
