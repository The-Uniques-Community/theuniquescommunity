import React from "react";
import { Facebook, LinkedIn, Twitter, Brush } from "@mui/icons-material";

const teamMembers = [
  {
    picture: "https://cdn.easyfrontend.com/pictures/users/user28.jpg",
    fullName: "Akshay Kumar",
    designation: "Founder / CEO",
    bio: "Subscribe Easy Tutorials Youtube Channel watch more videos",
    socialLinks: [
      { icon: <Facebook />, href: "#" },
      { icon: <LinkedIn />, href: "#" },
      { icon: <Twitter />, href: "#" },
      { icon: <Brush />, href: "#" },
    ],
  },
  {
    picture: "https://cdn.easyfrontend.com/pictures/users/user8.jpg",
    fullName: "Raima Ray",
    designation: "Business Head",
    bio: "Subscribe Easy Tutorials Youtube Channel watch more videos",
    socialLinks: [
      { icon: <Facebook />, href: "#" },

      { icon: <LinkedIn />, href: "#" },
      { icon: <Twitter />, href: "#" },
      { icon: <Brush />, href: "#" },
    ],
  },
  {
    picture: "https://cdn.easyfrontend.com/pictures/users/user28.jpg",
    fullName: "Akshay Kumar",
    designation: "Founder / CEO",
    bio: "Subscribe Easy Tutorials Youtube Channel watch more videos",
    socialLinks: [
      { icon: <Facebook />, href: "#" },
      { icon: <LinkedIn />, href: "#" },
      { icon: <Twitter />, href: "#" },
      { icon: <Brush />, href: "#" },
    ],
  },
];

const TeamMemberItem = ({ member }) => (
  <div className="flex items-center space-x-4">
    <img
      src={member.picture}
      alt={member.fullName}
      className="w-24 h-24 rounded-full object-cover"
    />
    <div>
      <h4 className="text-xl font-semibold">{member.fullName}</h4>
      <h6 className="text-sm text-gray-500">{member.designation}</h6>
      <p className="text-sm text-gray-400">{member.bio}</p>
      <div className="flex space-x-3 mt-2">
        {member.socialLinks.map((item, i) => (
          <a href={item.href} key={i} className="text-gray-400 hover:text-gray-600">
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const Testimonial = () => {
  return (
    <section className="py-14 bg-white text-gray-900 ">
      <div className="w-[85%] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Experts Team</h2>
          <p className="text-gray-500">Meet our professional team members.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <TeamMemberItem member={member} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
