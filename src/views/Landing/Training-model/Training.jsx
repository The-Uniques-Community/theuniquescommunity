/**
 * @file Training.jsx
 * @description Main view orchestrator for the "Training Model" page, illustrating the multi-phase technical curriculum, peer mentorship culture, faculty trainer profiles, and operational timeline.
 * @architecture Mounted on route `/training-model` under LandingLayout (`src/layout/Landing/index.jsx`). Renders `Header`, `FourPhase`, `Trainingculture`, technical architecture infographics, `Trainers`, `TrainingTimeline`, and bottom `CallToAction`.
 * @agent_note Combines static four-phase curriculum breakdown with dynamic live trainer profiles fetched from the backend API inside child component `Trainers`.
 */

import React from 'react'
import Header from '@/utils/Header'
import FourPhase from './components/FourPhase'
import trainingMethod from '@/assets/img/trainingMethod.webp'
import Trainingculture from './components/Trainingculture'
import CallToAction from '../homComponents/CallToAction'
import TrainingTimeline from './components/TrainingTimeLine'
import Trainers from './components/Trainers'

/**
 * @component Training
 * @description Master view component structuring the 4-phase pedagogical curriculum, faculty mentors, and roadmap.
 * @returns {JSX.Element} The rendered training model layout.
 * @state None.
 * @api Delegated to child `Trainers` component (`GET /api/admin/trainers/all-trainers`).
 */
const Training = () => {
  return (
	<div>
		<Header 
		  title = "Training Model → The Uniques ✦"
		  subtitle = "Training in"
		  chipLabel = "4 Phases"
		  backgroundColor = "#f1f4f9"
		  highlightColor = "#ca0019"
		/>
		<div className='p-10 '></div>
		<FourPhase />
		<div className='p-10 '></div>
		<Trainingculture />
		<div className='container w-11/12 lg:w-9/12 mx-auto px-4 py-8'>
			<div className='bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-white/10 flex justify-center items-center'>
				<img 
					src={trainingMethod} 
					alt="Training Model - Professional Trainer to Uniques batches" 
					className='w-full h-auto object-contain max-w-5xl rounded-2xl'
				/>
			</div>
		</div>
		<div className='p-10 '></div>
		<Trainers />
		<div className='p-10 '></div>
		<TrainingTimeline />
		<div className='p-10 '></div>
		<CallToAction/>
	</div>
  )
}

export default Training
