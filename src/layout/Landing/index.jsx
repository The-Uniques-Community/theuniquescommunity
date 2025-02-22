import { Outlet } from "react-router-dom";
import Navbar from "@/utils/NavBar/Navbar";
import Footer from "@/utils/Footer/Footer";

const LandingLayout = () => {
  return (
    <div>
      <Navbar />

      <div className="">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default LandingLayout;
