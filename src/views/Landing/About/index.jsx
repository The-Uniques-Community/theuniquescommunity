import { lazy, Suspense } from "react";
import CelebrationComponent from "@/utils/Header";
import Second from "./componants/Batches";
import LazyViewport from "@/components/LazyViewport";
import SectionSkeleton from "@/components/SectionSkeleton";

// Below-the-fold sub-sections lazy-loaded to optimize initial About page load
const Fifth = lazy(() => import("./componants/Fifth"));
const TrainingTabs = lazy(() => import("./componants/TraningModel"));
const VisionMission = lazy(() => import("./componants/Vision"));
const Mentor = lazy(() => import("./componants/Mentor"));
const Infrastructure = lazy(() => import("./componants/Infrastructure"));
const Placements = lazy(() => import("../homComponents/Placements"));
const Testimonial = lazy(() => import("./componants/Testimonial"));
const Faq = lazy(() => import("./componants/Faq"));
const CallToAction = lazy(() => import("../homComponents/CallToAction"));

const AboutPage = () => {
  return (
    <div>
      <CelebrationComponent title="Empowering Innovators → Our Story ✦" />
      <Second />

      <LazyViewport minHeight="450px">
        <Suspense fallback={<SectionSkeleton height="450px" />}>
          <Fifth />
        </Suspense>
      </LazyViewport>

      <LazyViewport minHeight="500px">
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <TrainingTabs />
        </Suspense>
      </LazyViewport>

      <LazyViewport minHeight="450px">
        <Suspense fallback={<SectionSkeleton height="450px" />}>
          <VisionMission />
        </Suspense>
      </LazyViewport>

      <LazyViewport minHeight="450px">
        <Suspense fallback={<SectionSkeleton height="450px" />}>
          <Mentor />
        </Suspense>
      </LazyViewport>

      <LazyViewport minHeight="450px">
        <Suspense fallback={<SectionSkeleton height="450px" />}>
          <Infrastructure />
        </Suspense>
      </LazyViewport>

      <LazyViewport minHeight="300px">
        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <Placements />
        </Suspense>
      </LazyViewport>

      <LazyViewport minHeight="450px">
        <Suspense fallback={<SectionSkeleton height="450px" />}>
          <Testimonial />
        </Suspense>
      </LazyViewport>

      <LazyViewport minHeight="400px">
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <Faq />
        </Suspense>
      </LazyViewport>

      <LazyViewport minHeight="240px">
        <Suspense fallback={<SectionSkeleton height="240px" />}>
          <CallToAction />
        </Suspense>
      </LazyViewport>
    </div>
  );
};

export default AboutPage;
