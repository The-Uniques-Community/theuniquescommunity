import React from 'react'
import Header from "@/views/Landing/HowItStarted/components/Header"
import TimeLine from "@/views/Landing/HowItStarted/components/TimeLine"
import CallToAction from '../homComponents/CallToAction'

const index = () => {
    return (
        <div>
            <Header />
            <TimeLine />
            <CallToAction />
        </div>
    )
}

export default index