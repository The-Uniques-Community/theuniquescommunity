import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Event from './Componant/Event';
import CommunityCard from '@/utils/Card/CommunityCard';
import Header from '@/utils/Header/index';
import CallToAction from '../homComponents/CallToAction';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

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
          setEvents(response.data.events);
          setFilteredEvents(response.data.events);

          const types = [...new Set(response.data.events.map(event => event.type))];
          setEventTypes(types);
          
          const uniqueYears = [...new Set(response.data.events.map(event => new Date(event.date).getFullYear()))];
          setYears(uniqueYears.sort((a, b) => b - a));
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
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
      filtered = filtered.filter(event => 
        event.name && event.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    if (eventType) {
      filtered = filtered.filter(event => event.type === eventType);
    }

    if (month) {
      filtered = filtered.filter(event => new Date(event.date).getMonth() + 1 === parseInt(month));
    }

    if (year) {
      filtered = filtered.filter(event => new Date(event.date).getFullYear() === parseInt(year));
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
          <Select value={eventType} onChange={(e) => setEventType(e.target.value)} label="Event Type">
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
      
      <CallToAction />
      
      {showEvent && selectedEvent && <Event event={selectedEvent} onClose={() => setShowEvent(false)} />}
    </>
  );
};

export default Index;
