import { useState } from 'react';
import { Users, Calendar, Trophy, User, Hash, MessageSquare, Share2 } from 'lucide-react';
import Button from "@/utils/Buttons/Button";

export default function KotlinUserGroup() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { name: "About", key: "about" },
    { name: "Events", key: "events" },
    { name: "Hackathons", key: "hackathons" },
    { name: "Members", key: "members" },
    { name: "Channels", key: "channels" },
    { name: "Forums", key: "forums" }
  ];

  const events = {
    about: {
      title: "Who we are",
      content: "The Kotlin User Group (KUG) Gurugram is a vibrant community for Kotlin enthusiasts, fostering knowledge-sharing and collaboration on Kotlin-based development across Android, server-side, and multiplatform projects."
    },
    events: {
      title: "Upcoming Events",
      content: "UDAAN 2K25 - Saturday, Mar 22nd, 2025"
    },
    hackathons: {
      title: "Hackathons",
      content: "Stay tuned for upcoming Kotlin hackathons."
    },
    members: {
      title: "Members",
      content: "Meet the talented Kotlin developers in our community."
    },
    channels: {
      title: "Channels",
      content: "Engage with different discussion channels."
    },
    forums: {
      title: "Forums",
      content: "Join community discussions and Q&A sessions."
    }
  };

  return (
    <div className='container mx-auto'>
      <div className="bg-white text-black min-h-screen">
        {/* Header Banner */}
        <div className="w-full h-96 border-b border-gray-300"> 
          <img src="https://marketplace.canva.com/EAFluVdXLok/2/0/1600w/canva-blue-professional-webinar-facebook-event-cover-wp0XR0lqPgc.jpg" className='w-full h-full object-cover' />
        </div>
        
        {/* Profile Section */}
        <div className="px-6 py-4 flex justify-between items-start border-gray-300">
          <div className="flex">
            <img src="https://content.jdmagicbox.com/v2/comp/bhubaneshwar/v3/0674px674.x674.190323210154.e8v3/catalogue/event-square-ac-banquet-hall-jaydev-vihar-bhubaneshwar-ac-banquet-halls-jqazlem37r.jpg" className="rounded-lg border border-gray-400 w-28 h-28" />
            <div className="ml-6">
              <h1 className="text-3xl font-bold">Kotlin User Group</h1>
              <h2 className="text-xl text-gray-500">Gurugram</h2>
              <div className="flex items-center text-gray-500 mt-2">
                <Users className="w-5 h-5 mr-2" />
                <span>1671 Community Members</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button color={"white"} bgColor={"#ca0019"} border={4} borderColor={"#ca0019"} iconColor={"black"}>Share</Button>
            <Button color={"white"} bgColor={"#ca0019"} border={4} borderColor={"#ca0019"} iconColor={"black"}>+ Join</Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-gray-300 px-6 flex space-x-6 py-3 text-gray-600">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 ${activeTab === tab.key ? "text-[#ca0019] border-b-2 border-[#ca0019]" : "hover:text-black"}`}
            > 
              {tab.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6 p-6">
          {/* Upcoming Events */}
          <div className="col-span-2 border-b border-t border-gray-300 p-4">
            <h2 className="text-2xl font-bold mb-4">{events[activeTab].title}</h2>
            <p className="text-gray-600">{events[activeTab].content}</p>
          </div>

          {/* Community Leaders - Right Side */}
          <div className="border border-gray-300 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Community Leaders</h2>
            <div className="space-y-4">
              {["Shwetangi Tiwari", "Divyanshu Tiwari", "Kotlin User Group"].map((leader, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" className="rounded-full w-12 h-12 border border-gray-300" />
                    <div className="ml-3">
                      <h3 className="font-medium">{leader}</h3>
                      <p className="text-sm text-gray-500">@{leader.toLowerCase().replace(/ /g, "_")}</p>
                    </div>
                  </div>
                  <Button color={"white"} bgColor={"#ca0019"} border={4} borderColor={"#ca0019"} iconColor={"black"} className="text-blue-600 border border-blue-600 px-3 py-1">+ Follow</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
