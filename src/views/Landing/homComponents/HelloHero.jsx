/**
 * @file HelloHero.jsx
 * @description Physics-based staggered split-text typography animation component built with `@react-spring/web` and `IntersectionObserver`.
 * @architecture Reusable animated typography component used in landing hero sections for impactful letter-by-letter entrance animations.
 * @agent_note Splits input text string into word and letter arrays, creating individual spring animations per character with sequential delays.
 */

import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

/**
 * @component HelloHero
 * @description Animates each character of a text string sequentially into view using spring physics when the element intersects the viewport.
 * @param {Object} props - Component properties
 * @param {string} [props.text=''] - The text content to split and animate
 * @param {string} [props.className=''] - Additional CSS classes applied to the text wrapper
 * @param {number} [props.delay=100] - Delay in milliseconds between consecutive letter animations
 * @param {Object} [props.animationFrom={opacity: 0, transform: 'translate3d(0,40px,0)'}] - Initial spring physics state
 * @param {Object} [props.animationTo={opacity: 1, transform: 'translate3d(0,0,0)'}] - Target spring physics state
 * @param {string} [props.easing='easeOutCubic'] - Easing function identifier
 * @param {number} [props.threshold=0.1] - IntersectionObserver visibility threshold
 * @param {string} [props.rootMargin='-100px'] - IntersectionObserver root margin
 * @param {string} [props.textAlign='center'] - CSS text alignment value
 * @param {Function} [props.onLetterAnimationComplete] - Callback executed when the last letter finishes its animation sequence
 * @state {boolean} inView - Trigger flag toggled when element enters the viewport
 * @api None
 */
const HelloHero = ({
    text = '',
    className = '',
    delay = 100,
    animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = 'easeOutCubic',
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    onLetterAnimationComplete,
}) => {
    const words = text.split(' ').map(word => word.split(''));
    const letters = words.flat();
    const [inView, setInView] = useState(false);
    const ref = useRef();
    const animatedCount = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: animationFrom,
            to: inView
                ? async (next) => {
                    await next(animationTo);
                    animatedCount.current += 1;
                    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                    }
                }
                : animationFrom,
            delay: i * delay,
            config: { easing },
        }))
    );

    return (
        <div className='flex justify-center items-center'>
            <p
                ref={ref}
                className={`split-parent overflow-hidden inline ${className}`}
                style={{ textAlign, whiteSpace: 'normal', wordWrap: 'break-word' }}
            >
                {words.map((word, wordIndex) => (
                    <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                        {word.map((letter, letterIndex) => {
                            const index = words
                                .slice(0, wordIndex)
                                .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                            return (
                                <animated.span
                                    key={index}
                                    style={springs[index]}
                                    className="inline-block transform transition-opacity will-change-transform"
                                >
                                    {letter}
                                </animated.span>
                            );
                        })}
                        <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
                    </span>
                ))}
            </p>
        </div >
    );
};

export default HelloHero;
