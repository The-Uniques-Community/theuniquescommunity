import React from 'react'
import Hero from './Landing/Hero'
import SlideCard from './Landing/SlideCard'
import About from './Landing/About'
import Guidelines from './Landing/Guidlines'
import Sliding from "./Landing/Sliding"

const index = () => {
	return (
		<div>
			<Hero />
			<About />
			<Guidelines />
			<SlideCard />
			<Sliding/>
			<div className='p-10'></div>
		</div>
	)
}

export default index
