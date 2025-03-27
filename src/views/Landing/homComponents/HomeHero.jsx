// import { Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Button from "@/utils/Buttons/Button"
import Marquee from 'react-fast-marquee';
import tu from '@/assets/logos/tu.png';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

const images = [
  'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rEz8jr2og9AYBbcu0eXTH81rnVdpozvG6K4WI',
  'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rHptqDVpF2pQE4PFU7NAMVr6YeWicz5h1KuJt',
  'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rSSl9pOoaFDA2LEeO4I3rP8jBzJb7cltWkQRY',
  'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rPoSO9PtUGhDgAYWEQrmjToyf265tVLilMXkq',
  'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rAWGbiBcYnIQDTmzWgy0bcOvPRLxFCXr97NJo',
  'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rAlEKhmxcYnIQDTmzWgy0bcOvPRLxFCXr97NJ',
  'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1r5DgQ6rMC9pHMzvDGXT0OePm1Af7nSFktqrKE',
  'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rQYCb4jAIOoVhWP9E5DamsTHKt6ZeSc3LAJly'
];

export default function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const heroRef = useRef(null);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (heroRef.current) {
        setDimensions({
          width: heroRef.current.offsetWidth,
          height: heroRef.current.offsetHeight
        });
      }
    };
    
    const handleMouseMove = (event) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      updateDimensions();
      
      // Update dimensions on window resize
      window.addEventListener('resize', updateDimensions);
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  const cellSize = 50;
  
  // Calculate number of columns and rows needed to cover the entire container
  const columns = Math.ceil(dimensions.width / cellSize) + 1;
  const rows = Math.ceil(dimensions.height / cellSize) + 1;
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white relative" ref={heroRef}>
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="grid-bg w-full h-full" 
          style={{
            backgroundSize: '50px 50px',
            backgroundImage: 'linear-gradient(to right, rgba(202, 0, 25, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(202, 0, 25, 0.03) 1px, transparent 1px)',
          }}
        >
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
                const opacity = distance < maxDistance ? (1 - distance / maxDistance) * 0.3 : 0;
                
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
                      pointerEvents: 'none'
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Content (z-index to place above grid) */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className='text-lg font-medium'>
          <img className="w-10 h-10 object-center mx-auto object-contain" src={tu} alt="" />
          <span className='text-[#ca0019]'>The</span> Uniques Community
        </div>
        <div className="text-center px-6 pt-12 pb-10">
            <Link to="/events">
          <p className="text-sm font-medium px-2 py-1 border rounded-full w-max mx-auto text-red-500 mb-2">View Our Vibrant Events ✨</p>
             </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          A Community of Creators, <br /> Dreamers & Doers.
          </h1>
          <p className="text-gray-600 my-4 max-w-2xl mx-auto">
          Experience tech like never before with The UNIQUES Community — vibrant events, hands-on sessions, and pure innovation.
          </p>
          <Button path="#" bgColor="#ca0019" color="white" iconColor="black">
              Join Us
          </Button>
        </div>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm mb-8">
          {[
            'Retool', 'remote', 'ARC', 'Raycast', 'runway',
            'ramp', 'HEX', 'Vercel', 'descript', 'CashApp',
          ].map((brand, i) => (
            <span key={i}>{brand}</span>
          ))}
        </div>
      </div>

      {/* Image Carousel */}
      <div className="w-full overflow-hidden bg-gradient-to-t from-slate-100 to-white py-6 relative z-10">
        <Marquee gradient={false} speed={40}>
          <div className="flex gap-4">
            {images.concat(images).map((src, i) => (
              <div
                key={i}
                className="min-w-[280px] max-w-[290px] mx-3 h-[200px] rounded-xl overflow-hidden shadow-md bg-white"
              >
                <img
                  src={src}
                  alt={`carousel-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}