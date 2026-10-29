/**
 * @file index.jsx
 * @description Page view orchestrating the historical origin and evolution journey of The Uniques ("How It Started"), combining timeline milestones and flight progression cards.
 * @architecture Mounted on route `/how-it-started` under LandingLayout (`src/layout/Landing/index.jsx`). Lazily loads `TimeLine`, `Flight`, and `CallToAction` within viewport-based suspense boundaries.
 * @agent_note Ensures fast initial rendering by lazy loading the comprehensive photo timeline (`TimeLine`) and GSAP-animated `Flight` path sections with dedicated fallback skeletons.
 */

import { Suspense } from 'react';
import CelebrationComponent from "@/utils/Header";
import LazyViewport from "@/components/LazyViewport";
import SectionSkeleton from "@/components/SectionSkeleton";
import lazyWithRetry from "@/utils/lazyWithRetry";

const TimeLine = lazyWithRetry(() => import("@/views/Landing/HowItStarted/components/TimeLine"));
const Flight = lazyWithRetry(() => import("./components/Flight"));
const CallToAction = lazyWithRetry(() => import("../homComponents/CallToAction"));

/**
 * @component HowItStartedPage
 * @description Root layout container for the historical retrospective page of The Uniques Community.
 * @returns {JSX.Element} The rendered historical chronicle page.
 * @state None.
 * @api None.
 */
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
