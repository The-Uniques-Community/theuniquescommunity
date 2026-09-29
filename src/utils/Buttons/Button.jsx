import { Link } from 'react-router';
import { GoArrowUpRight } from "react-icons/go";

const Button = ({children, path, bgColor, color, iconColor, border, borderColor, onClick, className}) => {
  const content = (
    <button 
      onClick={onClick} 
      style={{
        backgroundColor: bgColor,
        color: color,
        borderColor: borderColor ? borderColor : '', 
        border: border ? border : 0
      }} 
      className={`rounded-full min-w-44 relative pl-5 pr-2 py-2 overflow-hidden group text-white hover:ring-2 ${borderColor ? borderColor : ''} hover:ring-offset-2 transition-all ease-out duration-300 inline-flex items-center justify-between gap-3 ${className || ''}`}
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease"></span>
      <div className="flex-1 text-center font-medium text-sm sm:text-base">
        {children}
      </div>
      <div className="shrink-0 ml-auto">
        <span style={{backgroundColor: color}} className="w-8 h-8 rounded-full flex justify-center items-center">
          <GoArrowUpRight className="inline-block group-hover:rotate-45 duration-75" size={18} color={iconColor} />
        </span>
      </div>
    </button>
  );

  if (path) {
    if (path.startsWith('http')) {
      return <a href={path} target="_blank" rel="noopener noreferrer" className="inline-block">{content}</a>;
    }
    return <Link to={path} className="inline-block">{content}</Link>;
  }
  return content;
};

export default Button
