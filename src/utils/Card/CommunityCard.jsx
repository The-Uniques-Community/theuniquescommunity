import { useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import "./communitycard.css";
import logo from "@/assets/logos/theuniquesCommunity.png";

const CommunityCard = ({ event, onClick }) => {
  const navigate = useNavigate();

  // Extract Google Drive file ID from object, URL, or string
  const extractFileId = (bannerData) => {
    if (!bannerData) return null;
    if (typeof bannerData === "object") {
      if (bannerData.fileId) return bannerData.fileId;
      if (bannerData.fileUrl) {
        const match =
          bannerData.fileUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
          bannerData.fileUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match) return match[1];
      }
      return null;
    }
    const str = String(bannerData);
    const match =
      str.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
      str.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
    if (!str.startsWith("http") && str.length > 15) return str;
    return null;
  };

  // High-resolution direct image URL
  const getBannerUrl = (bannerData) => {
    const fileId = extractFileId(bannerData);
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
    }
    if (typeof bannerData === "object" && bannerData.fileUrl)
      return bannerData.fileUrl;
    if (typeof bannerData === "string" && bannerData.startsWith("http"))
      return bannerData;
    return "https://placehold.co/600x400?text=Event";
  };

  // Get the correct event ID
  const getEventId = () => {
    if (!event) return null;
    const possibleIds = [
      event._id,
      event.id,
      event.eventId,
      event.objectId,
    ];
    for (const id of possibleIds) {
      if (id) return id;
    }
    return null;
  };

  // Handle card click
  const handleCardClick = (e) => {
    if (e.target.closest(".know-more-button")) {
      return;
    }

    if (onClick) {
      onClick(event);
      return;
    }

    const eventId = getEventId();
    if (eventId) {
      navigate(`/events/${eventId}`);
    } else if (event?.eventLink) {
      window.open(event.eventLink, "_blank");
    }
  };

  // Handle "Know More" button click
  const handleKnowMoreClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClick) {
      onClick(event);
      return;
    }

    const eventId = getEventId();
    if (eventId) {
      navigate(`/events/${eventId}`);
    } else if (event?.eventLink) {
      window.open(event.eventLink, "_blank");
    }
  };

  if (!event) return null;

  const eventDateString = event?.eventDate
    ? new Date(event.eventDate).toDateString()
    : "Date TBA";
  const eventStatusText = event?.eventStatus
    ? event.eventStatus.charAt(0).toUpperCase() + event.eventStatus.slice(1)
    : "Active";

  return (
    <div className="card2-custom-container group cursor-pointer" onClick={handleCardClick}>
      {/* Hidden SVG Definition for Responsive ObjectBoundingBox Clip-Path */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="card-cutout-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.06 Q 0,0 0.075,0 L 0.925,0 Q 1,0 1,0.06 L 1,0.83 Q 1,0.86 0.96,0.86 L 0.64,0.86 Q 0.60,0.86 0.60,0.90 L 0.60,0.95 Q 0.60,1 0.56,1 L 0.075,1 Q 0,1 0,0.94 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Outer Card Body clipped by SVG with Custom Bottom-Right Cutout */}
      <div className="card2-custom-shape bg-white dark:bg-[#18181b]">
        {/* Top Inset Image Area with Rounded Corners */}
        <div className="top-image-container bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
          <img
            src={getBannerUrl(event?.eventBanner)}
            alt={event?.eventName || "Event"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-center p-1.5 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
            onError={(e) => {
              const fileId = extractFileId(event?.eventBanner);
              if (fileId && !e.target.src.includes("thumbnail")) {
                e.target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
              }
            }}
          />
        </div>

        {/* Content Body Area containing all existing event data */}
        <div className="flex-1 flex flex-col justify-between pt-2 px-1">
          {/* Header Info */}
          <div>
            {/* Status & Date */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>{eventDateString}</span>
              <span>•</span>
              <span className="text-[#ca0019] font-semibold">{eventStatusText}</span>
            </div>

            {/* Title */}
            <h3 className="text-[17px] font-bold text-slate-900 dark:text-white truncate mt-1">
              {event?.eventName || "Event"}
            </h3>

            {/* Subtle Divider Line */}
            <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1.5"></div>

            {/* Collapsible Middle Details */}
            <div className="collapsible-details">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 truncate">
                <LocationOnOutlinedIcon
                  sx={{ fontSize: 15 }}
                  className="text-slate-500 flex-shrink-0"
                />
                <span className="truncate">{event?.eventVenue || "Venue TBA"}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <ScheduleOutlinedIcon
                  sx={{ fontSize: 14 }}
                  className="text-slate-500 flex-shrink-0"
                />
                <span>{event?.eventTime || "Time TBA"}</span>
              </div>

              <div className="flex gap-2 mt-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                  {event?.eventType || "Event"}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                  {eventStatusText}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Row (Logo on bottom-left tab) */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 mt-auto pb-1">
            <img
              src={logo}
              className="h-6 w-auto max-w-[120px] object-contain object-left pointer-events-none"
              alt="TU Logo"
            />
          </div>
        </div>
      </div>

      {/* "Know More" Button positioned directly in the bottom-right cutout socket with clean clearance */}
      <button
        onClick={handleKnowMoreClick}
        className="know-more-button absolute bottom-1.5 right-1.5 bg-[#ca0019] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full shadow-[0_6px_16px_rgba(202,0,25,0.4)] hover:shadow-[0_8px_22px_rgba(202,0,25,0.55)] transition-all duration-200 z-30 flex items-center gap-1.5"
      >
        <span>Know More</span>
        <span className="text-sm font-bold leading-none">→</span>
      </button>

      {/* SVG Outline Stroke following the exact custom clipped silhouette */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,6 Q 0,0 7.5,0 L 92.5,0 Q 100,0 100,6 L 100,83 Q 100,86 96,86 L 64,86 Q 60,86 60,90 L 60,95 Q 60,100 56,100 L 7.5,100 Q 0,100 0,94 Z"
          fill="none"
          stroke="#ea384c"
          strokeOpacity="0.7"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default CommunityCard;
