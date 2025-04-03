import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CommunityCard from '@/utils/Card/CommunityCard';
import { ArrowRight } from 'lucide-react';

const Event = () => {
  const [completedEvents, setCompletedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://theuniquesbackend.vercel.app/api/events');
        
        if (response.data && Array.isArray(response.data.events)) {
          const eventsData = response.data.events;
          
          // Filter and sort completed events
          const completed = eventsData
            .filter(event => {
              // First check if there's an explicit "completed" status
              if (event.eventStatus && event.eventStatus.toLowerCase() === 'completed') {
                return true;
              }
              
              // Otherwise use date logic
              if (!event.eventDate) return false;
              
              try {
                const eventDate = new Date(event.eventDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                // Consider it completed if the event date is before today
                return eventDate < today;
              } catch (e) {
                return false;
              }
            })
            .sort((a, b) => {
              // Sort by date, most recent first
              try {
                if (!a.eventDate) return 1;
                if (!b.eventDate) return -1;
                return new Date(b.eventDate) - new Date(a.eventDate);
              } catch (e) {
                return 0;
              }
            })
            .slice(0, 3); // Take only the top 3 most recent completed events
          
          setCompletedEvents(completed);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error || !completedEvents.length) {
    return null; // Don't show anything if there's an error or no events
  }

  return (
    <section className="py-16 px-4 bg-tansparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex justify-between items-center">
        <div className="md:w-1/2 flex flex-col justify-center">
  <div className="flex mb-2 md:mb-5 items-center">
    <span className="border-l-2 border-[#e03232] h-6 mr-3"></span>
    <h1 className="text-lg font-bold">OUR EVENTS</h1>
  </div>
  <h1 className="text-lg md:text-3xl font-semibold mb-8">
    Experience the <span className="text-[#ca2c2c] text-4xl md:text-7xl md:py-3 block">excitement</span>
  </h1>
  
</div>
  
          <Link 
            to="/events" 
            className="inline-flex items-center px-5 py-2 bg-[#e03232] hover:bg-[#c52020] text-white font-medium rounded-lg transition-all duration-300"
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedEvents.map(event => (
            <div key={event._id} className="transform transition duration-300 hover:-translate-y-2">
              <CommunityCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Event;