import hc from "@/assets/img/hackathon.webp";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import logo from "@/assets/logos/theuniquescommunity.png";
import "./communitycard.css";
import { Link } from "react-router";
const CommunityCard = () => {
  return (
    <div className="card2 bg-slate-200">
      <div
        style={{ backgroundImage: `url(${hc})`,backgroundSize:'cover', backgroundRepeat:'no-repeat' }}
        className="top-sectionn"
      >
        <div className="absolute z-10 text-xs font-medium text-[#ca0019] top-1 left-1">Event Type Here </div>
      </div>
      <div className="">
        <p className="text-xl pt-3 pb-1 px-3 font-medium">Event Name Here</p>
        <div className="flex justify-start items-center gap-x-1 px-2">
          <LocationOnOutlinedIcon
            sx={{ fontSize: 16 }}
            className="text-slate-700"
          />
          <p className="text-sm text-slate-700">Location here</p>
        </div>
        <div className="h-[1px] w-[280px] mx-auto mt-3 bg-slate-400"></div>
        <div className="flex justify-start gap-x-5 items-center px-3 py-2">
          <div className="flex items-center gap-x-1">
            <CalendarMonthOutlinedIcon sx={{ fontSize: 14 }} />
            <p className="text-sm text-slate-700 "> Date</p>
          </div>
          <div className="flex items-center gap-x-1">
            <ScheduleOutlinedIcon sx={{ fontSize: 14 }} />
            <p className="text-sm text-slate-700 ">Time</p>
          </div>
        </div>
        <div className="mt-3 relative">
          <div class="bordern"></div>
          <img
            src={logo}
            className="h-7 w-1/2 pb-2 px-3 object-contain object-left"
            alt=""
          />
          <Link to="" className="absolute hover:bg-black duration-150 -bottom-2 text-sm -right-1 w-24 rounded-full text-white text-center bg-[#ca0019] py-[6px]">
            <div >
              Know More
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
