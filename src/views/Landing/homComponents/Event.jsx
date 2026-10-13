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

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

    const onSelect = React.useCallback(() => {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    const onInit = React.useCallback(() => {
      if (!emblaApi) return;
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;
      onInit();
      emblaApi.on("select", onSelect);
      emblaApi.on("reInit", onInit);
      if (setApi) setApi(emblaApi);

      return () => {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onInit);
      };
    }, [emblaApi, onInit, onSelect, setApi]);

    const snaps = scrollSnaps.length > 0
      ? scrollSnaps
      : Array.from({ length: React.Children.count(children) });

    return (
      <div
        ref={ref}
        className={cn("relative px-2 md:px-0", className)}
        {...props}
      >
        <div ref={emblaRef} className="overflow-hidden py-3 -my-3">
          <div className="flex pt-3 pb-2">{children}</div>
        </div>

        {/* Pagination dots below event cards */}
        <div className="flex justify-center items-center gap-2 mt-6 mb-4">
          {snaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer",
                selectedIndex === index
                  ? "bg-[#ca0019] scale-125"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom controls: Centered Arrows + Right Side View All */}
        <div className="relative flex items-center justify-center mt-2 px-1 sm:px-2 min-h-[44px]">
          {/* Two arrows directed towards left and right */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={prevBtnDisabled}
              className={cn(
                "w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-sm hover:bg-[#ca0019] hover:text-white hover:border-[#ca0019] transition-all duration-200 cursor-pointer",
                prevBtnDisabled && "opacity-40 cursor-not-allowed hover:bg-white hover:text-gray-700 hover:border-gray-200"
              )}
              aria-label="Previous event"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={nextBtnDisabled}
              className={cn(
                "w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-sm hover:bg-[#ca0019] hover:text-white hover:border-[#ca0019] transition-all duration-200 cursor-pointer",
                nextBtnDisabled && "opacity-40 cursor-not-allowed hover:bg-white hover:text-gray-700 hover:border-gray-200"
              )}
              aria-label="Next event"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* View All Button on Right Side Corner */}
          <div className="absolute right-0">
            <Link
              to="/events"
              className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e03232] hover:bg-[#c52020] text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 shadow-sm"
            >
              <span>View All</span>
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </div>
        </div>
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
    <section className="pt-6 sm:pt-10 lg:pt-14 pb-8 sm:pb-12 lg:pb-16 px-2 md:px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-10 flex flex-col justify-center">
          <div className="flex mb-2 md:mb-5 items-center">
            <span className="border-l-2 border-[#e03232] h-6 mr-3"></span>
            <h1 className="text-lg font-bold">OUR EVENTS</h1>
          </div>
          <h1 className="text-lg md:text-3xl font-semibold">
            Experience the <span className="text-[#ca2c2c] text-3xl md:text-4xl lg:text-7xl md:py-3 block">excitement</span>
          </h1>
        </div>

        <Carousel
          setApi={setCarouselApi}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
            dragFree: false
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

