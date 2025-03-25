import Event from "../../models/member/eventModel.js";
import Form from "../../models/member/formModel.js";
import FormResponse from "../../models/member/formResponse.js";
import Guest from "../../models/member/guestModel.js";
import mongoose from "mongoose";

/**
 * Create a new event with form integration
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
      eventOrganizerBatch,
      eventGuests,
      eventType,
      eventStatus,
      eventForm,
      eventGallery  // Add this line
    } = req.body;

    // Validate required fields
    if (!eventName || !eventDescription || !eventType) {
      return res.status(400).json({
        success: false,
        message: "Event name, description, and type are required"
      });
    }

    // Handle registration form if provided
    let formId = null;
    if (eventForm && eventForm.formFeilds && eventForm.formFeilds.length > 0) {
      // Create a new form for this event
      const newForm = new Form({
        formTitle: `Registration for ${eventName}`,
        formDescription: `Please fill this form to register for ${eventName}`,
        fields: eventForm.formFeilds.map(field => ({
          fieldName: field.fieldName,
          fieldType: field.fieldType,
          fieldLabel: field.fieldLabel,
          placeholder: field.placeholder || '',
          required: field.required || false,
          options: field.options || []
        })),
        createdBy: req.user?._id || null,
        isActive: true
      });

      // Save the form
      const savedForm = await newForm.save();
      formId = savedForm._id;
    }

    // Create new event
    const newEvent = new Event({
      eventName,
      eventDescription,
      eventBanner,
      eventDate,
      eventTime,
      eventVenue,
      eventOrganizerBatch,
      eventGuests: eventGuests || [],
      eventType,
      eventStatus: eventStatus || "upcoming",
      eventForm: {
        formId,
        formFeilds: eventForm?.formFeilds || []
      },
      eventGallery: eventGallery || []  // Add this line
    });

    await newEvent.save();

    // Link guests to the event if any are provided
    if (eventGuests && eventGuests.length > 0) {
      for (const guest of eventGuests) {
        // Update the guest's events array
        await Guest.findByIdAndUpdate(
          guest.guestId,
          { 
            $push: { 
              events: {
                event: newEvent._id,
                guestTag: guest.guestTag || "others"
              }
            } 
          }
        );
      }
    }

    // Populate relevant fields for response
    const populatedEvent = await Event.findById(newEvent._id)
      .populate('eventBanner')
      .populate('eventGallery')  // Add this line
      .populate({
        path: 'eventGuests.guestId',
        model: 'Guest',
        select: 'guestName guestEmail guestCompany guestDesignation guestImage'
      })
      .populate('eventForm.formId');

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: populatedEvent
    });
  } catch (error) {
    console.error("Error creating event:", error);
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
    const { status, type, organizer, page = 1, limit = 10 } = req.query;
    const filter = {};

    // Apply filters if provided
    if (status) filter.eventStatus = status;
    if (type) filter.eventType = type;
    if (organizer) filter.eventOrganizerBatch = organizer;

    // Count total documents for pagination
    const total = await Event.countDocuments(filter);
    
    // Calculate pagination
    const skip = (page - 1) * limit;

    const events = await Event.find(filter)
      .populate('eventBanner')
      .populate('eventGallery')
      .populate({
        path: 'eventGuests.guestId',
        model: 'Guest',
        select: 'guestName guestEmail guestCompany guestDesignation'
      })
      .sort({ eventDate: 1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: events.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      events
    });
  } catch (error) {
    console.error("Error fetching events:", error);
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

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format"
      });
    }

    const event = await Event.findById(eventId)
      .populate('eventBanner')
      .populate('eventGallery')
      .populate({
        path: 'eventGuests.guestId',
        model: 'Guest',
        select: 'guestName guestEmail guestCompany guestDesignation guestImage guestContact guestLinkedin'
      })
      .populate('eventForm.formId');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Get form response count if form exists
    let responseCount = 0;
    if (event.eventForm && event.eventForm.formId) {
      responseCount = await FormResponse.countDocuments({ 
        form: event.eventForm.formId,
        event: event._id
      });
    }

    // Add response count to the event data
    const eventData = event.toObject();
    eventData.formResponseCount = responseCount;

    res.status(200).json({
      success: true,
      event: eventData
    });
  } catch (error) {
    console.error("Error fetching event:", error);
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

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format"
      });
    }

    // Find event and validate it exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Handle form updates if provided
    if (updateData.eventForm) {
      if (event.eventForm && event.eventForm.formId) {
        // Update existing form
        await Form.findByIdAndUpdate(
          event.eventForm.formId,
          {
            $set: {
              formTitle: `Registration for ${updateData.eventName || event.eventName}`,
              formDescription: `Please fill this form to register for ${updateData.eventName || event.eventName}`,
              fields: updateData.eventForm.formFeilds.map(field => ({
                fieldName: field.fieldName,
                fieldType: field.fieldType,
                fieldLabel: field.fieldLabel,
                placeholder: field.placeholder || '',
                required: field.required || false,
                options: field.options || []
              }))
            }
          }
        );
      } else if (updateData.eventForm.formFeilds && updateData.eventForm.formFeilds.length > 0) {
        // Create a new form
        const newForm = new Form({
          formTitle: `Registration for ${updateData.eventName || event.eventName}`,
          formDescription: `Please fill this form to register for ${updateData.eventName || event.eventName}`,
          fields: updateData.eventForm.formFeilds.map(field => ({
            fieldName: field.fieldName,
            fieldType: field.fieldType,
            fieldLabel: field.fieldLabel,
            placeholder: field.placeholder || '',
            required: field.required || false,
            options: field.options || []
          })),
          createdBy: req.user?._id || null,
          isActive: true
        });

        const savedForm = await newForm.save();
        updateData.eventForm.formId = savedForm._id;
      }
    }

    // Handle guest updates if provided
    if (updateData.eventGuests) {
      // Get current guest IDs for comparison
      const currentGuestIds = event.eventGuests.map(g => g.guestId.toString());
      const newGuestIds = updateData.eventGuests.map(g => g.guestId.toString());

      // Find new guests to add
      const guestsToAdd = updateData.eventGuests.filter(
        guest => !currentGuestIds.includes(guest.guestId.toString())
      );

      // Find guests to remove
      const guestIdsToRemove = currentGuestIds.filter(
        id => !newGuestIds.includes(id)
      );

      // Add new guests to the event
      for (const guest of guestsToAdd) {
        await Guest.findByIdAndUpdate(
          guest.guestId,
          { 
            $push: { 
              events: {
                event: eventId,
                guestTag: guest.guestTag || "others"
              }
            } 
          }
        );
      }

      // Remove guests that are no longer associated
      for (const guestId of guestIdsToRemove) {
        await Guest.findByIdAndUpdate(
          guestId,
          { 
            $pull: { 
              events: {
                event: eventId
              }
            } 
          }
        );
      }
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: updateData },
      { new: true, runValidators: true }
    )
    .populate('eventBanner')
    .populate('eventGallery')
    .populate({
      path: 'eventGuests.guestId',
      model: 'Guest',
      select: 'guestName guestEmail guestCompany guestDesignation'
    })
    .populate('eventForm.formId');

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error updating event:", error);
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

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format"
      });
    }

    // Find event and validate it exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Delete associated form if exists
    if (event.eventForm && event.eventForm.formId) {
      // Delete form responses first
      await FormResponse.deleteMany({ form: event.eventForm.formId });
      
      // Delete the form
      await Form.findByIdAndDelete(event.eventForm.formId);
    }

    // Remove event reference from all guests
    await Guest.updateMany(
      { 'events.event': eventId },
      { $pull: { events: { event: eventId } } }
    );

    // Delete the event
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      eventId
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message
    });
  }
};

/**
 * Submit a form response for an event
 * @route POST /api/events/:eventId/form-response
 */
export const submitFormResponse = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { responses, respondentInfo, files } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format"
      });
    }
    
    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    // Validate that the event has a form
    if (!event.eventForm || !event.eventForm.formId) {
      return res.status(400).json({
        success: false,
        message: "This event does not have a registration form"
      });
    }
    
    // Check if user has already submitted a response (if authenticated)
    if (req.user && req.user._id) {
      const hasResponded = await FormResponse.hasUserResponded(
        event.eventForm.formId, 
        req.user._id
      );
      
      if (hasResponded) {
        return res.status(400).json({
          success: false,
          message: "You have already submitted a response for this event"
        });
      }
    }
    
    // Convert responses object to Map for storage
    const responsesMap = new Map();
    if (responses) {
      Object.keys(responses).forEach(key => {
        responsesMap.set(key, responses[key]);
      });
    }
    
    // Create form response
    const formResponse = new FormResponse({
      form: event.eventForm.formId,
      event: eventId,
      respondent: {
        // If user is logged in, link to their profile
        member: req.user ? req.user._id : null,
        // Otherwise, use provided contact info
        name: respondentInfo?.name || '',
        email: respondentInfo?.email || '',
        phone: respondentInfo?.phone || ''
      },
      responses: responsesMap,
      files: files || [],
      status: 'pending',
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        submittedAt: new Date()
      }
    });
    
    await formResponse.save();
    
    // Add response reference to form
    await Form.findByIdAndUpdate(
      event.eventForm.formId,
      { $push: { responses: formResponse._id } }
    );
    
    res.status(201).json({
      success: true,
      message: "Form response submitted successfully",
      responseId: formResponse._id
    });
  } catch (error) {
    console.error("Error submitting form response:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting form response",
      error: error.message
    });
  }
};

/**
 * Get all form responses for an event
 * @route GET /api/events/:eventId/form-responses
 */
export const getEventFormResponses = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format"
      });
    }
    
    // Find the event
    const event = await Event.findById(eventId).populate('eventForm.formId');
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    // Check if event has a form
    if (!event.eventForm || !event.eventForm.formId) {
      return res.status(400).json({
        success: false,
        message: "This event does not have a registration form"
      });
    }
    
    // Build query
    const query = { 
      form: event.eventForm.formId,
      event: eventId
    };
    
    // Add status filter if provided
    if (status) {
      query.status = status;
    }
    
    // Get total count for pagination
    const total = await FormResponse.countDocuments(query);
    
    // Get paginated responses
    const responses = await FormResponse.find(query)
      .sort({ 'metadata.submittedAt': -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate('respondent.member', 'memberName memberEmail memberImage')
      .populate('files.fileId');
    
    res.status(200).json({
      success: true,
      responses,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error("Error fetching form responses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching form responses",
      error: error.message
    });
  }
};

/**
 * Update form response status
 * @route PATCH /api/form-responses/:responseId/status
 */
export const updateFormResponseStatus = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { status, adminNotes } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(responseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid response ID format"
      });
    }
    
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status (pending, approved, rejected) is required"
      });
    }
    
    const updateData = { status };
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }
    
    const updatedResponse = await FormResponse.findByIdAndUpdate(
      responseId,
      { $set: updateData },
      { new: true }
    );
    
    if (!updatedResponse) {
      return res.status(404).json({
        success: false,
        message: "Form response not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Response status updated to ${status}`,
      response: updatedResponse
    });
  } catch (error) {
    console.error("Error updating form response status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating form response status",
      error: error.message
    });
  }
};

/**
 * Add members to event
 * @route PATCH /api/events/:id/members
 */
export const addEventMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberIds } = req.body;
    
    if (!id || !memberIds || !Array.isArray(memberIds)) {
      return res.status(400).json({
        success: false,
        message: "Valid event ID and member IDs array are required"
      });
    }
    
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    // Filter out invalid IDs
    const validMemberIds = memberIds.filter(id => 
      mongoose.Types.ObjectId.isValid(id)
    );
    
    // Update event with members
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $addToSet: { eventMembers: { $each: validMemberIds } } },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Members added to event successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error adding members to event:", error);
    res.status(500).json({
      success: false,
      message: "Error adding members to event",
      error: error.message
    });
  }
};

/**
 * Remove members from event
 * @route PATCH /api/events/:id/members/remove
 */
export const removeEventMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberIds } = req.body;
    
    if (!id || !memberIds || !Array.isArray(memberIds)) {
      return res.status(400).json({
        success: false,
        message: "Valid event ID and member IDs array are required"
      });
    }
    
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    // Filter out invalid IDs
    const validMemberIds = memberIds.filter(id => 
      mongoose.Types.ObjectId.isValid(id)
    );
    
    // Update event to remove members
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $pull: { eventMembers: { $in: validMemberIds } } },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Members removed from event successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error removing members from event:", error);
    res.status(500).json({
      success: false,
      message: "Error removing members from event",
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
    const { id } = req.params;
    const { status } = req.body;
    
    if (!id || !status || !['upcoming', 'ongoing', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid event ID and status (upcoming, ongoing, completed) are required"
      });
    }
    
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    // Update event status
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: { eventStatus: status } },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: `Event status updated to ${status}`,
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error updating event status:", error);
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
    const { page = 1, limit = 10 } = req.query;
    
    if (!status || !['upcoming', 'ongoing', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status (upcoming, ongoing, completed) is required"
      });
    }
    
    // Count total matching documents
    const total = await Event.countDocuments({ eventStatus: status });
    
    // Get paginated events
    const events = await Event.find({ eventStatus: status })
      .populate('eventBanner')
      .populate({
        path: 'eventGuests.guestId',
        model: 'Guest',
        select: 'guestName guestCompany guestDesignation guestImage'
      })
      .sort({ eventDate: status === 'upcoming' ? 1 : -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: events.length,
      total,
      events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error("Error fetching events by status:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events by status",
      error: error.message
    });
  }
};

/**
 * Add guest to event
 * @route POST /api/linkGuestToEvent
 */
export const linkGuestToEvent = async (req, res) => {
  try {
    const { guestId, eventId, guestTag } = req.body;
    
    if (!guestId || !eventId) {
      return res.status(400).json({
        success: false,
        message: "Guest ID and Event ID are required"
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(guestId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Guest or Event ID format"
      });
    }
    
    // Check if guest and event exist
    const [guest, event] = await Promise.all([
      Guest.findById(guestId),
      Event.findById(eventId)
    ]);
    
    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found"
      });
    }
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    // Check if guest is already linked to this event
    const eventGuestExists = event.eventGuests.some(g => 
      g.guestId && g.guestId.toString() === guestId
    );
    
    if (eventGuestExists) {
      return res.status(400).json({
        success: false,
        message: "Guest is already linked to this event"
      });
    }
    
    // Add guest to event
    await Event.findByIdAndUpdate(
      eventId,
      {
        $push: {
          eventGuests: {
            guestId,
            guestTag: guestTag || "others"
          }
        }
      }
    );
    
    // Add event to guest's events array
    const guestEventExists = guest.events && guest.events.some(e => 
      e.event && e.event.toString() === eventId
    );
    
    if (!guestEventExists) {
      await Guest.findByIdAndUpdate(
        guestId,
        { 
          $push: { 
            events: {
              event: eventId,
              guestTag: guestTag || "others"
            }
          } 
        }
      );
    }
    
    res.status(200).json({
      success: true,
      message: "Guest linked to event successfully"
    });
  } catch (error) {
    console.error("Error linking guest to event:", error);
    res.status(500).json({
      success: false,
      message: "Error linking guest to event",
      error: error.message
    });
  }
};

export default {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  submitFormResponse,
  getEventFormResponses,
  updateFormResponseStatus,
  addEventMembers,
  removeEventMembers,
  updateEventStatus,
  getEventsByStatus,
  linkGuestToEvent
};