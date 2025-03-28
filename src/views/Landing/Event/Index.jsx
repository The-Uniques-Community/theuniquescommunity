import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Event from './Componant/Event';
import CommunityCard from '@/utils/Card/CommunityCard';
import Header from '@/utils/Header/index';
import CallToAction from '../homComponents/CallToAction';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EventForm from '@/utils/event/EventForm';

const Index = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEvent, setShowEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [eventTypes, setEventTypes] = useState([]);
  const [years, setYears] = useState([]);
  
  // State variables for categorized events
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://theuniquesbackend.vercel.app/api/events');
        
        if (response.data && Array.isArray(response.data.events)) {
          const eventsData = response.data.events;
          setEvents(eventsData);
          setFilteredEvents(eventsData);

          // Extract unique event types from eventType field
          const types = [...new Set(eventsData
            .filter(event => event.eventType)
            .map(event => event.eventType))];
          console.log('Available event types:', types);
          setEventTypes(types);
          
          // Extract unique years from eventDate field
          const uniqueYears = [...new Set(eventsData
            .filter(event => event.eventDate)
            .map(event => {
              try {
                return new Date(event.eventDate).getFullYear();
              } catch(e) {
                console.warn('Invalid date:', event.eventDate);
                return null;
              }
            })
            .filter(Boolean))];
            
          setYears(uniqueYears.sort((a, b) => b - a));
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

  useEffect(() => {
    let filtered = events;
    
    if (searchTerm.trim()) {
      filtered = filtered.filter(event => {
        return event.eventName && 
          event.eventName.toLowerCase().includes(searchTerm.trim().toLowerCase());
      });
    }
  
    if (eventType) {
      filtered = filtered.filter(event => {
        return event.eventType === eventType;
      });
    }

    if (month) {
      filtered = filtered.filter(event => {
        try {
          if (!event.eventDate) return false;
          
          const eventDate = new Date(event.eventDate);
          if (isNaN(eventDate.getTime())) return false;
          
          const eventMonth = eventDate.getMonth() + 1; // JavaScript months are 0-indexed
          return eventMonth === parseInt(month);
        } catch (e) {
          return false;
        }
      });
    }

    if (year) {
      filtered = filtered.filter(event => {
        try {
          if (!event.eventDate) return false;
          
          const eventDate = new Date(event.eventDate);
          if (isNaN(eventDate.getTime())) return false;
          
          return eventDate.getFullYear() === parseInt(year);
        } catch (e) {
          return false;
        }
      });
    }

    setFilteredEvents(filtered);
  }, [searchTerm, eventType, month, year, events]);

  // Categorize events based on date and status
  useEffect(() => {
    const currentDate = new Date();
    const ongoing = [];
    const upcoming = [];
    const completed = [];
    
    filteredEvents.forEach(event => {
      try {
        // First check if the event has an explicit status
        if (event.eventStatus) {
          const status = event.eventStatus.toLowerCase();
          
          if (status === 'ongoing') {
            ongoing.push(event);
            return;
          } else if (status === 'upcoming') {
            upcoming.push(event);
            return;
          } else if (status === 'completed' || status === 'cancelled') {
            completed.push(event);
            return;
          }
        }
        
        // If no explicit status or it's not recognized, use date logic
        if (!event.eventDate) {
          // If no date is provided, consider it as completed
          completed.push(event);
          return;
        }
        
        const eventDate = new Date(event.eventDate);
        if (isNaN(eventDate.getTime())) {
          // If the date is invalid, consider it as completed
          completed.push(event);
          return;
        }
        
        // Calculate event end date (assuming events last for one day if not specified)
        const eventEndDate = event.eventEndDate ? new Date(event.eventEndDate) : 
                            new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);
        
        // Set to end of day
        eventEndDate.setHours(23, 59, 59, 999);
        
        // For date comparison, use only the date part
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const eventDateOnly = new Date(eventDate);
        eventDateOnly.setHours(0, 0, 0, 0);
        
        if (today >= eventDateOnly && today <= eventEndDate) {
          ongoing.push(event);
        } else if (today < eventDateOnly) {
          upcoming.push(event);
        } else {
          completed.push(event);
        }
      } catch (e) {
        // Default to completed if there's any error in processing
        completed.push(event);
      }
    });
    
    // Sort events by date within each category
    const sortByDate = (a, b) => {
      try {
        if (!a.eventDate) return 1;
        if (!b.eventDate) return -1;
        
        return new Date(a.eventDate) - new Date(b.eventDate);
      } catch (e) {
        return 0;
      }
    };
    
    ongoing.sort(sortByDate);
    upcoming.sort(sortByDate);
    completed.sort((a, b) => sortByDate(b, a)); // Reverse for completed (newest first)
    
    setOngoingEvents(ongoing);
    setUpcomingEvents(upcoming);
    setCompletedEvents(completed);
  }, [filteredEvents]);

  return (
    <>
      <Header title="Join the Biggest Event of the Year 🎉" subtitle="Don't miss out!" chipLabel="Exclusive Event" />
      
      <div className="flex flex-wrap justify-center gap-4 p-5">
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
          <InputLabel>Event Type</InputLabel>
          <Select 
            value={eventType} 
            onChange={(e) => {
              setEventType(e.target.value);
            }} 
            label="Event Type"
          >
            <MenuItem value="">All</MenuItem>
            {eventTypes.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month">
            <MenuItem value="">All</MenuItem>
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year">
            <MenuItem value="">All</MenuItem>
            {years.map(y => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      
      {loading && <div className="text-center py-12">Loading...</div>}
      {error && !loading && <div className="text-center text-red-500">{error}</div>}
      
      {!loading && !error && (
        <div className="max-w-6xl mx-auto px-5">
          {/* Ongoing Events Section - Only show if there are events */}
          {ongoingEvents.length > 0 && (
            <div className="my-10">
              <div className="flex mb-2 md:mb-5 items-center">
                <span className="border-l-4 border-[#e03232] h-6 mr-3"></span>
                <h1 className="text-lg font-bold">Ongoing Events</h1>
              </div> 
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {ongoingEvents.map(event => (
                  <div key={event._id} onClick={() => { setSelectedEvent(event); setShowEvent(true); }} className="cursor-pointer">
                    <CommunityCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events Section - Only show if there are events */}
          {upcomingEvents.length > 0 && (
            <div className="my-10">
              <div className="flex mb-2 md:mb-5 items-center">
                <span className="border-l-4 border-orange-500 h-6 mr-3"></span>
                <h1 className="text-lg font-bold">Upcoming Events</h1>
              </div> 
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(event => (
                  <div key={event._id} onClick={() => { setSelectedEvent(event); setShowEvent(true); }} className="cursor-pointer">
                    <CommunityCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Events Section - Always show if there are events */}
          {completedEvents.length > 0 && (
            <div className="my-10">
              <div className="flex mb-2 md:mb-5 items-center">
                <span className="border-l-4 border-green-600 h-6 mr-3"></span>
                <h1 className="text-lg font-bold">Completed Events</h1>
              </div>  
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {completedEvents.map(event => (
                  <div key={event._id} onClick={() => { setSelectedEvent(event); setShowEvent(true); }} className="cursor-pointer">
                    <CommunityCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show message when no events match the filters */}
          {ongoingEvents.length === 0 && upcomingEvents.length === 0 && completedEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">No events match your search criteria.</div>
          )}
        </div>
      )}
      
      
      <CallToAction />
      
      {showEvent && selectedEvent && <Event event={selectedEvent} onClose={() => setShowEvent(false)} />}
    </>
  );
};

export default Index;