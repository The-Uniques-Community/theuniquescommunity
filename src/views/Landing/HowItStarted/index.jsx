import { lazy, Suspense } from 'react';
import CelebrationComponent from "@/utils/Header";
import LazyViewport from "@/components/LazyViewport";
import SectionSkeleton from "@/components/SectionSkeleton";

const TimeLine = lazy(() => import("@/views/Landing/HowItStarted/components/TimeLine"));
const Flight = lazy(() => import("./components/Flight"));
const CallToAction = lazy(() => import("../homComponents/CallToAction"));

const HowItStartedPage = () => {
    return (
        <div>
            <CelebrationComponent title="Uniques’ Odyssey → Idea to Impact ✦" />

            <LazyViewport minHeight="600px">
                <Suspense fallback={<SectionSkeleton height="600px" />}>
                    <TimeLine />
                </Suspense>
            </LazyViewport>

            <LazyViewport minHeight="450px">
                <Suspense fallback={<SectionSkeleton height="450px" />}>
                    <Flight />
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

export default HowItStartedPage;
