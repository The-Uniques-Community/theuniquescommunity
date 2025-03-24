import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Event from './Componant/Event';
import CommunityCard from '@/utils/Card/CommunityCard';
import Header from "@/utils/Header/index";
import CallToAction from '../homComponents/CallToAction';

const Index = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEvent, setShowEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Updated title and subtitle for the Event Page
  const title = "Join the Biggest Event of the Year 🎉";
  const subtitle = "Don't miss out!";
  const chipLabel = "Exclusive Event"; 

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/events');
        
        console.log("API Response:", response.data);
        
        // Handle different response formats
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else if (response.data && Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          console.error("Invalid response format:", response.data);
          setError("Received unexpected data format from server");
          setEvents([]); // Set to empty array as fallback
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events");
        setEvents([]); // Set to empty array as fallback
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  

  return (
    <>
      {/* Header with event-specific title and subtitle */}
      <Header title={title} subtitle={subtitle} chipLabel={chipLabel}/>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center text-red-500 p-6">
          <p className="text-xl">{error}</p>
          <p className="mt-2">Please try again later or contact support.</p>
        </div>
      )}

      {/* Display All Community Cards */}
      {!loading && !error && Array.isArray(events) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
          {events.length > 0 ? (
            events.map((event) => (
              <div 
                key={event._id || `event-${Math.random()}`} 
                onClick={() => {
                  setSelectedEvent(event);
                  setShowEvent(true);
                }} 
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                <CommunityCard event={event}/>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No events found. Check back soon for upcoming events!
            </div>
          )}
        </div>
      )}

      {/* CallToAction below CommunityCard */}
      <CallToAction />

      {/* Full-Screen Popup Modal */}
      {showEvent && selectedEvent && (
        <Event event={selectedEvent} onClose={() => setShowEvent(false)} />
      )}
    </>
  );
};

export default Index;