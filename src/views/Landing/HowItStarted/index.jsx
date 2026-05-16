import React from 'react'
import CelebrationComponent from "@/utils/Header";
import TimeLine from "@/views/Landing/HowItStarted/components/TimeLine"
import CallToAction from '../homComponents/CallToAction'
import Flight from './components/Flight'

const index = () => {
    return (
        <div>
            <CelebrationComponent title="Uniques’ Odyssey → Idea to Impact ✦" />
            <TimeLine />
            <Flight />
            <CallToAction />
        </div>
    )
}

export default index
