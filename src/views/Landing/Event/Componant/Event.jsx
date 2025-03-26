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
                
                // If the current event doesn't have populated gallery data, you might need to fetch it
                if (event && (!event.eventGallery || event.eventGallery.length === 0)) {
                    axios.get(`http://localhost:5000/api/events/${event._id}/gallery`)
                        .catch(err => console.error("Error fetching gallery:", err));
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
        if (newValue !== "about" && newValue !== "guests" && newValue !== "organizers" && newValue !== "gallery" && newValue !== "sponsors") {
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

    // Helper function to extract Google Drive file ID from event banner
    const extractBannerFileId = (banner) => {
        if (!banner) return '1OSWCFdMnh8Y1wZoepQuup8HXzmcpxxKu'; // Default fallback
        
        if (typeof banner === 'string') {
            return banner;
        } else {
            // If banner is an object, try to extract fileId or _id
            return banner.fileId || banner._id || '1OSWCFdMnh8Y1wZoepQuup8HXzmcpxxKu';
        }
    };

    // If no event is provided, show a loading state
    if (!event) {
        return <div>Loading event information...</div>;
    }

    // Safety check to ensure eventGuests is always an array
    const safeEventGuests = Array.isArray(event.eventGuests) ? event.eventGuests : [];

    // Safety check to ensure eventGallery is always an array
    const safeEventGallery = Array.isArray(event.eventGallery) ? event.eventGallery : [];

    // Extract banner file ID
    const bannerFileId = extractBannerFileId(event.eventBanner);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[9999999] p-2 sm:p-4 overflow-hidden">
            <div className="bg-white w-full max-w-7xl mx-auto h-[90vh] sm:h-[85vh] md:h-[90vh] overflow-auto rounded-xl shadow-lg relative p-3 sm:p-4 md:p-6">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 z-10">
                    <X size={20} />
                </button>

                {/* Header Banner - Dynamic from backend */}
                <div className="w-full h-40 sm:h-60 md:h-96 border-b border-gray-300 rounded-xl">
                    <iframe  
                        src={`https://drive.google.com/file/d/${bannerFileId}/preview`}
                        className="w-full h-full object-cover rounded-xl"
                        title="Event banner"
                        loading="lazy"
                        allow="autoplay"
                    ></iframe>
                </div>

                {/* Profile Section */}
                <div className="px-2 sm:px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-start border-gray-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto mb-4 sm:mb-0">
                      
                        <div className="sm:ml-6">
                            <h1 className="text-2xl sm:text-3xl font-bold">{event.eventName}</h1>
                            <h2 className="text-lg sm:text-xl text-gray-500">{event.eventVenue}</h2>
                            <div className="flex items-center text-gray-500 mt-2">
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                <span className="text-sm sm:text-base">{new Date(event.eventDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center text-gray-500 mt-1">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                <span className="text-sm sm:text-base">{event.eventTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3 w-full sm:w-auto justify-end">
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
                    className="px-2 sm:px-4 md:px-6"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab value="about" label="About" />
                    {eventTypes.map(type => (
                        <Tab key={type} value={type} label={type} />
                    ))}
                    <Tab value="gallery" label="Gallery" />
                    <Tab value="guests" label="Guests" />
                    <Tab value="organizers" label="Organizers" />
                </Tabs>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 md:p-6">
                    
                    {/* Dynamic Content */}
                    <div className="md:col-span-2 border-b border-t border-gray-300 p-3 sm:p-4">
                        {activeTab === "about" ? (
                            <>
                                <h2 className="text-xl sm:text-2xl font-bold mb-4">About This Event</h2>
                                <p className="text-gray-600 whitespace-pre-line text-sm sm:text-base">{event.eventDescription}</p>
                                
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-700" />
                                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Date</h3>
                                        </div>
                                        <p className="mt-1 text-gray-600 ml-6 sm:ml-7 text-xs sm:text-sm">
                                            {new Date(event.eventDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-700" />
                                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Time</h3>
                                        </div>
                                        <p className="mt-1 text-gray-600 ml-6 sm:ml-7 text-xs sm:text-sm">{event.eventTime}</p>
                                    </div>
                                    
                                    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-700" />
                                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Venue</h3>
                                        </div>
                                        <p className="mt-1 text-gray-600 ml-6 sm:ml-7 text-xs sm:text-sm">{event.eventVenue}</p>
                                    </div>
                                    
                                    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-700" />
                                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Organizer</h3>
                                        </div>
                                        <p className="mt-1 text-gray-600 ml-6 sm:ml-7 text-xs sm:text-sm">{event.eventOrganizerBatch}</p>
                                    </div>
                                </div>
                            </>
                        ) : activeTab === "gallery" ? (
                            <>
                                <h2 className="text-xl sm:text-2xl font-bold mb-4">Event Gallery</h2>
                                {safeEventGallery && safeEventGallery.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {safeEventGallery.map((image, index) => {
                                            // Extract the Google Drive file ID from the image object
                                            const driveFileId = typeof image === 'string' ? image : 
                                                            (image.fileId || image._id || '');
                                            
                                            return (
                                                <div key={index} className="w-full h-48 sm:h-56 md:h-64 border border-gray-200 rounded-xl overflow-hidden">
                                                    <iframe 
                                                        src={`https://drive.google.com/file/d/${driveFileId}/preview`}
                                                        className="w-full h-full object-cover rounded-xl"
                                                        loading="lazy"
                                                        title={`Event gallery image ${index + 1}`}
                                                        allow="autoplay"
                                                    ></iframe>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-sm sm:text-base">No gallery images available for this event.</p>
                                )}
                            </>
                        ) : activeTab === "guests" ? (
                            <>
                                <h2 className="text-xl sm:text-2xl font-bold mb-4">Event Guests</h2>
                                {safeEventGuests.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {safeEventGuests.map((guest, index) => {
                                            // Safely access nested properties
                                            const guestId = guest?.guestId || {};
                                            const guestName = guestId?.guestName || "Unknown Guest";
                                            const guestImage = guestId?.guestImage || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";
                                            const guestDesignation = guestId?.designation || "";
                                            const guestTag = guest?.guestTag || "guest";
                                            
                                            return (
                                                <div key={index} className="border rounded-lg p-3 sm:p-4 flex items-center">
                                                    <img 
                                                        src={guestImage} 
                                                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover" 
                                                        alt={guestName}
                                                    />
                                                    <div className="ml-3 sm:ml-4">
                                                        <h3 className="font-semibold text-sm sm:text-base">{guestName}</h3>
                                                        <p className="text-xs sm:text-sm text-gray-600 capitalize">{guestTag}</p>
                                                        <p className="text-xs sm:text-sm text-gray-500">{guestDesignation}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-sm sm:text-base">No guests listed for this event.</p>
                                )}
                            </>
                        ) : activeTab === "organizers" ? (
                            <>
                                <h2 className="text-xl sm:text-2xl font-bold mb-4">Event Organizers</h2>
                                <div className="border rounded-lg p-3 sm:p-4">
                                    <h3 className="font-semibold text-base sm:text-lg">{event.eventOrganizerBatch}</h3>
                                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                        The event is organized by {event.eventOrganizerBatch}, a group of passionate individuals dedicated to creating impactful experiences.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl sm:text-2xl font-bold mb-4">Related {activeTab} Events</h2>
                                {filteredEvents && filteredEvents.length > 0 ? (
                                    <ul className="space-y-3 sm:space-y-4">
                                        {filteredEvents.map(relatedEvent => {
                                            // Extract banner ID for related events
                                            const relatedBannerId = extractBannerFileId(relatedEvent.eventBanner);
                                            
                                            return (
                                                <li key={relatedEvent._id} className="p-3 sm:p-4 border rounded-md shadow-md">
                                                    <div className="flex flex-col sm:flex-row">
                                                        <div className="w-full sm:w-20 h-32 sm:h-20 mb-2 sm:mb-0 rounded-md overflow-hidden">
                                                            <iframe 
                                                                src={`https://drive.google.com/file/d/${relatedBannerId}/preview`}
                                                                className="w-full h-full object-cover"
                                                                loading="lazy"
                                                                title={`${relatedEvent.eventName} banner`}
                                                                allow="autoplay"
                                                            ></iframe>
                                                        </div>
                                                        <div className="sm:ml-4">
                                                            <strong className="text-sm sm:text-base">{relatedEvent.eventName}</strong>
                                                            <div className="text-xs sm:text-sm text-gray-500">
                                                                <div className="flex items-center mt-1">
                                                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                                                    {new Date(relatedEvent.eventDate).toLocaleDateString()}
                                                                </div>
                                                                <div className="flex items-center mt-1">
                                                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                                                    {relatedEvent.eventTime}
                                                                </div>
                                                            </div>
                                                            <button 
                                                                onClick={() => fetchEventDetails(relatedEvent._id)} 
                                                                className="mt-2 text-blue-500 hover:underline text-xs sm:text-sm"
                                                            >
                                                                Know More
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600 text-sm sm:text-base">No related {activeTab} events found.</p>
                                )}
                            </>
                        )}
                    </div>

                    {/* Event Status & Leadership - Right Side */}
                    <div className="border border-gray-300 p-3 sm:p-4 rounded-2xl">
                        <div className="mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-bold mb-2">Event Status</h2>
                            <div className={`inline-block px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm ${
                                event.eventStatus === 'upcoming' ? 'bg-blue-500' : 
                                event.eventStatus === 'ongoing' ? 'bg-green-500' : 'bg-gray-500'
                            }`}>
                                {(event.eventStatus || "").charAt(0).toUpperCase() + (event.eventStatus || "").slice(1)}
                            </div>
                        </div>
                        
                        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Community Leaders</h2>
                        <div className="space-y-3 sm:space-y-4">
                            {eventLeaders.map((leader, index) => (
                                <div key={index} className="flex justify-between items-center border-b pb-2">
                                    <div className="flex items-center">
                                        <img 
                                            src={leader.image} 
                                            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 object-cover" 
                                            alt={leader.name}
                                        />
                                        <div className="ml-2 sm:ml-3">
                                            <h3 className="font-medium text-sm sm:text-base">{leader.name}</h3> 
                                            <p className="text-xs sm:text-sm text-gray-500">{leader.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {safeEventGuests.length > 0 && (
                            <div className="mt-4 sm:mt-6">
                                <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Featured Guests</h2>
                                <div className="space-y-2 sm:space-y-3">
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
                                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" 
                                                    alt={guestName}
                                                />
                                                <div className="ml-2 sm:ml-3">
                                                    <h3 className="font-medium text-xs sm:text-sm">{guestName}</h3>
                                                    <p className="text-xs text-gray-500">{guestTag}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {safeEventGuests.length > 3 && (
                                        <button 
                                            onClick={() => setActiveTab("guests")}
                                            className="text-blue-500 text-xs sm:text-sm hover:underline mt-1 sm:mt-2"
                                        >
                                            View all {safeEventGuests.length} guests
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Show gallery preview if available */}
                        {safeEventGallery.length > 0 && (
                            <div className="mt-4 sm:mt-6">
                                <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Gallery Preview</h2>
                                <div className="space-y-2">
                                    <div className="h-32 border border-gray-200 rounded-xl overflow-hidden">
                                        {safeEventGallery[0] && (
                                            <iframe 
                                                src={`https://drive.google.com/file/d/${typeof safeEventGallery[0] === 'string' ? safeEventGallery[0] : (safeEventGallery[0].fileId || safeEventGallery[0]._id || '')}/preview`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                title="Gallery preview"
                                                allow="autoplay"
                                            ></iframe>
                                        )}
                                    </div>
                                    {safeEventGallery.length > 1 && (
                                        <button 
                                            onClick={() => setActiveTab("gallery")}
                                            className="text-blue-500 text-xs sm:text-sm hover:underline mt-1"
                                        >
                                            View all {safeEventGallery.length} images
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Event Details Popup */}
                {selectedDetailEvent && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-2 sm:p-4">
                        <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-3 sm:p-6 rounded-xl shadow-lg relative max-h-[80vh] overflow-y-auto">
                            <button 
                                onClick={() => setSelectedDetailEvent(null)} 
                                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
                            >
                                <X size={20} />
                            </button>
                            
                            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                                <div className="md:w-1/3 h-40 sm:h-48 md:h-64 rounded-lg overflow-hidden">
                                    <iframe 
                                        src={`https://drive.google.com/file/d/${extractBannerFileId(selectedDetailEvent.eventBanner)}/preview`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        title={`${selectedDetailEvent.eventName} banner`}
                                        allow="autoplay"
                                    ></iframe>
                                </div>
                                
                                <div className="md:w-2/3">
                                    <h2 className="text-xl sm:text-2xl font-bold">{selectedDetailEvent.eventName}</h2>
                                    
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs sm:text-sm">
                                            {selectedDetailEvent.eventType}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs sm:text-sm text-white ${
                                            selectedDetailEvent.eventStatus === 'upcoming' ? 'bg-blue-500' : 
                                            selectedDetailEvent.eventStatus === 'ongoing' ? 'bg-green-500' : 'bg-gray-500'
                                        }`}>
                                            {selectedDetailEvent.eventStatus}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-4 space-y-2 text-gray-700">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-500" />
                                            <span className="text-xs sm:text-sm">{new Date(selectedDetailEvent.eventDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-500" />
                                            <span className="text-xs sm:text-sm">{selectedDetailEvent.eventTime}</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-500" />
                                            <span className="text-xs sm:text-sm">{selectedDetailEvent.eventVenue}</span>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-500" />
                                            <span className="text-xs sm:text-sm">{selectedDetailEvent.eventOrganizerBatch}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-base sm:text-lg mb-2">Description</h3>
                                        <p className="text-gray-600 text-xs sm:text-sm">{selectedDetailEvent.eventDescription}</p>
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