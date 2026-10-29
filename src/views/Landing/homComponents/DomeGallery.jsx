/**
 * @file DomeGallery.jsx
 * @description Dual-marquee visual showcase featuring opposing continuous scroll tracks with interactive image zoom and React Portal lightbox modal.
 * @architecture Used in highlight and achievement galleries, utilizing `createPortal` for dead-center viewport modal rendering and `framer-motion` for in-view animation pausing.
 * @agent_note Pauses CSS keyframe animations when scrolled out of view. Portal locks `document.body.style.overflow` to prevent scroll chaining during lightbox preview.
 */

import { useMemo, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useInView } from 'framer-motion';
import './DomeGallery.css';

/**
 * @component DomeGallery
 * @description Renders two opposing horizontal marquee rows of event/achievement cards, opening an enlarged view with metadata in a portal modal upon click.
 * @param {Object} props - Component properties
 * @param {Array<Object>} [props.images=[]] - Array of image objects containing `src`, `title`, `alt`, and `category`
 * @param {boolean} [props.grayscale=false] - Applies full grayscale CSS filter when enabled
 * @state {Object|null} activeImage - Currently selected image object for lightbox modal preview
 * @api None (Pure presentation and lightbox modal)
 */
export default function DomeGallery({
  images = [],
  grayscale = false
}) {
  const [activeImage, setActiveImage] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "100px 0px" });

  // Lock body scroll and listen for Esc key when modal is open
  useEffect(() => {
    if (activeImage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActiveImage(null);
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeImage]);

  // Split images into two distinct rows for dual marquee
  const { row1, row2 } = useMemo(() => {
    if (!images || images.length === 0) return { row1: [], row2: [] };

    const r1 = [];
    const r2 = [];

    images.forEach((img, idx) => {
      const item = {
        src: img.src,
        alt: img.alt || img.title || `Achievement ${idx + 1}`,
        title: img.title || `Achievement ${idx + 1}`,
        category: img.category || 'Event'
      };
      if (idx % 2 === 0) {
        r1.push(item);
      } else {
        r2.push(item);
      }
    });

    if (r1.length === 0) r1.push(...r2);
    if (r2.length === 0) r2.push(...r1);

    // Duplicate rows 4 times for a perfectly continuous and seamless infinite loop
    return {
      row1: [...r1, ...r1, ...r1, ...r1],
      row2: [...r2, ...r2, ...r2, ...r2]
    };
  }, [images]);

  const renderCard = (item, key) => (
    <div
      key={key}
      className="marquee-card group"
      style={{
        filter: grayscale ? 'grayscale(1)' : 'none'
      }}
      onClick={() => setActiveImage(item)}
    >
      <img src={item.src} alt={item.alt} draggable={false} loading="lazy" />

      {/* Card Details Overlay */}
      <div className="marquee-card-overlay">
        <div className="marquee-card-badge-wrap">
          <span className="marquee-card-category">{item.category}</span>
          <span className="marquee-card-zoom-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </span>
        </div>
        <h3 className="marquee-card-title">{item.title}</h3>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="two-row-gallery-root">

      {/* Row 1: Smooth continuous move to Left (Pauses when offscreen) */}
      <div className="marquee-row-container">
        <div
          className="marquee-track marquee-track-left"
          style={{ animationPlayState: isInView ? 'running' : 'paused' }}
        >
          {row1.map((item, idx) => renderCard(item, `row1-${idx}`))}
        </div>
      </div>

      {/* Row 2: Smooth continuous move to Right (Pauses when offscreen) */}
      <div className="marquee-row-container">
        <div
          className="marquee-track marquee-track-right"
          style={{ animationPlayState: isInView ? 'running' : 'paused' }}
        >
          {row2.map((item, idx) => renderCard(item, `row2-${idx}`))}
        </div>
      </div>

      {/* Lightbox Modal Rendered Directly to Body via Portal so it always opens dead-center on screen */}
      {typeof document !== 'undefined' && activeImage && createPortal(
        <div className="plane-lightbox active">
          <div className="plane-lightbox-scrim" onClick={() => setActiveImage(null)} />
          <div className="plane-lightbox-content">
            <button 
              className="plane-lightbox-close" 
              onClick={() => setActiveImage(null)}
              title="Close (Esc)"
            >
              ✕
            </button>
            <div className="plane-lightbox-image-wrap">
              <img src={activeImage.src} alt={activeImage.alt || activeImage.title} />
            </div>
            <div className="plane-lightbox-details">
              <span className="plane-lightbox-category">{activeImage.category}</span>
              <h3 className="plane-lightbox-title">{activeImage.title}</h3>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
