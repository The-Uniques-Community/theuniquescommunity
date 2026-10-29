/**
 * @file SpotLightCard.jsx
 * @description Interactive wrapper card that renders a dynamic radial spotlight beam following mouse movement.
 * @architecture Micro-interaction wrapper component in src/utils/Card/ enclosing interactive feature blocks and cards.
 * @agent_note Calculates cursor coordinates relative to bounding client rect; updates radial gradient origin on mouse move.
 */

import { useRef, useState } from "react";

/**
 * @component SpotlightCard
 * @description Card container rendering an animated radial spotlight gradient tracking mouse hover and keyboard focus.
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child elements rendered inside the card
 * @param {string} [props.className=""] - Additional CSS class names
 * @param {string} [props.spotlightColor="rgb(255,190,190,0.25)"] - RGBA / CSS color for the radial gradient spotlight
 * @state {boolean} isFocused - Indicates keyboard focus state
 * @state {Object} position - Cursor coordinates `{ x: number, y: number }` relative to card container
 * @state {number} opacity - Spotlight overlay opacity (0 to 0.6)
 * @api None
 */
const SpotlightCard = ({ children, className = "", spotlightColor = "rgb(255,190,190,0.25)" }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(0.6);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(0.6);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative w-full rounded-3xl bg-white overflow-hidden p-8 shadow-slate-200 shadow-lg ${className}`}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
                style={{
                    opacity,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 50%)`,
                }}
            />
            {children}
        </div>
    );
};

export default SpotlightCard;
