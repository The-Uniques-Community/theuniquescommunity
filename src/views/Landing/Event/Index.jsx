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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/events');
        
        if (response.data && Array.isArray(response.data.events)) {
          const eventsData = response.data.events;
          setEvents(eventsData);
          setFilteredEvents(eventsData);

          // Log the first event to understand structure
          if (eventsData.length > 0) {
            console.log('Sample event structure:', eventsData[0]);
          }

          // Extract unique event types from eventType field
          const types = [...new Set(eventsData
            .filter(event => event.eventType) // Only include events with eventType
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
            .filter(Boolean))]; // Remove null values
            
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
    
    console.log('Filtering with:', { searchTerm, eventType, month, year });
    console.log('Initial events count:', events.length);
  
    if (searchTerm.trim()) {
      filtered = filtered.filter(event => {
        // Try multiple potential property names that might contain the event title
        // Based on your schema, eventName is the correct field
        return event.eventName && 
          event.eventName.toLowerCase().includes(searchTerm.trim().toLowerCase());
      });
      console.log('After name filter:', filtered.length);
    }
  
    if (eventType) {
      filtered = filtered.filter(event => {
        console.log(`Comparing event type: "${event.eventType}" with selected: "${eventType}"`);
        return event.eventType === eventType;
      });
      console.log('After type filter:', filtered.length);
    }

    if (month) {
      filtered = filtered.filter(event => {
        try {
          if (!event.eventDate) return false;
          
          const eventDate = new Date(event.eventDate);
          if (isNaN(eventDate.getTime())) return false;
          
          const eventMonth = eventDate.getMonth() + 1; // JavaScript months are 0-indexed
          console.log(`Event date: ${event.eventDate}, parsed month: ${eventMonth}, filter month: ${month}`);
          return eventMonth === parseInt(month);
        } catch (e) {
          console.error('Error parsing date:', e);
          return false;
        }
      });
      console.log('After month filter:', filtered.length);
    }

    if (year) {
      filtered = filtered.filter(event => {
        try {
          if (!event.eventDate) return false;
          
          const eventDate = new Date(event.eventDate);
          if (isNaN(eventDate.getTime())) return false;
          
          return eventDate.getFullYear() === parseInt(year);
        } catch (e) {
          console.error('Error parsing date:', e);
          return false;
        }
      });
      console.log('After year filter:', filtered.length);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, eventType, month, year, events]);

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
              console.log('Selected event type:', e.target.value);
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
      
      <div className="grid my-10 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-5">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event._id} onClick={() => { setSelectedEvent(event); setShowEvent(true); }} className="cursor-pointer">
              <CommunityCard event={event} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">No events found.</div>
        )}
      </div>
      <EventForm />
      
      <CallToAction />
      
      {showEvent && selectedEvent && <Event event={selectedEvent} onClose={() => setShowEvent(false)} />}
    </>
  );
};

export default Index;
