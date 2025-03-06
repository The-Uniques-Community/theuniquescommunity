import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Tooltip from '@mui/material/Tooltip';
import UpcomingIcon from '@mui/icons-material/Upcoming';

const EventOverView = ({eventStatus,eventName,eventDate, eventTime}) => {
  return (
    <div className="w-[96%] relative my-2 mx-auto rounded-md border border-slate-200 p-2">
        <div className="absolute bottom-0 right-0 bg-[#ca0019] text-white text-xs px-2">
            <p>Event</p>
        </div>
      <div className="flex justify-end items-center">
        <div>
            {
                eventStatus === "upcoming" ? (
                    <div className="flex items-center gap-x-1">
                        <UpcomingIcon sx={{ fontSize: 10, fontWeight:500, color: '#dc2626' }} />
                        <p className="text-xs font-medium text-red-600 ">Upcoming</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-x-1">
                        <BeenhereIcon sx={{ fontSize: 10, fontWeight:500, color:'#16a34a' }} />
                        <p className="text-xs text-green-600 ">Completed</p>
                    </div>
                )
            }
        </div>
      </div>
      <div>
        <Tooltip title={eventName} arrow>
          
        <h2 className="text-lg font-semibold ps-3 flex items-center gap-x-1 text-slate-700"><span className={`inline-block w-3 h-3 rounded-full ${eventStatus==='upcoming'?'bg-[#ca0019]':'bg-green-600'}`}></span>{eventName?(eventName.length>20?eventName.slice(0,16)+"...":eventName):"Can't Load Name"}</h2>
        </Tooltip>
        <div className="flex justify-start gap-x-5 items-center px-3 py-2">
          <div className="flex items-center gap-x-1">
            <CalendarMonthOutlinedIcon sx={{ fontSize: 14, color:"#64748b" }} />
            <p className="text-sm text-slate-500 "> {eventDate?eventDate:'---'}</p>
          </div>
          <div className="flex items-center gap-x-1">
            <ScheduleOutlinedIcon sx={{ fontSize: 14, color:'#64748b' }} />
            <p className="text-sm text-slate-500 ">{eventTime?eventTime:'---'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOverView;
