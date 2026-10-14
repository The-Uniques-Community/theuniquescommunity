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

      <section>
        <AboutSection />
      </section>

      <section>
        <WhyUs />
      </section>

      <section>
        <CommunityPartners />
      </section>

      <section>
        <Startups />
      </section>

      <section>
        <Gallery />
      </section>

      <section>
        <Event />
      </section>

      <section>
        <YoutubeSection />
      </section>

      <section>
        <Testimonials />
      </section>

      <div className="pt-2 sm:pt-4 pb-8 sm:pb-12">
        <CallToAction />
      </div>
    </div>
  );
};

export default index;
