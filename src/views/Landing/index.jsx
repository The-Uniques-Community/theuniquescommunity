import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import CallToAction from "./homComponents/CallToAction";

import AboutSection from "./homComponents/AboutSection";
import TrainingTabs from "./homComponents/TrainingTabs";

// import ShapedCard from "@/utils/Card/ShapedCard";

import Gallery from "./homComponents/Gallery";
import Counts from "./homComponents/Counts";

import Startups from "./homComponents/Startups";
import WhyUs from "./homComponents/WhyUs";
// import TestimonialSectionCarousel from "./homComponents/TestimonialCard";
import Batches from "./homComponents/Batches";
import CommunityPartners from "./homComponents/CommunityPartners";


import HomeHero from "./homComponents/HomeHero";
import BlogSection from "./homComponents/BlogSection";
import Event from "./homComponents/Event";
import YoutubeSection from "./homComponents/YoutubeSection";
// import Testimonial from "./homComponents/TestimonialCard";
import Testimonials from "./homComponents/TestimonialCard";

const index = () => {
  const theme = useTheme();
  const [selectedBlog, setSelectedBlog] = useState(null);
  return (
    <div>
      {/* <Navbar /> */}
      <HomeHero />
      <section>
        {/* <LandingStats /> */}
        <Counts />
      </section>

      <div className="spacer py-10"></div>
      <section>
        <AboutSection />
      </section>

      <div className="spacer py-10"></div>
      <section>
        <WhyUs />
      </section>

      <div className="spacer py-10"></div>
      <section>
        <CommunityPartners />
      </section>






      <div className="spacer py-10"></div>
      <section>
        <Startups />
      </section>

      <div className="spacer py-10"></div>
      <section>
        <Gallery />
      </section>

      <div className="spacer py-10"></div>
      <section>
        <Event />
      </section>

      <div className="spacer py-10"></div>
      <section>
        <YoutubeSection />
      </section>

      <div className="spacer py-10"></div>
      <section>
        <Testimonials />
      </section>

      <div className="spacer py-10"></div>
      <div className="my-6">
        <CallToAction />
      </div>
    </div>
  );
};

export default index;
