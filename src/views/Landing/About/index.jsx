import React from 'react'
import Header from "./componants/Header"
import Second from "./componants/Batches"
import Third from "./componants/Third"
import Fourth from "./componants/Fourth"
import Fifth from "./componants/Fifth"
import Mentor from "./componants/Mentor"
import TrainingTabs from './componants/TraningModel'
import VisionMission from './componants/Vision'
import Testimonial from "./componants/Testimonial"
import Faq from "./componants/Faq"



const index = () => {
  return (
<div>
<Header/>
<Second/>
{/* <Third/> */}
<Fourth/>
<Fifth/>
<TrainingTabs/>
<VisionMission/>
<Mentor/>
<Testimonial/>
<Faq/>



</div>
  )
}

export default index