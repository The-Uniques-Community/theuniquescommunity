/**
 * @file TitledCard.jsx
 * @description 3D physics-based interactive tilt card component powered by Framer Motion springs and mouse tracking.
 * @architecture Advanced interactive component in src/utils/Card/ used for hero visuals, featured projects, or portfolio highlights.
 * @agent_note Computes dynamic 3D rotation angles (`rotateX`, `rotateY`) and tooltip lag using Framer Motion springs. Hides tooltip on small screens.
 */

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * @desc Spring physics parameters for dampening, stiffness, and mass
 */
const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2,
};

/**
 * @component TitledCard
 * @description 3D perspective tilt card that responds dynamically to mouse coordinate offsets with depth, scaling, and inertia.
 * @param {Object} props - Component properties
 * @param {string} props.imageSrc - Source URL of the target image
 * @param {string} [props.altText="Tilted card image"] - Image accessibility alt description
 * @param {string} [props.captionText=""] - Floating tooltip caption text
 * @param {string} [props.containerHeight="300px"] - Height of outer container
 * @param {string} [props.containerWidth="100%"] - Width of outer container
 * @param {string} [props.imageHeight="300px"] - Rendered height of card image
 * @param {string} [props.imageWidth="300px"] - Rendered width of card image
 * @param {number} [props.scaleOnHover=1.1] - Zoom magnification scale applied on hover
 * @param {number} [props.rotateAmplitude=14] - Maximum tilt rotation amplitude in degrees
 * @param {boolean} [props.showMobileWarning=true] - Whether to show the mobile disclaimer text
 * @param {boolean} [props.showTooltip=true] - Whether floating cursor tooltip is enabled
 * @param {React.ReactNode} [props.overlayContent=null] - Optional 3D elevated layer content
 * @param {boolean} [props.displayOverlayContent=false] - Flag to render overlayContent in 3D space
 * @state {number} lastY - Previous vertical mouse offset used to calculate cursor velocity
 * @api None
 */
export default function TiltedCard({
    imageSrc,
    altText = "Tilted card image",
    captionText = "",
    containerHeight = "300px",
    containerWidth = "100%",
    imageHeight = "300px",
    imageWidth = "300px",
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showMobileWarning = true,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false,
}) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1,
    });

    const [lastY, setLastY] = useState(0);

    function handleMouse(e) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleMouseLeave() {
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <figure
            ref={ref}
            className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
            style={{
                height: containerHeight,
                width: containerWidth,
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}

            <motion.div
                className="relative [transform-style:preserve-3d]"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX,
                    rotateY,
                    scale,
                }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                    }}
                />

                {displayOverlayContent && overlayContent && (
                    <motion.div
                        className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]"
                    >
                        {overlayContent}
                    </motion.div>
                )}
            </motion.div>

            {showTooltip && (
                <motion.figcaption
                    className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption,
                    }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    );
}
