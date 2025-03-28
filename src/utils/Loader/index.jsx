import React from 'react';


const CustomLoader = ({ size = 'medium', color = '#ca0019' }) => {
  // Size variants
  const sizes = {
    small: 24,
    medium: 40,
    large: 60
  };
  
  const actualSize = sizes[size] || sizes.medium;
  
  return (
    <div 
      className="custom-loader"
      style={{
        width: actualSize,
        height: actualSize,
        borderRadius: '50%',
        display: 'inline-block',
        borderTop: `2px solid ${color}`,
        borderRight: '2px solid transparent',
        boxSizing: 'border-box',
        animation: 'rotation 1s linear infinite'
      }}
    >
      <style jsx>{`
        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};



const Loader = (props) => {
  return <CustomLoader {...props} />;
};

export default Loader;