import { Outlet } from "react-router-dom";
import Navbar from "@/utils/NavBar/Navbar";
import Footer from "@/utils/Footer/Footer";
// import ChatBot from "@/components/ChatBot";

const LandingLayout = () => {
  return (
    <div>
      <Navbar />

      <div className="">
        <Outlet />
      </div>
      <Footer/>
      {/* <ChatBot /> */}
    </div>
  );
};

export default LandingLayout;
