import React from "react";
import Button from "../../utils/Buttons/Button";
import { useTheme } from "@mui/material/styles";
import MemberCard from "@/utils/Card/MemberCard";
const index = () => {
  const members = [
    {
      name: "John Doe",
      image: "https://via.placeholder.com/150",
      batch: "Uniques 1.0",
      batchColor: "blue-500",
      bio: "A passionate web developer and community contributor.",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe",
      detailsLink: "https://example.com/johndoe",
    },
    {
      name: "Jane Smith",
      image: "https://via.placeholder.com/150",
      batch: "Uniques 2.0",
      batchColor: "green-500",
      bio: "An enthusiastic designer and problem solver.",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      instagram: "https://instagram.com/janesmith",
      detailsLink: "https://example.com/janesmith",
    },
  ];
  

  
  const theme = useTheme();
  return (
    <div>
      <Button
        path="/lol"
        color={theme.palette.primary.light}
        bgColor={theme.palette.secondary.dark}
		iconColor={theme.palette.primary.light}
      >
        <span>Click Here</span>
      </Button>
      <br />
      <br />

      <a
        href="#_"
        class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
      >
        <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span class="relative">Button Text</span>
      </a>

      <div className="flex flex-wrap gap-8 justify-center">
        
          <MemberCard />
        
      </div>
    </div>
  );
};

export default index;
