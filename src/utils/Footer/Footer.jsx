import { useTheme } from "@mui/material";
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from '../../assets/logos/theuniquesCommunity.png'
import { Link } from "react-router";
const Footer = () => {
    const theme = useTheme();
  return (
    <footer className="bg-slate-200 lg:p-6 md:p-6 sm:p-6 p-4 py-12">
      <div style={{borderBottomWidth:'1px',borderColor:theme.palette.primary.dark}} className="max-w-7xl py-4 mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <img src={logo} className="mb-4 w-full h-10 object-contain object-left" alt="" />
          <p className="text-sm mb-4">
            Eget urna dictum varius duis at velit consectetur. Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>

        {/* Explore */}
        <div className="px-3">
          <h4 className="text-lg font-semibold mb-2">EXPLORE</h4>
          <ul className="text-sm space-y-2">
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">accumsan consequat</Link></li>
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">exercitation ullamco</Link></li>
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">fugiat nulla</Link></li>
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">dolore magna</Link></li>
          </ul>
        </div>

        {/* Know More */}
        <div className="px-3">
          <h4 className="text-lg font-semibold mb-2">KNOW MORE</h4>
          <ul className="text-sm space-y-2">
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">blandit cursus</Link></li>
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">aliquam a lacus</Link></li>
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">fugiat nulla</Link></li>
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">dolore magna</Link></li>
          </ul>
        </div>

        {/* About */}
        <div className="px-3">
          <h4 className="text-lg font-semibold mb-2">ABOUT</h4>
          <ul className="text-sm space-y-2">
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">Vestibulum morbi blandit</Link></li>
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">orci sagittis</Link></li>
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">ultrices vel sagittis</Link></li>
            <li className="hover:text-slate-800 hover:underline duration"><Link to="#">adipiscing</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 gap-4 place-content-end">

        {/* Social Icons */}
        <div className="flex justify-end items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-slate-200">
                <Link to="/">
                <div style={{backgroundColor:theme.palette.primary.dark}} className=" w-8 h-8 rounded-full flex justify-center items-center">
                    <FaLinkedinIn color="white" className="text-blue-600 cursor-pointer" size={20} />
                </div>
                </Link>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200">
                <Link to="/">
                <div style={{backgroundColor:theme.palette.primary.dark}} className=" w-8 h-8 rounded-full flex justify-center items-center">
                    <FaInstagram color="white" className="mx-auto cursor-pointer" size={20} />
                </div>
                </Link>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200">
                <Link to="/">
                <div style={{backgroundColor:theme.palette.primary.dark}} className="w-8 h-8 rounded-full flex justify-center items-center">
                    <FaTwitter className=" cursor-pointer" size={20} color="white" />
                </div>
                </Link>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
