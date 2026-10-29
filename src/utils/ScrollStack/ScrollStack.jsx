/**
 * @file ScrollStack.jsx
 * @description High-performance stacking card scroller that dynamically scales, rotates, and pins cards as they scroll into view.
 * @architecture Complex scroll-driven presentation engine in src/utils/ScrollStack/ used for feature stories and milestone presentations.
 * @agent_note Computes scroll position via window or container scroller, caching transforms in `lastTransformsRef` to prevent unnecessary DOM style mutations. Uses `requestAnimationFrame`.
 */

import { useLayoutEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

/**
 * @component ScrollStackItem
 * @description Card item wrapper required for individual stacked elements inside ScrollStack.
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Inner card content
 * @param {string} [props.itemClassName=''] - Additional CSS classes
 * @state None
 * @api None
 */
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

/**
 * @component ScrollStack
 * @description Card scroller container that stacks, pins, scales, and subtly rotates child cards sequentially on scroll.
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - ScrollStackItem elements to be stacked
 * @param {string} [props.className=''] - Container class name
 * @param {number} [props.itemDistance=100] - Vertical margin distance between cards in px
 * @param {number} [props.itemScale=0.03] - Scale increment applied per stacked card layer
 * @param {number} [props.itemStackDistance=30] - Visual offset between stacked card tops in px
 * @param {string|number} [props.stackPosition='15%'] - Scroll trigger start position threshold
 * @param {string|number} [props.scaleEndPosition='5%'] - Scroll trigger finish position threshold
 * @param {number} [props.baseScale=0.92] - Initial scale factor for the deepest stacked card
 * @param {number} [props.rotationAmount=0.2] - Slight rotational angle applied per card during stack
 * @param {boolean} [props.useWindowScroll=true] - Whether to bind to window scroll or local element scroll
 * @state None (utilizes mutable refs and rAF animation loop)
 * @api None
 */
const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '15%',
  scaleEndPosition = '5%',
  baseScale = 0.92,
  rotationAmount = 0.2,
  useWindowScroll = true,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]);
  const endElementOffsetRef = useRef(0);
  const lastTransformsRef = useRef(new Map());
  const tickingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : window.innerHeight
      };
    }
  }, [useWindowScroll]);

  const updateOffsets = useCallback(() => {
    const scroller = scrollerRef.current;
    if (useWindowScroll) {
      cardOffsetsRef.current = cardsRef.current.map(card => {
        if (!card) return 0;
        const rect = card.getBoundingClientRect();
        return rect.top + window.scrollY;
      });

      const endElement = document.querySelector('.scroll-stack-end');
      if (endElement) {
        const rect = endElement.getBoundingClientRect();
        endElementOffsetRef.current = rect.top + window.scrollY;
      }
    } else if (scroller) {
      const scrollerRect = scroller.getBoundingClientRect();
      cardOffsetsRef.current = cardsRef.current.map(card => {
        if (!card) return 0;
        const rect = card.getBoundingClientRect();
        return rect.top + scroller.scrollTop - scrollerRect.top;
      });

      const endElement = scroller.querySelector('.scroll-stack-end');
      if (endElement) {
        const rect = endElement.getBoundingClientRect();
        endElementOffsetRef.current = rect.top + scroller.scrollTop - scrollerRect.top;
      }
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length) return;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endElementOffsetRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsetsRef.current[i];
      if (cardTop === undefined) return;

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Use hardware-accelerated opacity instead of expensive layout-blocking filter blur
      const opacity = 1 - (scaleProgress * 0.15 * (i < cardsRef.current.length - 1 ? 1 : 0));

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        opacity: Math.round(opacity * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.5 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.opacity - newTransform.opacity) > 0.01;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.opacity = newTransform.opacity;
        lastTransformsRef.current.set(i, newTransform);
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    calculateProgress,
    parsePercentage,
    getScrollData
  ]);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        updateCardTransforms();
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const scrollTarget = useWindowScroll ? window : scroller;
    if (!scrollTarget) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, opacity';
      card.style.transformOrigin = 'top center';
    });

    // Add a slight delay for image loading and layout computation
    const timer = setTimeout(() => {
      updateOffsets();
      updateCardTransforms();
    }, 100);

    // Passive scroll listener (no thread blocking, high performance)
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      updateOffsets();
      updateCardTransforms();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      lastTransformsRef.current.clear();
    };
  }, [
    itemDistance,
    useWindowScroll,
    handleScroll,
    updateOffsets,
    updateCardTransforms
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
