import { useEffect, useState } from 'react';

const GridBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    const handleMouseMove = (event) => {
      setMousePosition({ 
        x: event.clientX, 
        y: event.clientY 
      });
    };

    // Initial dimensions
    updateDimensions();
    
    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  const cellSize = 50;
  
  // Calculate number of columns and rows needed to cover the entire viewport
  const columns = Math.ceil(dimensions.width / cellSize) + 1;
  const rows = Math.ceil(dimensions.height / cellSize) + 1;
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base grid lines */}
      <div className="absolute inset-0 z-0" 
        style={{
          backgroundSize: '50px 50px',
          backgroundImage: 'linear-gradient(to right, rgba(202, 0, 25, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(202, 0, 25, 0.03) 1px, transparent 1px)',
        }}
      />
      
      {/* Dynamic hover effect grid cells */}
      {dimensions.width > 0 && Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => {
            // Calculate cell position
            const cellX = colIndex * cellSize;
            const cellY = rowIndex * cellSize;
            
            // Calculate distance from mouse
            const distance = Math.sqrt(
              Math.pow(mousePosition.x - (cellX + cellSize/2), 2) + 
              Math.pow(mousePosition.y - (cellY + cellSize/2), 2)
            );
            
            // Apply highlight based on distance
            const maxDistance = 150;
            const opacity = distance < maxDistance ? (1 - distance / maxDistance) * 0.36 : 0;
            
            return (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className="absolute"
                style={{
                  left: `${cellX}px`,
                  top: `${cellY}px`,
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  border: '1px solid rgba(202, 0, 25, 0)',
                  borderColor: `rgba(202, 0, 25, ${opacity})`,
                  transition: 'border-color 0.15s ease',
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GridBackground;