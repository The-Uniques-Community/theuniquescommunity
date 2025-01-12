import React from "react";
import Button from "../../utils/Buttons/Button";
import { useTheme } from "@mui/material/styles";
import MemberCard from "@/utils/Card/MemberCard";
import Footer from "@/utils/Footer/Footer";
import Navbar from "@/utils/NavBar/Navbar";
import Container from "@/utils/Container/Container";
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
      <Navbar/>
      <Container>
        lol
      </Container>
      <Button
        path="/lol"
        color={theme.palette.primary.light}
        bgColor={theme.palette.primary.main}
        border={4}
        borderColor={theme.palette.primary.dark}
		iconColor={"black"}
      >
        <span>Click Here</span>
      </Button>
      

      <div className="flex flex-wrap gap-8 justify-center">
          <MemberCard />
      </div>
      <Footer/>
    </div>
  );
};

export default index;
