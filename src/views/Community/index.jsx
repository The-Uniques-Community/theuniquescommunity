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
