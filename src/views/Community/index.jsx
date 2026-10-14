import React from 'react'
import Hero from './Landing/Hero'
import SlideCard from './Landing/SlideCard'
import About from './Landing/About'
import Guidelines from './Landing/Guidlines'

import Eligiblity from './Landing/Eligiblity'
import CTA from "./Landing/CallToAction"

import Sliding from "./Landing/Sliding"
import SpotCard from './Landing/SpotCard'
import Flight from '../Landing/HowItStarted/components/Flight'
import CallToAction from '../Landing/homComponents/CallToAction'

const index = () => {
	return (
		<div>
			<Hero />
			<About />
			<Guidelines />
			<CTA />
			<SlideCard />
			<Sliding />
			<Eligiblity />
			<div className="w-full max-w-6xl mx-auto border-b border-gray-200 dark:border-neutral-800" />
			<CallToAction className="mt-2 sm:mt-4 md:mt-6" />
			{/* <Flight /> */}
		</div>
	)
}

export default index
