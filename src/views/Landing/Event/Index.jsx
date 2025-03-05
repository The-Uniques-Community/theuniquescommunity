import React, { useState } from 'react';
import Event from './Componant/Event';
import CommunityCard from '@/utils/Card/CommunityCard';

const Index = () => {
  const [showEvent, setShowEvent] = useState(false);

  return (
    <>
      {/* CommunityCard Click Triggers Popup */}
      <div onClick={() => setShowEvent(true)} className="cursor-pointer">
        <CommunityCard />
      </div>

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
