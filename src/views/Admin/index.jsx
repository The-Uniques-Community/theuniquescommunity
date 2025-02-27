import React from "react";
import { NewMember } from "./dashboardComponents/NewMember";
import StatCard from "./dashboardComponents/StatCard";
import { Groups2 } from "@mui/icons-material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Calender from "./dashboardComponents/Calender";
import Banner from "./dashboardComponents/Banner";
const index = () => {
  const pendingUser = {
    fullName: "Ralph Edwards",
    admno: "2021BTCS001",
    email: "ralph@example.com",
    batch: "The Uniques 2.0",
    contact: "9876543210",
    whatsappContact: "9876543210",
    address: "123 Street",
    city: "New York",
    state: "NY",
    bio: "Passionate about tech and development.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet nam vitae, facere maxime repudiandae dicta veniam similique quae culpa quidem.",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    leaveType: "Sick Leave",
  };
  return (
    <div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 lg:px-5 md:px-3 px-1 py-5 mb-5">
        <div className="col-span-4">
          {/* <div className="h-1/2 mb-4 flex items-center p-5 rounded-lg bg-[#ca0019] relative">
            <img
              src="https://png.pngtree.com/thumb_back/fh260/background/20210812/pngtree-business-technology-modern-abstract-art-white-dots-perspective-background-image_760034.jpg"
              className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover opacity-30"
              alt=""
            />
            <h2 className="text-white absolute z-10  text-start font-bold lg:text-7xl h-max my-auto">
              DASHBOARD
            </h2>
          </div> */}
          <Banner/>
          <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            <StatCard
              icon={<Groups2 fontSize="large" />}
              title="Total Members"
              value={55}
              link="/admin/members-overview"
            />
            <StatCard
              icon={<CurrencyRupeeIcon fontSize="large" />}
              title="Total Fine"
              value={5500}
              link="/admin/accounts"
            />
            <StatCard
              icon={<EventAvailableIcon fontSize="large" />}
              title="Total Events"
              value={6}
              link="/admin/events-overview"
            />
            <StatCard
              icon={<LocationCityIcon fontSize="large" />}
              title="Total Campus"
              value={1}
            />
          </div>
        </div>

        <div>
          <Calender />
        </div>
      </div>
      <div className="lg:px-5 md:px-3 px-1 py-5 mb-5">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">Newly Added Members</h2>
        <div className="flex flex-wrap items-center justify-start gap-3">
          <NewMember user={pendingUser} />
          <NewMember user={pendingUser} />
          <NewMember user={pendingUser} />
          
        </div>
      </div>
    </div>
  );
};

export default index;
