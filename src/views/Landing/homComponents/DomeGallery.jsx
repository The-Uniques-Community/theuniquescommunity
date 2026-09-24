import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

// 14 Beautiful staggered positions on a 1800x1100 plane
const FIXED_LAYOUTS = [
  { x: 100, y: 80, w: 320, h: 220 },
  { x: 460, y: 50, w: 260, h: 320 },
  { x: 760, y: 120, w: 340, h: 220 },
  { x: 1140, y: 60, w: 280, h: 300 },
  { x: 1460, y: 140, w: 300, h: 200 },
  
  { x: 80, y: 360, w: 280, h: 320 },
  { x: 400, y: 440, w: 320, h: 220 },
  { x: 760, y: 390, w: 300, h: 360 },
  { x: 1100, y: 420, w: 320, h: 240 },
  { x: 1460, y: 380, w: 260, h: 340 },
  
  { x: 120, y: 740, w: 340, h: 240 },
  { x: 500, y: 720, w: 280, h: 320 },
  { x: 820, y: 790, w: 300, h: 220 },
  { x: 1160, y: 720, w: 320, h: 300 }
];

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export default function DomeGallery({
  images = [],
  overlayBlurColor = '#120F17',
  grayscale = false
}) {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  
  // Translation coordinates
  const positionRef = useRef({ x: 0, y: 0 });
  const containerDimensions = useRef({ w: 1800, h: 1100 });
  const boundsRef = useRef({ minX: -1000, maxX: 200, minY: -700, maxY: 200 });

  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startPositionRef = useRef({ x: 0, y: 0 });
  const inertiaRAF = useRef(null);
  const lastDragEndAt = useRef(0);

  // States
  const [activeImage, setActiveImage] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Compute theme variables dynamically based on overlayBlurColor
  const isDarkTheme = useMemo(() => {
    // If background is dark gray/black/dark violet
    const color = overlayBlurColor.toLowerCase();
    return color.includes('12') || color.includes('0') || color.includes('f') || color.includes('#1') || color.includes('#0');
  }, [overlayBlurColor]);

  const applyTranslation = (x, y) => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  // Compute layout bounds based on root viewport size
  const updateBounds = useCallback(() => {
    if (!rootRef.current) return;
    const w = rootRef.current.clientWidth;
    const h = rootRef.current.clientHeight;
    
    // Bounds let the user pan around the plane but clamp so they don't drag it entirely off-screen
    const buffer = 150; 
    boundsRef.current = {
      minX: w - containerDimensions.current.w - buffer,
      maxX: buffer,
      minY: h - containerDimensions.current.h - buffer,
      maxY: buffer
    };

    // Keep current position inside new bounds if resized
    positionRef.current.x = clamp(positionRef.current.x, boundsRef.current.minX, boundsRef.current.maxX);
    positionRef.current.y = clamp(positionRef.current.y, boundsRef.current.minY, boundsRef.current.maxY);
    applyTranslation(positionRef.current.x, positionRef.current.y);
  }, []);

  // Set initial position centered
  useEffect(() => {
    if (!rootRef.current) return;
    const w = rootRef.current.clientWidth;
    const h = rootRef.current.clientHeight;

    positionRef.current = {
      x: (w - containerDimensions.current.w) / 2,
      y: (h - containerDimensions.current.h) / 2
    };

    applyTranslation(positionRef.current.x, positionRef.current.y);
    updateBounds();

    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [updateBounds]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback((vx, vy) => {
    let velocityX = clamp(vx, -1.5, 1.5) * 45;
    let velocityY = clamp(vy, -1.5, 1.5) * 45;
    
    const friction = 0.94;
    const stopThreshold = 0.02;

    const step = () => {
      velocityX *= friction;
      velocityY *= friction;

      if (Math.abs(velocityX) < stopThreshold && Math.abs(velocityY) < stopThreshold) {
        inertiaRAF.current = null;
        return;
      }

      const nextX = clamp(positionRef.current.x + velocityX, boundsRef.current.minX, boundsRef.current.maxX);
      const nextY = clamp(positionRef.current.y + velocityY, boundsRef.current.minY, boundsRef.current.maxY);

      positionRef.current = { x: nextX, y: nextY };
      applyTranslation(nextX, nextY);

      // Stop if hitting bounds
      if (nextX === boundsRef.current.minX || nextX === boundsRef.current.maxX) velocityX = 0;
      if (nextY === boundsRef.current.minY || nextY === boundsRef.current.maxY) velocityY = 0;

      if (velocityX === 0 && velocityY === 0) {
        inertiaRAF.current = null;
        return;
      }

      inertiaRAF.current = requestAnimationFrame(step);
    };

    stopInertia();
    inertiaRAF.current = requestAnimationFrame(step);
  }, [stopInertia]);

  // Gestures for 2D panning
  useGesture(
    {
      onDragStart: ({ event }) => {
        stopInertia();
        const evt = event;
        draggingRef.current = true;
        movedRef.current = false;
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        startPositionRef.current = { ...positionRef.current };
        if (!hasInteracted) {
          setHasInteracted(true);
        }
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0] }) => {
        if (!draggingRef.current) return;
        const evt = event;
        const dx = evt.clientX - startPosRef.current.x;
        const dy = evt.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          if (dx * dx + dy * dy > 16) {
            movedRef.current = true;
          }
        }

        const nextX = clamp(startPositionRef.current.x + dx, boundsRef.current.minX, boundsRef.current.maxX);
        const nextY = clamp(startPositionRef.current.y + dy, boundsRef.current.minY, boundsRef.current.maxY);

        positionRef.current = { x: nextX, y: nextY };
        applyTranslation(nextX, nextY);

        if (last) {
          draggingRef.current = false;
          const [vx, vy] = velocity;
          const [dirX, dirY] = direction;
          
          const velX = vx * dirX;
          const velY = vy * dirY;

          if (Math.abs(velX) > 0.05 || Math.abs(velY) > 0.05) {
            startInertia(velX, velY);
          }

          if (movedRef.current) {
            lastDragEndAt.current = performance.now();
          }
        }
      }
    },
    { target: rootRef, eventOptions: { passive: true } }
  );

  // Staggered images items array mapped to fixed positions
  const items = useMemo(() => {
    return FIXED_LAYOUTS.map((pos, index) => {
      const img = images[index % images.length] || { src: '', alt: '', title: '', category: '' };
      return {
        ...pos,
        src: img.src,
        alt: img.alt,
        title: img.title || `Achievement ${index + 1}`,
        category: img.category || 'Event'
      };
    });
  }, [images]);

  const handleItemClick = (e, item) => {
    if (movedRef.current || performance.now() - lastDragEndAt.current < 100) {
      return;
    }
    setActiveImage(item);
  };

  // Define canvas theme tokens inline
  const themeStyles = {
    '--canvas-bg': isDarkTheme ? '#0b090e' : '#f8f9fa',
    '--canvas-border': isDarkTheme ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)',
    '--grid-dot-color': isDarkTheme ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.06)',
    '--card-bg': isDarkTheme ? '#15111e' : '#ffffff',
    '--card-border': isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    '--fade-color': overlayBlurColor
  };

  return (
    <div
      ref={rootRef}
      className="plane-root"
      style={themeStyles}
    >
      {/* Draggable photo container */}
      <div ref={containerRef} className="plane-container">
        {items.map((item, i) => (
          <div
            key={i}
            className="plane-item"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${item.w}px`,
              height: `${item.h}px`,
              filter: grayscale ? 'grayscale(1)' : 'none'
            }}
            onClick={(e) => handleItemClick(e, item)}
          >
            <img src={item.src} alt={item.alt || 'Achievement'} draggable={false} />
            
            {/* Elegant details badge card overlay */}
            <div className="plane-item-overlay">
              <span className="plane-item-category">{item.category}</span>
              <h3 className="plane-item-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Radial fade borders to frame the gallery organically */}
      <div className="plane-fade">
        <div className="plane-fade-top" />
        <div className="plane-fade-bottom" />
        <div className="plane-fade-left" />
        <div className="plane-fade-right" />
      </div>

      {/* Floating helper indicator */}
      {!hasInteracted && (
        <div className="plane-instructor">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
            <path d="M9 12h12"/>
          </svg>
          <span>Drag to Explore Achievements</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
            <path d="M15 12H3"/>
          </svg>
        </div>
      )}

      {/* Lightbox / Modal Modal View */}
      <div className={`plane-lightbox ${activeImage ? 'active' : ''}`}>
        <div className="plane-lightbox-scrim" onClick={() => setActiveImage(null)} />
        {activeImage && (
          <div className="plane-lightbox-content">
            <button className="plane-lightbox-close" onClick={() => setActiveImage(null)}>✕</button>
            <img src={activeImage.src} alt={activeImage.alt} />
            <div className="plane-lightbox-details">
              <span className="plane-lightbox-category">{activeImage.category}</span>
              <h3 className="plane-lightbox-title">{activeImage.title}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
