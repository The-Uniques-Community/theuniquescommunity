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
      {/* Header with event-specific title and subtitle */}
      <Header title={title} subtitle={subtitle} chipLabel={chipLabel}/>

      {/* CommunityCard Click Triggers Popup */}
      <div onClick={() => setShowEvent(true)} className="cursor-pointer">
        <CommunityCard event={events[0]}/>
      </div>

      {/* CallToAction below CommunityCard */}
      <CallToAction />

      {/* Full-Screen Popup Modal */}
      {showEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full h-full p-5 relative">
            <Event onClose={() => setShowEvent(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
