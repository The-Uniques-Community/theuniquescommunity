import { useTheme } from '@mui/material/styles';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router';

const MemberCard = ({ linkedin, instagram, twitter, fullName, batch, position, profileImg, onClick }) => {
  const theme = useTheme();

  return (
    <div className={`bg-white hover:shadow-lg duration-75 px-2 py-3 border-t-[1px] shadow-md max-w-64 relative`}>
      {/* Profile Image */}
      <div className='overflow-hidden rounded-lg'>
        <img src={profileImg} className="hover:scale-105 duration-150  custom-clip rounded-t-lg rounded-l-lg" alt={`${fullName}'s Profile`} />
      </div>
      
      {/* Social Media Links */}
      <div className="flex flex-col gap-y-4 absolute right-2 top-0 bottom-0 items-center justify-start py-5 bg-black w-12">
        {/* Twitter */}
        {twitter && (
          <Link to={twitter} target="_blank">
            <div className="rounded-full w-8 h-8 bg-white">
              <div className="flex justify-center items-center w-full h-full">
                <FaXTwitter size={18} color="black" />
              </div>
            </div>
          </Link>
        )}

        {/* Instagram */}
        {instagram && (
          <Link to={instagram} target="_blank">
            <div className="rounded-full w-8 h-8 bg-white">
              <div className="flex justify-center items-center w-full h-full">
                <FaInstagram size={18} color="black" />
              </div>
            </div>
          </Link>
        )}

        {/* LinkedIn */}
        {linkedin && (
          <Link to={linkedin} target="_blank">
            <div className="rounded-full w-8 h-8 bg-white">
              <div className="flex justify-center items-center w-full h-full">
                <FaLinkedinIn size={18} color="black" />
              </div>
            </div>
          </Link>
        )}
      </div>
      
      {/* Name and Position */}
      <div className="font-bold text-xl">
        <p className="border-b-[1px] border-slate-500">{fullName}</p>
        <span className="font-light text-slate-700 text-sm -mt-3">/{position}</span>
      </div>

      {/* Batch */}
      <div className="w-max px-1 bottom-2 h-6 bg-[#ca0019] mb-2">
        <p className="text-white font-semibold">{batch}</p>
      </div>

      {/* Arrow Link */}
      <div className="absolute right-16 bottom-4">
        
          <div onClick={onClick} className="w-12 h-12 rounded-full group flex bg-black justify-center items-center">
            <GoArrowUpRight className="inline-block group-hover:rotate-45 duration-75" size={20} color="white" />
          </div>
        
      </div>
    </div>
  );
};

export default MemberCard;
