import React, { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './DomeGallery.css';

export default function DomeGallery({
  images = [],
  grayscale = false
}) {
  const [activeImage, setActiveImage] = useState(null);

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
    <div className="two-row-gallery-root">

      {/* Row 1: Smooth continuous move to Left */}
      <div className="marquee-row-container">
        <div className="marquee-track marquee-track-left">
          {row1.map((item, idx) => renderCard(item, `row1-${idx}`))}
        </div>
      </div>

      {/* Row 2: Smooth continuous move to Right */}
      <div className="marquee-row-container">
        <div className="marquee-track marquee-track-right">
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
