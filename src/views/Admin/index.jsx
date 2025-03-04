import React from "react";
import { NewMember } from "./dashboardComponents/NewMember";
import StatCard from "./dashboardComponents/StatCard";
import { Groups2 } from "@mui/icons-material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Calender from "./dashboardComponents/Calender";
import Banner from "./dashboardComponents/Banner";
import EventOverView from "./dashboardComponents/EventOverView";
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
    <div className="w-full">
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 lg:px-5 md:px-3 px-1 py-5 mb-5">
        <div className="col-span-4">
          <Banner />
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

          <div className=" px-1 py-5 my-5">
            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              Newly Added Members
            </h2>
            <div className="flex flex-wrap items-center justify-start gap-3">
              <NewMember user={pendingUser} />
              <NewMember user={pendingUser} />
              <NewMember user={pendingUser} />
            </div>
          </div>
        </div>

        <div>
          <Calender />
          {
            
          }
          <EventOverView eventStatus={"upcoming"}/>
          <EventOverView eventStatus={"completed"}/>
          <EventOverView eventStatus={"upcoming"}/>
        </div>
      </div>
    </div>
  );
};

export default index;
