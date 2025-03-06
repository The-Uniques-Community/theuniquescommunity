
import React from 'react'
import Event from "./Componant/Event"
import CommunityCard from '@/utils/Card/CommunityCard'
import { events } from '@/assets/dummyData/eventsData'
const Index = () => {
  return (
  <>
 <CommunityCard event={events[0]} />
  </>
  )
}

export default Index