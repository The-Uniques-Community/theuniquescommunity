import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, X, Calendar, Clock, MapPin, User, Users as UsersIcon } from 'lucide-react';
import Button from "@/utils/Buttons/Button";
import { Tabs, Tab } from '@mui/material';

export default function Eventmodel({ event, onClose }) {
    const [activeTab, setActiveTab] = useState("about");
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [eventLeaders, setEventLeaders] = useState([]);
    const [selectedDetailEvent, setSelectedDetailEvent] = useState(null);
    
    useEffect(() => {
        // Fetch all events to populate related events and tabs
        axios.get('http://localhost:5000/api/events')
            .then(response => {
                const events = response.data.data || response.data || [];
                setAllEvents(events);
                
                // Extract unique event types for tabs
                const types = [...new Set(events.map(e => e.eventType).filter(Boolean))];
                setEventTypes(types);
                
                // Filter events by current event type
                if (event && event.eventType) {
                    const filtered = events.filter(e => 
                        e.eventType === event.eventType && e._id !== event._id
                    );
                    setFilteredEvents(filtered);
                }

                // Extract event organizers/leaders from the batch info
                if (event && event.eventOrganizerBatch) {
                    setEventLeaders([{
                        name: event.eventOrganizerBatch,
                        role: "Organizer",
                        image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                    }]);
                }
            })
            .catch(error => {
                console.error("Error fetching events:", error);
                setAllEvents([]);
                setFilteredEvents([]);
            });
    }, [event]);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
        
        // Filter events based on selected tab
        if (newValue !== "about" && newValue !== "guests" && newValue !== "organizers") {
            const filtered = allEvents.filter(e => 
                e.eventType === newValue && e._id !== event._id
            );
            setFilteredEvents(filtered);
        }
    };

    const fetchEventDetails = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
            setSelectedDetailEvent(response.data.data || response.data);
        } catch (error) {
            console.error("Error fetching event details:", error);
        }
    };

    // If no event is provided, show a loading state
    if (!event) {
        return <div>Loading event information...</div>;
    }

    // Safety check to ensure eventGuests is always an array
    const safeEventGuests = Array.isArray(event.eventGuests) ? event.eventGuests : [];

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 mt-14 z-50">
            <div className="bg-white w-full h-[90vh] overflow-auto rounded-xl shadow-lg relative p-6">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 z-10">
                    <X size={20} />
                </button>

                {/* Header Banner */}
                <div className="w-full h-96 border-b border-gray-300 rounded-xl">
                    <img 
                        src={event.eventBanner || "https://marketplace.canva.com/EAFluVdXLok/2/0/1600w/canva-blue-professional-webinar-facebook-event-cover-wp0XR0lqPgc.jpg"} 
                        alt={event.eventName}
                        className="w-full h-full object-cover rounded-xl" 
                    />
                </div>

                {/* Profile Section */}
                <div className="px-6 py-4 flex justify-between items-start border-gray-300">
                    <div className="flex">
                        <img 
                            src={event.eventBanner || "https://content.jdmagicbox.com/v2/comp/bhubaneshwar/v3/0674px674.x674.190323210154.e8v3/catalogue/event-square-ac-banquet-hall-jaydev-vihar-bhubaneshwar-ac-banquet-halls-jqazlem37r.jpg"} 
                            className="rounded-lg border border-gray-400 w-28 h-28 object-cover" 
                            alt={event.eventName}
                        />
                        <div className="ml-6">
                            <h1 className="text-3xl font-bold">{event.eventName}</h1>
                            <h2 className="text-xl text-gray-500">{event.eventVenue}</h2>
                            <div className="flex items-center text-gray-500 mt-2">
                                <Calendar className="w-5 h-5 mr-2" />
                                <span>{new Date(event.eventDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center text-gray-500 mt-1">
                                <Clock className="w-5 h-5 mr-2" />
                                <span>{event.eventTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Button color="white" bgColor="#ca0019" border={4} borderColor="#ca0019" iconColor="black">Share</Button>
                        <Button color="white" bgColor="#ca0019" border={4} borderColor="#ca0019" iconColor="black">Register</Button>
                    </div>
                </div>

                {/* Dynamic Tabs */}
                <Tabs 
                    value={activeTab} 
                    onChange={handleChange} 
                    textColor="primary" 
                    indicatorColor="primary" 
                    className="px-6"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab value="about" label="About" />
                    {eventTypes.map(type => (
                        <Tab key={type} value={type} label={type} />
                    ))}
                    <Tab value="guests" label="Guests" />
                    <Tab value="organizers" label="Organizers" />
                </Tabs>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    
                    {/* Dynamic Content */}
                    <div className="md:col-span-2 border-b border-t border-gray-300 p-4">
                        {activeTab === "about" ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                                <p className="text-gray-600 whitespace-pre-line">{event.eventDescription}</p>
                                
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <Calendar className="w-5 h-5 mr-2 text-gray-700" />
                                            <h3 className="font-semibold text-gray-700">Date</h3>
                                        </div>
                                        <p className="mt-1 text-gray-600 ml-7">
                                            {new Date(event.eventDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <Clock className="w-5 h-5 mr-2 text-gray-700" />
                                            <h3 className="font-semibold text-gray-700">Time</h3>
                                        </div>
                                        <p className="mt-1 text-gray-600 ml-7">{event.eventTime}</p>
                                    </div>
                                    
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 mr-2 text-gray-700" />
                                            <h3 className="font-semibold text-gray-700">Venue</h3>
                                        </div>
                                        <p className="mt-1 text-gray-600 ml-7">{event.eventVenue}</p>
                                    </div>
                                    
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <User className="w-5 h-5 mr-2 text-gray-700" />
                                            <h3 className="font-semibold text-gray-700">Organizer</h3>
                                        </div>
                                        <p className="mt-1 text-gray-600 ml-7">{event.eventOrganizerBatch}</p>
                                    </div>
                                </div>
                            </>
                        ) : activeTab === "guests" ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Event Guests</h2>
                                {safeEventGuests.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {safeEventGuests.map((guest, index) => {
                                            // Safely access nested properties
                                            const guestId = guest?.guestId || {};
                                            const guestName = guestId?.name || "Unknown Guest";
                                            const guestImage = guestId?.image || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";
                                            const guestDesignation = guestId?.designation || "";
                                            const guestTag = guest?.guestTag || "guest";
                                            
                                            return (
                                                <div key={index} className="border rounded-lg p-4 flex items-center">
                                                    <img 
                                                        src={guestImage} 
                                                        className="w-16 h-16 rounded-full object-cover" 
                                                        alt={guestName}
                                                    />
                                                    <div className="ml-4">
                                                        <h3 className="font-semibold">{guestName}</h3>
                                                        <p className="text-sm text-gray-600 capitalize">{guestTag}</p>
                                                        <p className="text-sm text-gray-500">{guestDesignation}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No guests listed for this event.</p>
                                )}
                            </>
                        ) : activeTab === "organizers" ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Event Organizers</h2>
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-semibold text-lg">{event.eventOrganizerBatch}</h3>
                                    <p className="text-gray-600 mt-2">
                                        The event is organized by {event.eventOrganizerBatch}, a group of passionate individuals dedicated to creating impactful experiences.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Related {activeTab} Events</h2>
                                {filteredEvents && filteredEvents.length > 0 ? (
                                    <ul className="space-y-4">
                                        {filteredEvents.map(relatedEvent => (
                                            <li key={relatedEvent._id} className="p-4 border rounded-md shadow-md">
                                                <div className="flex">
                                                    <img 
                                                        src={relatedEvent.eventBanner || "https://via.placeholder.com/100"} 
                                                        alt={relatedEvent.eventName}
                                                        className="w-20 h-20 object-cover rounded-md" 
                                                    />
                                                    <div className="ml-4">
                                                        <strong>{relatedEvent.eventName}</strong>
                                                        <div className="text-sm text-gray-500">
                                                            <div className="flex items-center mt-1">
                                                                <Calendar className="w-4 h-4 mr-1" />
                                                                {new Date(relatedEvent.eventDate).toLocaleDateString()}
                                                            </div>
                                                            <div className="flex items-center mt-1">
                                                                <Clock className="w-4 h-4 mr-1" />
                                                                {relatedEvent.eventTime}
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => fetchEventDetails(relatedEvent._id)} 
                                                            className="mt-2 text-blue-500 hover:underline"
                                                        >
                                                            Know More
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">No related {activeTab} events found.</p>
                                )}
                            </>
                        )}
                    </div>

                    {/* Event Status & Leadership - Right Side */}
                    <div className="border border-gray-300 p-4 rounded-2xl">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Event Status</h2>
                            <div className={`inline-block px-3 py-1 rounded-full text-white ${
                                event.eventStatus === 'upcoming' ? 'bg-blue-500' : 
                                event.eventStatus === 'ongoing' ? 'bg-green-500' : 'bg-gray-500'
                            }`}>
                                {(event.eventStatus || "").charAt(0).toUpperCase() + (event.eventStatus || "").slice(1)}
                            </div>
                        </div>
                        
                        <h2 className="text-xl font-bold mb-4">Community Leaders</h2>
                        <div className="space-y-4">
                            {eventLeaders.map((leader, index) => (
                                <div key={index} className="flex justify-between items-center border-b pb-2">
                                    <div className="flex items-center">
                                        <img 
                                            src={leader.image} 
                                            className="rounded-full w-12 h-12 border border-gray-300 object-cover" 
                                            alt={leader.name}
                                        />
                                        <div className="ml-3">
                                            <h3 className="font-medium">{leader.name}</h3> 
                                            <p className="text-sm text-gray-500">{leader.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {safeEventGuests.length > 0 && (
                            <div className="mt-6">
                                <h2 className="text-xl font-bold mb-4">Featured Guests</h2>
                                <div className="space-y-3">
                                    {safeEventGuests.slice(0, 3).map((guest, index) => {
                                        // Safely access nested properties 
                                        const guestId = guest?.guestId || {};
                                        const guestName = guestId?.name || "Guest";
                                        const guestImage = guestId?.image || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";
                                        const guestTag = guest?.guestTag || "guest";
                                        
                                        return (
                                            <div key={index} className="flex items-center">
                                                <img 
                                                    src={guestImage} 
                                                    className="w-10 h-10 rounded-full object-cover" 
                                                    alt={guestName}
                                                />
                                                <div className="ml-3">
                                                    <h3 className="font-medium text-sm">{guestName}</h3>
                                                    <p className="text-xs text-gray-500">{guestTag}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {safeEventGuests.length > 3 && (
                                        <button 
                                            onClick={() => setActiveTab("guests")}
                                            className="text-blue-500 text-sm hover:underline mt-2"
                                        >
                                            View all {safeEventGuests.length} guests
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Event Details Popup */}
                {selectedDetailEvent && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-11/12 md:w-2/3 p-6 rounded-xl shadow-lg relative max-h-[80vh] overflow-y-auto">
                            <button 
                                onClick={() => setSelectedDetailEvent(null)} 
                                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
                            >
                                <X size={20} />
                            </button>
                            
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3">
                                    <img 
                                        src={selectedDetailEvent.eventBanner || "https://via.placeholder.com/300"} 
                                        alt={selectedDetailEvent.eventName}
                                        className="w-full h-48 md:h-64 object-cover rounded-lg" 
                                    />
                                </div>
                                
                                <div className="md:w-2/3">
                                    <h2 className="text-2xl font-bold">{selectedDetailEvent.eventName}</h2>
                                    
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
                                            {selectedDetailEvent.eventType}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-sm text-white ${
                                            selectedDetailEvent.eventStatus === 'upcoming' ? 'bg-blue-500' : 
                                            selectedDetailEvent.eventStatus === 'ongoing' ? 'bg-green-500' : 'bg-gray-500'
                                        }`}>
                                            {selectedDetailEvent.eventStatus}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-4 space-y-2 text-gray-700">
                                        <div className="flex items-center">
                                            <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                            <span>{new Date(selectedDetailEvent.eventDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <Clock className="w-5 h-5 mr-2 text-gray-500" />
                                            <span>{selectedDetailEvent.eventTime}</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                                            <span>{selectedDetailEvent.eventVenue}</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <UsersIcon className="w-5 h-5 mr-2 text-gray-500" />
                                            <span>{selectedDetailEvent.eventOrganizerBatch}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-lg mb-2">Description</h3>
                                        <p className="text-gray-600">{selectedDetailEvent.eventDescription}</p>
                                    </div>
                                    
                                    <div className="mt-6 flex justify-end gap-3">
                                        <Button 
                                            color="white" 
                                            bgColor="#ca0019" 
                                            border={4} 
                                            borderColor="#ca0019" 
                                            iconColor="black"
                                            onClick={() => {
                                                setSelectedDetailEvent(null);
                                                onClose();
                                                // You could navigate to the event's full page here
                                            }}
                                        >
                                            View Full Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}