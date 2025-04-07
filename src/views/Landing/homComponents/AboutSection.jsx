import React from "react";
import { Groups, VolunteerActivism, Diversity3, Handshake } from "@mui/icons-material";
import Orbit from "@/utils/Orbit/Orbit";

const features = [
  {
    icon: <Groups fontSize="large" style={{ color: "white" }} />,
    title: "Community Engagement",
    description: "Bringing people together through events, discussions, and support.",
  },
  {
    icon: <VolunteerActivism fontSize="large" style={{ color: "white" }} />,
    title: "Volunteer Programs",
    description: "Join hands to make a difference with impactful volunteer initiatives.",
  },
  {
    icon: <Diversity3 fontSize="large" style={{ color: "white" }} />,
    title: "Inclusive Environment",
    description: "Creating a welcoming space for everyone, regardless of background.",
  },
  {
    icon: <Handshake fontSize="large" style={{ color: "white" }} />,
    title: "Collaboration Opportunities",
    description: "Partner with others to drive meaningful change in the community.",
  }
  
];

const AboutSection = () => {
  return (
    <div className="bg-white text-gray-900 py-10 lg:px-8 px-8 lg:py-16">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 my-3 md:grid-cols-1 grid-cols-1 gap-6 lg:gap-20">
        {/* Left Section */}
        <div className="">
        <div className="flex flex-wrap items-center justify-between -mx-4">
            <Orbit/>
      </div>
      </div>
      <div className="lg:ps-8">
  <h4 className="text-sm uppercase text-gray-600 mb-2">About Our Community</h4>
  <h2 className="text-3xl lg:text-4xl font-bold mb-8">
    The <span className="text-red-800">Uniques</span> Community – Learn, Build, and Grow Together.
  </h2>
  <div className="text-gray-600 my-6">
    The Uniques Community is a community where everyone is welcome. We help students bridge the gap between theory and practice and grow their knowledge by providing a peer-to-peer learning environment, conducting workshops, organizing study jams, and building solutions for local businesses.
  </div>
  <div className="my-8">
    <h4 className="text-3xl lg:text-4xl font-bold my-8">Our Main Focus</h4>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-6">
    {features.map((feature, index) => (
      <div key={index} className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-red-800">{feature.icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* Right Section */}
        
      </div>
    </div>
  )
}



export default AboutSection;
