import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './DomeGallery.css';

// Card dimensions & spacing
const CARD_WIDTH = 340;
const CARD_HEIGHT = 265;
const CARD_GAP = 24;
const CARD_SPAN = CARD_WIDTH + CARD_GAP; // 364px per item slot

// Helper to keep position within seamless infinite loop boundary [-setSpan, 0]
const wrapPosition = (val, setSpan) => {
  if (setSpan <= 0) return 0;
  return ((val % setSpan) - setSpan) % setSpan;
};

export default function DomeGallery({
  images = [],
  overlayBlurColor = '#120F17',
  grayscale = false
}) {
  const rootRef = useRef(null);
  const row1TrackRef = useRef(null);
  const row2TrackRef = useRef(null);

  // Position offsets for each row
  const row1Pos = useRef(0);
  const row2Pos = useRef(0);

  // Drag & interaction state per row
  const row1Drag = useRef({ isDown: false, startX: 0, lastX: 0, moved: false, velocity: 0 });
  const row2Drag = useRef({ isDown: false, startX: 0, lastX: 0, moved: false, velocity: 0 });

  // Hover states
  const row1Hovered = useRef(false);
  const row2Hovered = useRef(false);

  // Inertia animation RAF
  const row1InertiaRAF = useRef(null);
  const row2InertiaRAF = useRef(null);

  // Last drag end timestamp to prevent opening modal right after drag
  const lastDragEndAt = useRef(0);

  // Active image for lightbox modal
  const [activeImage, setActiveImage] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (activeImage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeImage]);

  // Current active index in images list
  const activeIndex = useMemo(() => {
    if (!activeImage || !images || images.length === 0) return -1;
    return images.findIndex(
      (img) => img.src === activeImage.src || img.title === activeImage.title
    );
  }, [activeImage, images]);

  const handlePrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!images || images.length === 0) return;
      const prevIdx = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
      setActiveImage(images[prevIdx]);
    },
    [activeIndex, images]
  );

  const handleNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!images || images.length === 0) return;
      const nextIdx = activeIndex < images.length - 1 ? activeIndex + 1 : 0;
      setActiveImage(images[nextIdx]);
    },
    [activeIndex, images]
  );

  // Keyboard navigation: Escape to close, Left/Right arrows to browse
  useEffect(() => {
    if (!activeImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, handlePrev, handleNext]);

  // Split images evenly between top row and bottom row
  const { row1Items, row2Items } = useMemo(() => {
    if (!images || images.length === 0) return { row1Items: [], row2Items: [] };
    const half = Math.ceil(images.length / 2);
    const top = images.slice(0, half);
    const bottom = images.slice(half);
    return {
      row1Items: top.length > 0 ? top : images,
      row2Items: bottom.length > 0 ? bottom : images
    };
  }, [images]);

  // Create repeating set of 4 copies for each row to ensure infinite smooth continuity
  const row1Repeats = useMemo(() => {
    if (row1Items.length === 0) return [];
    return [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  }, [row1Items]);

  const row2Repeats = useMemo(() => {
    if (row2Items.length === 0) return [];
    return [...row2Items, ...row2Items, ...row2Items, ...row2Items];
  }, [row2Items]);

  const row1SetWidth = row1Items.length * CARD_SPAN;
  const row2SetWidth = row2Items.length * CARD_SPAN;

  // Set initial staggered positions
  useEffect(() => {
    row1Pos.current = 0;
    row2Pos.current = -row2SetWidth / 2; // Stagger bottom row visually
    if (row1TrackRef.current) {
      row1TrackRef.current.style.transform = `translate3d(${row1Pos.current}px, 0, 0)`;
    }
    if (row2TrackRef.current) {
      row2TrackRef.current.style.transform = `translate3d(${row2Pos.current}px, 0, 0)`;
    }
  }, [row1SetWidth, row2SetWidth]);

  // Main Animation Loop: Row 1 moves LEFT (<-), Row 2 moves RIGHT (->)
  useEffect(() => {
    let lastTime = performance.now();
    let animId = null;

    const autoScrollSpeed = 0.8; // Smooth reading speed

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 16.666, 2.5);
      lastTime = currentTime;

      const isModalOpen = !!activeImage;

      // 1. TOP ROW: Move towards the LEFT side (negative X)
      if (!row1Drag.current.isDown && !row1Hovered.current && !isModalOpen && !row1InertiaRAF.current) {
        row1Pos.current = wrapPosition(row1Pos.current - autoScrollSpeed * dt, row1SetWidth);
        if (row1TrackRef.current) {
          row1TrackRef.current.style.transform = `translate3d(${row1Pos.current}px, 0, 0)`;
        }
      }

      // 2. BOTTOM ROW: Move towards the RIGHT side (positive X)
      if (!row2Drag.current.isDown && !row2Hovered.current && !isModalOpen && !row2InertiaRAF.current) {
        row2Pos.current = wrapPosition(row2Pos.current + autoScrollSpeed * dt, row2SetWidth);
        if (row2TrackRef.current) {
          row2TrackRef.current.style.transform = `translate3d(${row2Pos.current}px, 0, 0)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [row1SetWidth, row2SetWidth, activeImage]);

  // Inertia momentum handler for Row 1
  const startRow1Inertia = (initialVelocity) => {
    let vel = Math.max(Math.min(initialVelocity * 20, 30), -30);
    const friction = 0.94;
    const threshold = 0.05;

    const step = () => {
      vel *= friction;
      if (Math.abs(vel) < threshold) {
        row1InertiaRAF.current = null;
        return;
      }
      row1Pos.current = wrapPosition(row1Pos.current + vel, row1SetWidth);
      if (row1TrackRef.current) {
        row1TrackRef.current.style.transform = `translate3d(${row1Pos.current}px, 0, 0)`;
      }
      row1InertiaRAF.current = requestAnimationFrame(step);
    };

    if (row1InertiaRAF.current) cancelAnimationFrame(row1InertiaRAF.current);
    row1InertiaRAF.current = requestAnimationFrame(step);
  };

  // Inertia momentum handler for Row 2
  const startRow2Inertia = (initialVelocity) => {
    let vel = Math.max(Math.min(initialVelocity * 20, 30), -30);
    const friction = 0.94;
    const threshold = 0.05;

    const step = () => {
      vel *= friction;
      if (Math.abs(vel) < threshold) {
        row2InertiaRAF.current = null;
        return;
      }
      row2Pos.current = wrapPosition(row2Pos.current + vel, row2SetWidth);
      if (row2TrackRef.current) {
        row2TrackRef.current.style.transform = `translate3d(${row2Pos.current}px, 0, 0)`;
      }
      row2InertiaRAF.current = requestAnimationFrame(step);
    };

    if (row2InertiaRAF.current) cancelAnimationFrame(row2InertiaRAF.current);
    row2InertiaRAF.current = requestAnimationFrame(step);
  };

  // Pointer Drag Handlers for Row 1
  const onRow1PointerDown = (e) => {
    if (row1InertiaRAF.current) {
      cancelAnimationFrame(row1InertiaRAF.current);
      row1InertiaRAF.current = null;
    }
    row1Drag.current = {
      isDown: true,
      startX: e.clientX,
      lastX: e.clientX,
      moved: false,
      velocity: 0
    };
    if (!hasInteracted) setHasInteracted(true);
  };

  const onRow1PointerMove = (e) => {
    if (!row1Drag.current.isDown) return;
    const dx = e.clientX - row1Drag.current.lastX;
    if (Math.abs(e.clientX - row1Drag.current.startX) > 12) {
      row1Drag.current.moved = true;
    }
    row1Drag.current.velocity = dx;
    row1Drag.current.lastX = e.clientX;

    row1Pos.current = wrapPosition(row1Pos.current + dx, row1SetWidth);
    if (row1TrackRef.current) {
      row1TrackRef.current.style.transform = `translate3d(${row1Pos.current}px, 0, 0)`;
    }
  };

  const onRow1PointerUp = () => {
    if (!row1Drag.current.isDown) return;
    const wasMoved = row1Drag.current.moved;
    const vel = row1Drag.current.velocity;
    row1Drag.current.isDown = false;

    if (wasMoved) {
      lastDragEndAt.current = performance.now();
      if (Math.abs(vel) > 0.5) {
        startRow1Inertia(vel);
      }
    }
  };

  // Pointer Drag Handlers for Row 2
  const onRow2PointerDown = (e) => {
    if (row2InertiaRAF.current) {
      cancelAnimationFrame(row2InertiaRAF.current);
      row2InertiaRAF.current = null;
    }
    row2Drag.current = {
      isDown: true,
      startX: e.clientX,
      lastX: e.clientX,
      moved: false,
      velocity: 0
    };
    if (!hasInteracted) setHasInteracted(true);
  };

  const onRow2PointerMove = (e) => {
    if (!row2Drag.current.isDown) return;
    const dx = e.clientX - row2Drag.current.lastX;
    if (Math.abs(e.clientX - row2Drag.current.startX) > 12) {
      row2Drag.current.moved = true;
    }
    row2Drag.current.velocity = dx;
    row2Drag.current.lastX = e.clientX;

    row2Pos.current = wrapPosition(row2Pos.current + dx, row2SetWidth);
    if (row2TrackRef.current) {
      row2TrackRef.current.style.transform = `translate3d(${row2Pos.current}px, 0, 0)`;
    }
  };

  const onRow2PointerUp = () => {
    if (!row2Drag.current.isDown) return;
    const wasMoved = row2Drag.current.moved;
    const vel = row2Drag.current.velocity;
    row2Drag.current.isDown = false;

    if (wasMoved) {
      lastDragEndAt.current = performance.now();
      if (Math.abs(vel) > 0.5) {
        startRow2Inertia(vel);
      }
    }
  };

  // Card click: open modal directly
  const handleCardClick = (item, isRow1) => {
    const moved = isRow1 ? row1Drag.current.moved : row2Drag.current.moved;
    if (moved || performance.now() - lastDragEndAt.current < 100) {
      return;
    }
    setActiveImage(item);
  };

  // Theme detection
  const isDarkTheme = useMemo(() => {
    const color = overlayBlurColor.toLowerCase();
    return color.includes('12') || color.includes('0') || color.includes('f') || color.includes('#1') || color.includes('#0');
  }, [overlayBlurColor]);

  const themeStyles = {
    '--canvas-bg': isDarkTheme ? '#1e1c26' : '#f8f9fc',
    '--canvas-border': '#ca0019',
    '--grid-dot-color': isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
    '--card-bg': isDarkTheme ? '#2b2738' : '#ffffff',
    '--card-border': isDarkTheme ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
    '--fade-color': isDarkTheme ? '#1e1c26' : '#f8f9fc'
  };

  return (
    <div
      ref={rootRef}
      className="plane-root"
      style={themeStyles}
      onPointerLeave={() => {
        onRow1PointerUp();
        onRow2PointerUp();
      }}
    >
      {/* Edge gradient fade masks */}
      <div className="gallery-fade-left" />
      <div className="gallery-fade-right" />

      {/* Main Rows Container */}
      <div className="gallery-dual-rows">
        {/* ROW 1: TOP CARDS — MOVES LEFT */}
        <div
          className="gallery-row-wrapper"
          onMouseEnter={() => { row1Hovered.current = true; }}
          onMouseLeave={() => { row1Hovered.current = false; onRow1PointerUp(); }}
          onTouchStart={() => { row1Hovered.current = true; }}
          onTouchEnd={() => { row1Hovered.current = false; onRow1PointerUp(); }}
          onPointerDown={onRow1PointerDown}
          onPointerMove={onRow1PointerMove}
          onPointerUp={onRow1PointerUp}
          onPointerCancel={onRow1PointerUp}
        >
          <div ref={row1TrackRef} className="gallery-track">
            {row1Repeats.map((item, idx) => (
              <div
                key={`row1-${idx}`}
                className="gallery-card"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  marginRight: `${CARD_GAP}px`,
                  filter: grayscale ? 'grayscale(1)' : 'none'
                }}
                onClick={() => handleCardClick(item, true)}
              >
                <img src={item.src} alt={item.title || 'Achievement'} draggable={false} />
                <div className="gallery-card-overlay">
                  <span className="gallery-card-category">{item.category || 'Achievement'}</span>
                  <h3 className="gallery-card-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: BOTTOM CARDS — MOVES RIGHT */}
        <div
          className="gallery-row-wrapper"
          onMouseEnter={() => { row2Hovered.current = true; }}
          onMouseLeave={() => { row2Hovered.current = false; onRow2PointerUp(); }}
          onTouchStart={() => { row2Hovered.current = true; }}
          onTouchEnd={() => { row2Hovered.current = false; onRow2PointerUp(); }}
          onPointerDown={onRow2PointerDown}
          onPointerMove={onRow2PointerMove}
          onPointerUp={onRow2PointerUp}
          onPointerCancel={onRow2PointerUp}
        >
          <div ref={row2TrackRef} className="gallery-track">
            {row2Repeats.map((item, idx) => (
              <div
                key={`row2-${idx}`}
                className="gallery-card"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  marginRight: `${CARD_GAP}px`,
                  filter: grayscale ? 'grayscale(1)' : 'none'
                }}
                onClick={() => handleCardClick(item, false)}
              >
                <img src={item.src} alt={item.title || 'Achievement'} draggable={false} />
                <div className="gallery-card-overlay">
                  <span className="gallery-card-category">{item.category || 'Achievement'}</span>
                  <h3 className="gallery-card-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating helper indicator */}
      {!hasInteracted && (
        <div className="plane-instructor">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
            <path d="M9 12h12" />
          </svg>
          <span>Click Photo to Open • Drag to Explore</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
            <path d="M15 12H3" />
          </svg>
        </div>
      )}

      {/* Lightbox / Modal View — Rendered via Portal directly to body for ZERO scroll and TRUE viewport centering */}
      {typeof document !== 'undefined' && activeImage && createPortal(
        <div className="plane-lightbox active" onClick={() => setActiveImage(null)}>
          <div className="plane-lightbox-scrim" />
          <div className="plane-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="plane-lightbox-close"
              onClick={() => setActiveImage(null)}
              title="Close (Esc)"
            >
              ✕
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                className="plane-lightbox-nav prev"
                onClick={handlePrev}
                title="Previous Photo (Left Arrow)"
              >
                ‹
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                className="plane-lightbox-nav next"
                onClick={handleNext}
                title="Next Photo (Right Arrow)"
              >
                ›
              </button>
            )}

            <div className="plane-lightbox-img-wrapper">
              <img src={activeImage.src} alt={activeImage.title || 'Achievement'} />
            </div>

            <div className="plane-lightbox-details">
              <span className="plane-lightbox-category">{activeImage.category || 'Achievement'}</span>
              <h3 className="plane-lightbox-title">{activeImage.title}</h3>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}



