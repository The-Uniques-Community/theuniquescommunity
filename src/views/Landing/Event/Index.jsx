import React, { useState } from 'react';
import Event from './Componant/Event';
import CommunityCard from '@/utils/Card/CommunityCard';
import Header from "@/utils/Header/index";
import CallToAction from '../homComponents/CallToAction';
import { events } from '@/assets/dummyData/eventsData';

const Index = () => {
  const [showEvent, setShowEvent] = useState(false);

  // Updated title and subtitle for the Event Page
  const title = "Join the Biggest Event of the Year 🎉";
  const subtitle = "Don't miss out!";
  const chipLabel = "Exclusive Event"; 


  return (
  <>
 <CommunityCard/>
  </>
  )
}

export default Index