import { lazy, Suspense } from "react";
import HomeHero from "./homComponents/HomeHero";
import LazyViewport from "@/components/LazyViewport";
import SectionSkeleton from "@/components/SectionSkeleton";

// Lazy-load all below-the-fold landing page sections
const Counts = lazy(() => import("./homComponents/Counts"));
const AboutSection = lazy(() => import("./homComponents/AboutSection"));
const WhyUs = lazy(() => import("./homComponents/WhyUs"));
const CommunityPartners = lazy(() => import("./homComponents/CommunityPartners"));
const Startups = lazy(() => import("./homComponents/Startups"));
const Gallery = lazy(() => import("./homComponents/Gallery"));
const Event = lazy(() => import("./homComponents/Event"));
const YoutubeSection = lazy(() => import("./homComponents/YoutubeSection"));
const Testimonials = lazy(() => import("./homComponents/TestimonialCard"));
const CallToAction = lazy(() => import("./homComponents/CallToAction"));

const LandingPage = () => {
  return (
    <div>
      {/* 1. Above-the-fold Hero rendered immediately for optimal LCP */}
      <HomeHero />

      {/* 2. Key impact statistics */}
      <section>
        <LazyViewport minHeight="340px">
          <Suspense fallback={<SectionSkeleton height="340px" />}>
            <Counts />
          </Suspense>
        </LazyViewport>
      </section>

      {/* 3. About Section with GSAP scroll animations */}
      <section>
        <LazyViewport minHeight="650px">
          <Suspense fallback={<SectionSkeleton height="650px" />}>
            <AboutSection />
          </Suspense>
        </LazyViewport>
      </section>

      {/* 4. Why Us value proposition cards */}
      <section>
        <LazyViewport minHeight="550px">
          <Suspense fallback={<SectionSkeleton height="550px" />}>
            <WhyUs />
          </Suspense>
        </LazyViewport>
      </section>

      {/* 5. Community & corporate partners logo marquee */}
      <section>
        <LazyViewport minHeight="240px">
          <Suspense fallback={<SectionSkeleton height="240px" />}>
            <CommunityPartners />
          </Suspense>
        </LazyViewport>
      </section>

      {/* 6. Innovative Startups showcase */}
      <section>
        <LazyViewport minHeight="650px">
          <Suspense fallback={<SectionSkeleton height="650px" />}>
            <Startups />
          </Suspense>
        </LazyViewport>
      </section>

      {/* 7. Gallery with 2-row continuous photo tracks and lightbox */}
      <section>
        <LazyViewport minHeight="600px">
          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <Gallery />
          </Suspense>
        </LazyViewport>
      </section>

      {/* 8. Recent events and activities carousel */}
      <section>
        <LazyViewport minHeight="550px">
          <Suspense fallback={<SectionSkeleton height="550px" />}>
            <Event />
          </Suspense>
        </LazyViewport>
      </section>

      {/* 9. YouTube live moments and video channel */}
      <section>
        <LazyViewport minHeight="550px">
          <Suspense fallback={<SectionSkeleton height="550px" />}>
            <YoutubeSection />
          </Suspense>
        </LazyViewport>
      </section>

      {/* 10. Student and faculty testimonials */}
      <section>
        <LazyViewport minHeight="600px">
          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <Testimonials />
          </Suspense>
        </LazyViewport>
      </section>

      {/* 11. Bottom Call to Action banner */}
      <div className="pt-2 sm:pt-4 pb-8 sm:pb-12">
        <LazyViewport minHeight="240px">
          <Suspense fallback={<SectionSkeleton height="240px" />}>
            <CallToAction />
          </Suspense>
        </LazyViewport>
      </div>
    </div>
  );
};

export default LandingPage;
