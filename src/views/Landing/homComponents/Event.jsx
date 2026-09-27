import React, { useEffect, useState, useRef, forwardRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Eventmodel from '../Event/Componant/Event';
import useEmblaCarousel from 'embla-carousel-react';
import CommunityCard from '@/utils/Card/CommunityCard';

// Utility function similar to shadcn's cn
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};



// Carousel Components - Updated with responsive design
const Carousel = forwardRef(
  ({ className, opts, setApi, children, ...props }, ref) => {
    // Set up responsive options for the carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({
      ...opts,
      axis: "x",
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 }
      },
      // Adjust slide alignment based on screen size
      align: window.innerWidth < 768 ? 'center' : 'start',
    });

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
    // Track if we're on mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    // Update mobile status on window resize
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onSelect = React.useCallback(() => {
      if (!emblaApi) return;
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;
      onSelect();
      emblaApi.on("select", onSelect);
      if (setApi) setApi(emblaApi);

      return () => {
        emblaApi.off("select", onSelect);
      };
    }, [emblaApi, onSelect, setApi]);

    return (
      <div
        ref={ref}
        className={cn("relative px-2 md:px-0", className)}
        {...props}
      >
        <div ref={emblaRef} className="overflow-hidden py-3 -my-3">
          <div className="flex pt-3 pb-2">{children}</div>
        </div>

        {/* Only show buttons on non-touch devices */}
        {!isMobile && (
          <>
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={prevBtnDisabled}
              className={cn(
                "absolute left-[-15px] sm:left-[-20px] md:left-[-30px] top-1/2 z-[999] -translate-y-1/2 rounded-full bg-white p-2 sm:p-3 shadow-[0_8px_16px_rgba(0,0,0,0.1)] border border-gray-100 hover:bg-gray-50 transition-all duration-300",
                prevBtnDisabled && "opacity-40 cursor-not-allowed hover:bg-white"
              )}
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            </button>

            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={nextBtnDisabled}
              className={cn(
                "absolute right-[-15px] sm:right-[-20px] md:right-[-30px] top-1/2 z-[999] -translate-y-1/2 rounded-full bg-white p-2 sm:p-3 shadow-[0_8px_16px_rgba(0,0,0,0.1)] border border-gray-100 hover:bg-gray-50 transition-all duration-300",
                nextBtnDisabled && "opacity-40 cursor-not-allowed hover:bg-white"
              )}
              aria-label="Next slide"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Pagination dots for mobile */}
        {isMobile && (
          <div className="flex justify-center items-center mt-4">
            {Array.from({ length: Math.ceil(React.Children.count(children) / 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 w-2 mx-1 rounded-full ${emblaApi && emblaApi.selectedScrollSnap() === index
                    ? 'bg-[#ca0019]'
                    : 'bg-gray-300'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

// Update CarouselItem component for better responsiveness
const CarouselItem = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "min-w-0 px-1 sm:px-2 md:pl-4 relative",
      // Responsive sizing
      "flex-[0_0_85%] sm:flex-[0_0_65%] md:flex-[0_0_45%] lg:flex-[0_0_30%]",
      className
    )}
    {...props}
  />
));

CarouselItem.displayName = "CarouselItem";

// Main Event Component
const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [carouselApi, setCarouselApi] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/events`);

        if (response.data && Array.isArray(response.data.events)) {
          const eventsData = response.data.events;

          // Filter and sort events
          const sortedEvents = eventsData
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
            .slice(0, 9); // Get the first 9 events

          setEvents(sortedEvents);
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

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };



  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error || !events.length) {
    return null; // Don't show anything if there's an error or no events
  }

  return (
    <section className="py-8 md:py-16 px-2 md:px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="w-full md:w-1/2 flex flex-col justify-center mb-4 md:mb-0">
            <div className="flex mb-2 md:mb-5 items-center">
              <span className="border-l-2 border-[#e03232] h-6 mr-3"></span>
              <h1 className="text-lg font-bold">OUR EVENTS</h1>
            </div>
            <h1 className="text-lg md:text-3xl font-semibold mb-4 md:mb-8">
              Experience the <span className="text-[#ca2c2c] text-3xl md:text-4xl lg:text-7xl md:py-3 block">excitement</span>
            </h1>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e03232] hover:bg-[#c52020] text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-300"
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <Carousel
          setApi={setCarouselApi}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
            dragFree: true
          }}
        >
          {events.map((event, index) => (
            <CarouselItem key={event._id || index}>
              <div className="h-full">
                <CommunityCard
                  event={event}
                />
              </div>
            </CarouselItem>
          ))}
        </Carousel>
      </div>

      {/* Render the EventModel component when modal is open */}
      {isModalOpen && selectedEvent && (
        <Eventmodel
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={closeEventModal}
        />
      )}
    </section>
  );
};

export default Event;

