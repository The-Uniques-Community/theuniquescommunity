import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router';
import { GoArrowUpRight } from "react-icons/go";

const Button = ({children, path,bgColor,color,iconColor}) => {
  const theme = useTheme();
  return (
    <Link to={path}>
      <button style={{backgroundColor: bgColor,color: color}} className={`relative px-5 py-2.5 overflow-hidden group bg-[${bgColor}] hover:bg-gradient-to-r hover:from-[${bgColor}] hover:to-[${bgColor}] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[${bgColor}] transition-all ease-out duration-300`}>
      <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease"></span>
        {children}
        <span className=''>
          <GoArrowUpRight className='ms-2 inline-block group-hover:rotate-45 duration-75' size={20} color={iconColor} />
        </span>
      </button>
    </Link>

  )
}

export default Button