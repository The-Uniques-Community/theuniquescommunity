import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router';
const Button = ({children}, props) => {
  const theme = useTheme();
  return (
    <Link to={props.path}>
      <button className=''>
        {children}
      </button>
    </Link>

  )
}

export default Button