import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import UpcomingIcon from '@mui/icons-material/Upcoming';

const EventOverView = ({eventStatus}) => {
  return (
    <div className="w-[95%] mx-auto rounded-md border border-slate-200 p-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-x-1">
            <CalendarMonthOutlinedIcon sx={{ fontSize: 10 }} />
            <p className="text-xs text-slate-700 "> Date</p>
          </div>
          <div className="flex items-center gap-x-1">
            <ScheduleOutlinedIcon sx={{ fontSize: 10 }} />
            <p className="text-xs text-slate-700 ">Time</p>
          </div>
        </div>
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
    </div>
  );
};

export default EventOverView;
