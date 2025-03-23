import Event from "../../models/member/eventModel.js";
import mongoose from "mongoose";

/**
 * Create a new event
 * @route POST /api/events
 */
export const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      eventBanner,
      eventDate,
      eventTime,
      eventVenue,
      eventOrganizer,
      eventMembers,
      eventGuests,
      eventType,
      eventStatus
    } = req.body;

    // Validate required fields
    if (!eventName || !eventDescription || !eventType) {
      return res.status(400).json({
        success: false,
        message: "Event name, description, and type are required"
      });
    }

    // Create new event
    const newEvent = new Event({
      eventName,
      eventDescription,
      eventBanner,
      eventDate,
      eventTime,
      eventVenue,
      eventOrganizer,
      eventMembers: eventMembers || [],
      eventGuests: eventGuests || [],
      eventType,
      eventStatus: eventStatus || "upcoming"
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message
    });
  }
};

/**
 * Get all events with optional filtering
 * @route GET /api/events
 */
export const getAllEvents = async (req, res) => {
  try {
    const { status, type, organizer } = req.query;
    const filter = {};

    // Apply filters if provided
    if (status) filter.eventStatus = status;
    if (type) filter.eventType = type;
    if (organizer) filter.eventOrganizer = organizer;

    const events = await Event.find(filter)
      .populate('eventOrganizer', 'memberName memberImage')
      .populate('eventMembers', 'memberName memberImage')
      .sort({ eventDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message
    });
  }
};

/**
 * Get event by ID
 * @route GET /api/events/:id
 */
export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required"
      });
    }

    const event = await Event.findById(eventId)
      .populate('eventOrganizer', 'memberName memberEmail memberImage')
      .populate('eventMembers', 'memberName memberEmail memberImage');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    // Handle invalid ID format
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message
    });
  }
};

/**
 * Update an event
 * @route PUT /api/events/:id
 */
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateData = req.body;

    // Find event and validate it exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('eventOrganizer', 'memberName memberImage')
     .populate('eventMembers', 'memberName memberImage');

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
        error: error.message
      });
    }

    // Handle invalid ID format
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message
    });
  }
};

/**
 * Delete an event
 * @route DELETE /api/events/:id
 */
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find event and validate it exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Delete the event
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      eventId
    });
  } catch (error) {
    // Handle invalid ID format
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message
    });
  }
};

/**
 * Add members to an event
 * @route PATCH /api/events/:id/members
 */
export const addEventMembers = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { memberIds } = req.body;

    if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid member IDs array is required"
      });
    }

    // Check if all IDs are valid ObjectIds
    const validIds = memberIds.every(id => mongoose.Types.ObjectId.isValid(id));
    if (!validIds) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID format in the provided array"
      });
    }

    // Update event with new members, preventing duplicates
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { eventMembers: { $each: memberIds } } },
      { new: true, runValidators: true }
    ).populate('eventMembers', 'memberName memberImage');

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Members added to event successfully",
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding members to event",
      error: error.message
    });
  }
};

/**
 * Remove members from an event
 * @route PATCH /api/events/:id/members/remove
 */
export const removeEventMembers = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { memberIds } = req.body;

    if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid member IDs array is required"
      });
    }

    // Update event to remove specified members
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { eventMembers: { $in: memberIds } } },
      { new: true }
    ).populate('eventMembers', 'memberName memberImage');

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Members removed from event successfully",
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing members from event",
      error: error.message
    });
  }
};

/**
 * Add guests to an event
 * @route PATCH /api/events/:id/guests
 */
export const addEventGuests = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { guests } = req.body;

    if (!guests || !Array.isArray(guests) || guests.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid guests array is required"
      });
    }

    // Update event with new guests
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $push: { eventGuests: { $each: guests } } },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Guests added to event successfully",
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding guests to event",
      error: error.message
    });
  }
};

/**
 * Update event status
 * @route PATCH /api/events/:id/status
 */
export const updateEventStatus = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { status } = req.body;

    if (!status || !['upcoming', 'ongoing', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required (upcoming, ongoing, or completed)"
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { eventStatus: status },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Event status updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating event status",
      error: error.message
    });
  }
};

/**
 * Get events by status
 * @route GET /api/events/status/:status
 */
export const getEventsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (!status || !['upcoming', 'ongoing', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required (upcoming, ongoing, or completed)"
      });
    }

    const events = await Event.find({ eventStatus: status })
      .populate('eventOrganizer', 'memberName memberImage')
      .populate('eventMembers', 'memberName memberImage')
      .sort({ eventDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message
    });
  }
};