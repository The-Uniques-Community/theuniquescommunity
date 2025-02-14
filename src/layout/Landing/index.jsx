import { Outlet } from "react-router-dom";
import Navbar from "@/utils/NavBar/Navbar";
import Footer from "@/utils/Footer/Footer";

const LandingLayout = () => {
  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Main content (switches based on the route) */}
      <main className="">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default LandingLayout;
