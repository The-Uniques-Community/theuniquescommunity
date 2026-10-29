/**
 * @file index.jsx
 * @description Master landing view for the Campus Ambassador and Community program. Orchestrates above-the-fold content (Hero, About) with viewport-deferred, lazy-loaded sections (Guidelines, CTA, SlideCard, Sliding, Eligibility, and Global CallToAction).
 * @architecture Mounted at `/community` route within the main application router. Child components are lazy loaded via `lazyWithRetry` and wrapped inside `LazyViewport` and `Suspense` with fallback `SectionSkeleton` components to optimize Core Web Vitals and initial page load speed.
 * @agent_note When modifying or reordering sections, ensure `LazyViewport` `minHeight` props accurately estimate rendered section heights to avoid layout shifts (CLS). Child subviews interact with the Campus Ambassador application endpoint (`/api/campus-ambassador/apply`).
 */

import { Suspense } from 'react';
import Hero from './Landing/Hero';
import About from './Landing/About';
import LazyViewport from '@/components/LazyViewport';
import SectionSkeleton from '@/components/SectionSkeleton';
import lazyWithRetry from '@/utils/lazyWithRetry';

const Guidelines = lazyWithRetry(() => import('./Landing/Guidlines'));
const CTA = lazyWithRetry(() => import("./Landing/CallToAction"));
const SlideCard = lazyWithRetry(() => import('./Landing/SlideCard'));
const Sliding = lazyWithRetry(() => import("./Landing/Sliding"));
const Eligiblity = lazyWithRetry(() => import('./Landing/Eligiblity'));
const CallToAction = lazyWithRetry(() => import('../Landing/homComponents/CallToAction'));

/**
 * @component CommunityLandingPage
 * @description Main container component assembling the Campus Ambassador recruitment and Community landing experience.
 * @returns {JSX.Element} The composite community landing page layout.
 * @state None - Pure layout composition container.
 * @api None directly; child components (e.g. CallToAction modal, Hero modal) interact with backend API services.
 */
const CommunityLandingPage = () => {
	return (
		<div>
			<Hero />
			<About />

			<LazyViewport minHeight="450px">
				<Suspense fallback={<SectionSkeleton height="450px" />}>
					<Guidelines />
				</Suspense>
			</LazyViewport>

			<LazyViewport minHeight="300px">
				<Suspense fallback={<SectionSkeleton height="300px" />}>
					<CTA />
				</Suspense>
			</LazyViewport>

			<LazyViewport minHeight="480px">
				<Suspense fallback={<SectionSkeleton height="480px" />}>
					<SlideCard />
				</Suspense>
			</LazyViewport>

			<LazyViewport minHeight="400px">
				<Suspense fallback={<SectionSkeleton height="400px" />}>
					<Sliding />
				</Suspense>
			</LazyViewport>

			<LazyViewport minHeight="400px">
				<Suspense fallback={<SectionSkeleton height="400px" />}>
					<Eligiblity />
				</Suspense>
			</LazyViewport>

			<div className="w-full max-w-6xl mx-auto border-b border-gray-200 dark:border-neutral-800" />

			<LazyViewport minHeight="240px">
				<Suspense fallback={<SectionSkeleton height="240px" />}>
					<CallToAction className="mt-2 sm:mt-4 md:mt-6" />
				</Suspense>
			</LazyViewport>
		</div>
	);
};

export default CommunityLandingPage;
