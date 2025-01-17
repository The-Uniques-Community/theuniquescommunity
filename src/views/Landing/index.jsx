import React from "react";
import Button from "../../utils/Buttons/Button";
import { useTheme } from "@mui/material/styles";
import MemberCard from "@/utils/Card/MemberCard";
import Footer from "@/utils/Footer/Footer";
import Navbar from "@/utils/NavBar/Navbar";
import myPic from '../../assets/img/myphoto.jpg'
import Container from "@/utils/Container/Container";
const index = () => {
  
  
  

  
  const theme = useTheme();
  return (
    <div>
      <Navbar/>
      <Container bgColor={theme.palette.primary.dark} color={theme.palette.primary.contrastText} className="text-center">
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
          <MemberCard profileImg={myPic} batch="The Uniques 2.0" fullName={"Kumar Sujal"} position={"Full Stack Developer"} linkedin={"."} instagram={"."} twitter={"."}  />
      </div>
      <Footer/>
    </div>
  );
};

export default index;
