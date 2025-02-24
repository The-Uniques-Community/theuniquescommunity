import React from 'react'
import Header from "./componants/Header"
import Second from "./componants/Second"
import Third from "./componants/Third"
import Fourth from "./componants/Fourth"
import Fifth from "./componants/Fifth"
import Mentor from "./componants/Mentor"
import TrainingTabs from './componants/TraningModel'
import VisionMission from './componants/Vision'
import Last from "./componants/Last"


const index = () => {
  return (
<div>
<Header/>
<Second/>
{/* <Third/> */}
<Fourth/>
<Fifth/>
<TrainingTabs/>
<Mentor/>
<VisionMission/>
<Last/>


</div>
  )
}

export default index