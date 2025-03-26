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
      eventGallery,
      sponsors, // Add this line to extract sponsors from request body
    } = req.body;

    // Validate required fields
    if (!eventName || !eventDescription || !eventType) {
      return res.status(400).json({
        success: false,
        message: "Event name, description, and type are required",
      });
    }

    // Handle registration form if provided
    let formId = null;
    if (eventForm && eventForm.formFeilds && eventForm.formFeilds.length > 0) {
      // Create a new form for this event
      const newForm = new Form({
        formTitle: `Registration for ${eventName}`,
        formDescription: `Please fill this form to register for ${eventName}`,
        fields: eventForm.formFeilds.map((field) => ({
          fieldName: field.fieldName,
          fieldType: field.fieldType,
          fieldLabel: field.fieldLabel,
          placeholder: field.placeholder || "",
          required: field.required || false,
          options: field.options || [],
        })),
        createdBy: req.user?._id || null,
        isActive: true,
      });

      // Save the form
      const savedForm = await newForm.save();
      formId = savedForm._id;
    }

    // Create new event with sponsors
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
        formFeilds: eventForm?.formFeilds || [],
      },
      eventGallery: eventGallery || [],
      sponsors: sponsors || [], // Add sponsors to the event
    });

    // Initialize budget fields if sponsors are provided
    if (sponsors && sponsors.length > 0) {
      // Calculate total amount from sponsors
      const totalSponsorship = sponsors.reduce((total, sponsor) => total + (sponsor.amount || 0), 0);
      
      // Initialize budget with sponsor amounts
      newEvent.budget = {
        totalAllocated: totalSponsorship,
        totalSpent: 0,
        remaining: totalSponsorship,
        currency: 'INR',
        status: 'active',
        lastUpdatedBy: {
          userId: req.user?._id || null,
          role: req.user?.role || 'admin',
          timestamp: new Date()
        }
      };

      // Add entry to budget history
      newEvent.budgetHistory = [{
        action: 'created',
        amount: totalSponsorship,
        category: 'sponsorship',
        note: 'Initial budget from sponsors',
        performedBy: {
          userId: req.user?._id || null,
          role: req.user?.role || 'admin'
        },
        timestamp: new Date()
      }];
    }

    await newEvent.save();

    // Link guests to the event if any are provided
    if (eventGuests && eventGuests.length > 0) {
      for (const guest of eventGuests) {
        // Update the guest's events array
        await Guest.findByIdAndUpdate(guest.guestId, {
          $push: {
            events: {
              event: newEvent._id,
              guestTag: guest.guestTag || "others",
            },
          },
        });
      }
    }

    // Populate relevant fields for response
    const populatedEvent = await Event.findById(newEvent._id)
      .populate("eventBanner")
      .populate("eventGallery")
      .populate({
        path: "eventGuests.guestId",
        model: "Guest",
        select: "guestName guestEmail guestCompany guestDesignation guestImage",
      })
      .populate("eventForm.formId");

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: populatedEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message,
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
      .populate("eventBanner")
      .populate("eventGallery")
      .populate({
        path: "eventGuests.guestId",
        model: "Guest",
        select: "guestName guestEmail guestCompany guestDesignation",
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
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message,
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
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(eventId)
      .populate("eventBanner")
      .populate("eventGallery")
      .populate({
        path: "eventGuests.guestId",
        model: "Guest",
        select:
          "guestName guestEmail guestCompany guestDesignation guestImage guestContact guestLinkedin",
      })
      .populate("eventForm.formId");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Get form response count if form exists
    let responseCount = 0;
    if (event.eventForm && event.eventForm.formId) {
      responseCount = await FormResponse.countDocuments({
        form: event.eventForm.formId,
        event: event._id,
      });
    }

    // Add response count to the event data
    const eventData = event.toObject();
    eventData.formResponseCount = responseCount;

    res.status(200).json({
      success: true,
      event: eventData,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message,
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
        message: "Invalid event ID format",
      });
    }

    // Find event and validate it exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Handle form updates if provided
    if (updateData.eventForm) {
      if (event.eventForm && event.eventForm.formId) {
        // Update existing form
        await Form.findByIdAndUpdate(event.eventForm.formId, {
          $set: {
            formTitle: `Registration for ${
              updateData.eventName || event.eventName
            }`,
            formDescription: `Please fill this form to register for ${
              updateData.eventName || event.eventName
            }`,
            fields: updateData.eventForm.formFeilds.map((field) => ({
              fieldName: field.fieldName,
              fieldType: field.fieldType,
              fieldLabel: field.fieldLabel,
              placeholder: field.placeholder || "",
              required: field.required || false,
              options: field.options || [],
            })),
          },
        });
      } else if (
        updateData.eventForm.formFeilds &&
        updateData.eventForm.formFeilds.length > 0
      ) {
        // Create a new form
        const newForm = new Form({
          formTitle: `Registration for ${
            updateData.eventName || event.eventName
          }`,
          formDescription: `Please fill this form to register for ${
            updateData.eventName || event.eventName
          }`,
          fields: updateData.eventForm.formFeilds.map((field) => ({
            fieldName: field.fieldName,
            fieldType: field.fieldType,
            fieldLabel: field.fieldLabel,
            placeholder: field.placeholder || "",
            required: field.required || false,
            options: field.options || [],
          })),
          createdBy: req.user?._id || null,
          isActive: true,
        });

        const savedForm = await newForm.save();
        updateData.eventForm.formId = savedForm._id;
      }
    }

    // Handle guest updates if provided
    if (updateData.eventGuests) {
      // Get current guest IDs for comparison
      const currentGuestIds = event.eventGuests.map((g) =>
        g.guestId.toString()
      );
      const newGuestIds = updateData.eventGuests.map((g) =>
        g.guestId.toString()
      );

      // Find new guests to add
      const guestsToAdd = updateData.eventGuests.filter(
        (guest) => !currentGuestIds.includes(guest.guestId.toString())
      );

      // Find guests to remove
      const guestIdsToRemove = currentGuestIds.filter(
        (id) => !newGuestIds.includes(id)
      );

      // Add new guests to the event
      for (const guest of guestsToAdd) {
        await Guest.findByIdAndUpdate(guest.guestId, {
          $push: {
            events: {
              event: eventId,
              guestTag: guest.guestTag || "others",
            },
          },
        });
      }

      // Remove guests that are no longer associated
      for (const guestId of guestIdsToRemove) {
        await Guest.findByIdAndUpdate(guestId, {
          $pull: {
            events: {
              event: eventId,
            },
          },
        });
      }
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate("eventBanner")
      .populate("eventGallery")
      .populate({
        path: "eventGuests.guestId",
        model: "Guest",
        select: "guestName guestEmail guestCompany guestDesignation",
      })
      .populate("eventForm.formId");

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message,
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
        message: "Invalid event ID format",
      });
    }

    // Find event and validate it exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
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
      { "events.event": eventId },
      { $pull: { events: { event: eventId } } }
    );

    // Delete the event
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      eventId,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message,
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
        message: "Invalid event ID format",
      });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Validate that the event has a form
    if (!event.eventForm || !event.eventForm.formId) {
      return res.status(400).json({
        success: false,
        message: "This event does not have a registration form",
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
          message: "You have already submitted a response for this event",
        });
      }
    }

    // Convert responses object to Map for storage
    const responsesMap = new Map();
    if (responses) {
      Object.keys(responses).forEach((key) => {
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
        name: respondentInfo?.name || "",
        email: respondentInfo?.email || "",
        phone: respondentInfo?.phone || "",
      },
      responses: responsesMap,
      files: files || [],
      status: "pending",
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        submittedAt: new Date(),
      },
    });

    await formResponse.save();

    // Add response reference to form
    await Form.findByIdAndUpdate(event.eventForm.formId, {
      $push: { responses: formResponse._id },
    });

    res.status(201).json({
      success: true,
      message: "Form response submitted successfully",
      responseId: formResponse._id,
    });
  } catch (error) {
    console.error("Error submitting form response:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting form response",
      error: error.message,
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
        message: "Invalid event ID format",
      });
    }

    // Find the event
    const event = await Event.findById(eventId).populate("eventForm.formId");
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check if event has a form
    if (!event.eventForm || !event.eventForm.formId) {
      return res.status(400).json({
        success: false,
        message: "This event does not have a registration form",
      });
    }

    // Build query
    const query = {
      form: event.eventForm.formId,
      event: eventId,
    };

    // Add status filter if provided
    if (status) {
      query.status = status;
    }

    // Get total count for pagination
    const total = await FormResponse.countDocuments(query);

    // Get paginated responses
    const responses = await FormResponse.find(query)
      .sort({ "metadata.submittedAt": -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate("respondent.member", "memberName memberEmail memberImage")
      .populate("files.fileId");

    res.status(200).json({
      success: true,
      responses,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching form responses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching form responses",
      error: error.message,
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
        message: "Invalid response ID format",
      });
    }

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status (pending, approved, rejected) is required",
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
        message: "Form response not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Response status updated to ${status}`,
      response: updatedResponse,
    });
  } catch (error) {
    console.error("Error updating form response status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating form response status",
      error: error.message,
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
        message: "Valid event ID and member IDs array are required",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Filter out invalid IDs
    const validMemberIds = memberIds.filter((id) =>
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
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error adding members to event:", error);
    res.status(500).json({
      success: false,
      message: "Error adding members to event",
      error: error.message,
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
        message: "Valid event ID and member IDs array are required",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Filter out invalid IDs
    const validMemberIds = memberIds.filter((id) =>
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
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error removing members from event:", error);
    res.status(500).json({
      success: false,
      message: "Error removing members from event",
      error: error.message,
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

    if (
      !id ||
      !status ||
      !["upcoming", "ongoing", "completed"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid event ID and status (upcoming, ongoing, completed) are required",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
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
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating event status",
      error: error.message,
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

    if (!status || !["upcoming", "ongoing", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status (upcoming, ongoing, completed) is required",
      });
    }

    // Count total matching documents
    const total = await Event.countDocuments({ eventStatus: status });

    // Get paginated events
    const events = await Event.find({ eventStatus: status })
      .populate("eventBanner")
      .populate({
        path: "eventGuests.guestId",
        model: "Guest",
        select: "guestName guestCompany guestDesignation guestImage",
      })
      .sort({ eventDate: status === "upcoming" ? 1 : -1 })
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
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching events by status:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events by status",
      error: error.message,
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
        message: "Guest ID and Event ID are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(guestId) ||
      !mongoose.Types.ObjectId.isValid(eventId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Guest or Event ID format",
      });
    }

    // Check if guest and event exist
    const [guest, event] = await Promise.all([
      Guest.findById(guestId),
      Event.findById(eventId),
    ]);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check if guest is already linked to this event
    const eventGuestExists = event.eventGuests.some(
      (g) => g.guestId && g.guestId.toString() === guestId
    );

    if (eventGuestExists) {
      return res.status(400).json({
        success: false,
        message: "Guest is already linked to this event",
      });
    }

    // Add guest to event
    await Event.findByIdAndUpdate(eventId, {
      $push: {
        eventGuests: {
          guestId,
          guestTag: guestTag || "others",
        },
      },
    });

    // Add event to guest's events array
    const guestEventExists =
      guest.events &&
      guest.events.some((e) => e.event && e.event.toString() === eventId);

    if (!guestEventExists) {
      await Guest.findByIdAndUpdate(guestId, {
        $push: {
          events: {
            event: eventId,
            guestTag: guestTag || "others",
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Guest linked to event successfully",
    });
  } catch (error) {
    console.error("Error linking guest to event:", error);
    res.status(500).json({
      success: false,
      message: "Error linking guest to event",
      error: error.message,
    });
  }
};

/**
 * Update event budget - both admin and coordinator can do this now
 * @route PUT /api/events/:id/budget
 */
export const updateEventBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalAllocated, currency } = req.body;
    const role = req.user?.role || "coordinator";

    // Removed the admin-only check

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Calculate current spent amount
    const totalSpent = event.expenses.reduce(
      (total, expense) =>
        expense.paymentStatus === "completed" ? total + expense.amount : total,
      0
    );

    // Create budget history entry
    const historyEntry = {
      action: event.budget?.totalAllocated ? "updated" : "created",
      amount: totalAllocated,
      previousAmount: event.budget?.totalAllocated || 0,
      note: req.body.note || "",
      performedBy: {
        userId: req.user?._id,
        role: role,
      },
      timestamp: new Date(),
    };

    // Update budget
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $set: {
          "budget.totalAllocated": totalAllocated,
          "budget.totalSpent": totalSpent,
          "budget.remaining": totalAllocated - totalSpent,
          "budget.currency": currency || "INR",
          "budget.status": "active",
          "budget.lastUpdatedBy": {
            userId: req.user?._id,
            role: role,
            timestamp: new Date(),
          },
        },
        $push: { budgetHistory: historyEntry },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Event budget updated successfully",
      budget: updatedEvent.budget,
    });
  } catch (error) {
    console.error("Error updating event budget:", error);
    res.status(500).json({
      success: false,
      message: "Error updating event budget",
      error: error.message,
    });
  }
};

/**
 * Add sponsor to event
 * @route POST /api/events/:id/sponsors
 */
export const addEventSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      amount,
      type,
      contactPerson,
      contactEmail,
      contactPhone,
      logoUrl,
      notes,
      receiptId,
      status = "pending", // Add status with default "pending"
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !name || !amount) {
      return res.status(400).json({
        success: false,
        message: "Valid event ID, sponsor name, and amount are required",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Create new sponsor object with status
    const sponsor = {
      name,
      amount: Number(amount),
      type: type || "cash",
      contactPerson,
      contactEmail,
      contactPhone,
      notes,
      receiptId,
      logoUrl,
      status: status, // Add status field
      dateReceived: new Date(),
    };

    // Update budget history
    const historyEntry = {
      action: "sponsor_added",
      amount: Number(amount),
      note: `Added sponsor: ${name} (${status})`,
      performedBy: {
        userId: req.user?._id,
        role: req.user?.role || "coordinator",
      },
      timestamp: new Date(),
    };

    // Add sponsor without updating budget (since it's pending)
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $push: { sponsors: sponsor, budgetHistory: historyEntry },
        // No budget updates since sponsor is pending
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Sponsor added successfully",
      sponsors: updatedEvent.sponsors,
      budget: updatedEvent.budget,
    });
  } catch (error) {
    console.error("Error adding sponsor:", error);
    res.status(500).json({
      success: false,
      message: "Error adding sponsor",
      error: error.message,
    });
  }
};

/**
 * Update sponsor or expense receipt
 * @route PATCH /api/events/:id/update-receipt
 */
export const updateReceiptId = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId, itemType, receiptId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(itemId) ||
      !receiptId ||
      !["sponsor", "expense"].includes(itemType)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid event ID, item ID, receipt ID, and item type are required",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Update based on item type
    let updateQuery = {};
    if (itemType === "sponsor") {
      updateQuery = {
        $set: { "sponsors.$[elem].receiptId": receiptId },
      };
    } else {
      updateQuery = {
        $set: { "expenses.$[elem].receiptId": receiptId },
      };
    }

    // Update the receipt ID without changing budget
    const updatedEvent = await Event.findByIdAndUpdate(id, updateQuery, {
      arrayFilters: [{ "elem._id": itemId }],
      new: true,
    });

    res.status(200).json({
      success: true,
      message: `Receipt updated for ${itemType}`,
      [itemType + "s"]:
        itemType === "sponsor" ? updatedEvent.sponsors : updatedEvent.expenses,
    });
  } catch (error) {
    console.error(`Error updating receipt:`, error);
    res.status(500).json({
      success: false,
      message: "Error updating receipt",
      error: error.message,
    });
  }
};

/**
 * Add expense to event - both admin and coordinator
 * @route POST /api/events/:id/expenses
 */
export const addEventExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category,
      title,
      amount,
      vendor,
      paymentMethod,
      paymentStatus,
      receiptId,
      paidBy,
      paidOn,
      notes,
    } = req.body;

    const userRole = req.user?.role || "coordinator";

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !category ||
      !title ||
      !amount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid event ID, category, title, and amount are required",
      });
    }

    // Get the event document
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Build the expense object
    const expense = {
      category,
      title,
      amount: Number(amount),
      vendor,
      paymentMethod: paymentMethod || "cash",
      paymentStatus: paymentStatus || "pending",
      receiptId,
      paidBy,
      paidOn: paidOn
        ? new Date(paidOn)
        : paymentStatus === "completed"
        ? new Date()
        : null,
      notes,
      createdBy: {
        userId: req.user?._id,
        role: userRole,
      },
      createdAt: new Date(),
    };

    // Prepare budget update if the expense is completed
    let budgetUpdate = {};
    if (expense.paymentStatus === "completed") {
      const newTotalSpent =
        (event.budget.totalSpent || 0) + Number(amount);
      const newRemaining = (event.budget.totalAllocated || 0) - newTotalSpent;
      budgetUpdate = {
        "budget.totalSpent": newTotalSpent,
        "budget.remaining": newRemaining,
        "budget.lastUpdatedBy": {
          userId: req.user?._id,
          role: userRole,
          timestamp: new Date(),
        },
      };
    }

    // Create a budget history entry
    const historyEntry = {
      action: "expense_added",
      amount: Number(amount),
      category,
      note: `Added expense: ${title}`,
      performedBy: {
        userId: req.user?._id,
        role: userRole,
      },
      timestamp: new Date(),
    };

    // Update the event: push expense and history; update budget if necessary
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $push: {
          expenses: expense,
          budgetHistory: historyEntry,
        },
        $set: budgetUpdate,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expenses: updatedEvent.expenses,
      budget: updatedEvent.budget,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({
      success: false,
      message: "Error adding expense",
      error: error.message,
    });
  }
};

/**
 * Update expense status.
 * For this simplified model, only the paymentStatus is updated.
 */
export const updateExpenseStatus = async (req, res) => {
  try {
    const { id, expenseId } = req.params;
    const { paymentStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Find the expense to update
    const expense = event.expenses.id(expenseId);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const currentStatus = expense.paymentStatus;
    let newBudgetTotalSpent = event.budget.totalSpent || 0;
    const expenseAmount = expense.amount;

    // If switching from pending to completed, add expense amount
    if (currentStatus === "pending" && paymentStatus === "completed") {
      // Check if budget is sufficient
      if (event.budget.remaining < expenseAmount) {
        return res.status(400).json({
          success: false,
          message:
            "Insufficient budget to mark this expense as completed",
          budget: event.budget,
        });
      }
      newBudgetTotalSpent += expenseAmount;
    }
    // If switching from completed to pending, subtract expense amount
    else if (
      currentStatus === "completed" &&
      paymentStatus === "pending"
    ) {
      newBudgetTotalSpent -= expenseAmount;
    }

    const newRemaining =
      (event.budget.totalAllocated || 0) - newBudgetTotalSpent;

    // Prepare the update operations
    const expenseUpdates = {
      "expenses.$[elem].paymentStatus": paymentStatus,
    };
    // If moving to completed and there was no paidOn date, set it
    if (currentStatus === "pending" && paymentStatus === "completed") {
      expenseUpdates["expenses.$[elem].paidOn"] = new Date();
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $set: {
          ...expenseUpdates,
          "budget.totalSpent": newBudgetTotalSpent,
          "budget.remaining": newRemaining,
          "budget.lastUpdatedBy": {
            userId: req.user?._id,
            role: req.user?.role || "coordinator",
            timestamp: new Date(),
          },
        },
        $push: {
          budgetHistory: {
            action: "expense_updated",
            amount: expenseAmount,
            category: expense.category,
            note: `Updated expense status to ${paymentStatus}`,
            performedBy: {
              userId: req.user?._id,
              role: req.user?.role || "coordinator",
            },
            timestamp: new Date(),
          },
        },
      },
      {
        arrayFilters: [{ "elem._id": expenseId }],
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expenses: updatedEvent.expenses,
      budget: updatedEvent.budget,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({
      success: false,
      message: "Error updating expense",
      error: error.message,
    });
  }
};

/**
 * Delete an expense.
 */
export const deleteEventExpense = async (req, res) => {
  try {
    const { id, expenseId } = req.params;
    const userRole = req.user?.role || "coordinator";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Find the expense to delete
    const expense = event.expenses.id(expenseId);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    let newBudgetTotalSpent = event.budget.totalSpent || 0;
    // Only adjust the budget if the expense status is not pending
    if (expense.paymentStatus !== "pending") {
      newBudgetTotalSpent -= expense.amount;
    }
    const newRemaining =
      (event.budget.totalAllocated || 0) - newBudgetTotalSpent;

    // Create a budget history entry for deletion
    const historyEntry = {
      action: "expense_deleted",
      amount: expense.amount,
      category: expense.category,
      note: `Deleted expense: ${expense.title}`,
      performedBy: {
        userId: req.user?._id,
        role: userRole,
      },
      timestamp: new Date(),
    };

    // Remove the expense and update the budget
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $pull: { expenses: { _id: expenseId } },
        $push: { budgetHistory: historyEntry },
        $set: {
          "budget.totalSpent": newBudgetTotalSpent,
          "budget.remaining": newRemaining,
          "budget.lastUpdatedBy": {
            userId: req.user?._id,
            role: userRole,
            timestamp: new Date(),
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      expenses: updatedEvent.expenses,
      budget: updatedEvent.budget,
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting expense",
      error: error.message,
    });
  }
};

/**
 * Add budget allocation - both admin and coordinator can do this now
 * @route POST /api/events/:id/budget-allocations
 */
export const addBudgetAllocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, notes } = req.body;
    const userRole = req.user?.role || "coordinator";

    if (!mongoose.Types.ObjectId.isValid(id) || !category || !amount) {
      return res.status(400).json({
        success: false,
        message: "Valid event ID, category, and amount are required",
      });
    }

    // Create allocation object with user info
    const allocation = {
      category,
      amount: Number(amount),
      notes,
      createdBy: {
        userId: req.user?._id,
        role: userRole,
      },
      createdAt: new Date(),
    };

    // Create history entry
    const historyEntry = {
      action: "allocated",
      amount: Number(amount),
      category,
      note: `Added budget allocation for ${category}`,
      performedBy: {
        userId: req.user?._id,
        role: userRole,
      },
      timestamp: new Date(),
    };

    // Add allocation and history entry WITHOUT changing the total budget
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $push: {
          budgetAllocations: allocation,
          budgetHistory: historyEntry,
        }
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Budget allocation added successfully",
      allocations: updatedEvent.budgetAllocations,
      budget: updatedEvent.budget,
    });
  } catch (error) {
    console.error("Error adding budget allocation:", error);
    res.status(500).json({
      success: false,
      message: "Error adding budget allocation",
      error: error.message,
    });
  }
};

/**
 * Delete budget allocation - both admin and coordinator can do this now
 * @route DELETE /api/events/:id/budget-allocations/:allocationId
 */
export const deleteBudgetAllocation = async (req, res) => {
  try {
    const { id, allocationId } = req.params;
    const userRole = req.user?.role || "coordinator";

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(allocationId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid event ID and allocation ID are required",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Find the allocation
    const allocation = event.budgetAllocations.id(allocationId);
    if (!allocation) {
      return res.status(404).json({
        success: false,
        message: "Budget allocation not found",
      });
    }

    // Create history entry
    const historyEntry = {
      action: "allocation_deleted",
      amount: allocation.amount,
      category: allocation.category,
      note: `Deleted budget allocation for ${allocation.category}`,
      performedBy: {
        userId: req.user?._id,
        role: userRole,
      },
      timestamp: new Date(),
    };

    // Remove allocation without changing the total budget
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $pull: { budgetAllocations: { _id: allocationId } },
        $push: { budgetHistory: historyEntry },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Budget allocation deleted successfully",
      allocations: updatedEvent.budgetAllocations,
      budget: updatedEvent.budget
    });
  } catch (error) {
    console.error("Error deleting budget allocation:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting budget allocation",
      error: error.message,
    });
  }
};

/**
 * Get event budget summary
 * @route GET /api/events/:id/budget
 */
export const getEventBudgetSummary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    // Populate receipt references when fetching the event
    const event = await Event.findById(id)
      .populate("sponsors.receiptId")
      .populate("expenses.receiptId");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Calculate expense summary by category
    const expensesByCategory = {};
    event.expenses.forEach((expense) => {
      if (!expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] = 0;
      }
      if (expense.paymentStatus === "completed") {
        expensesByCategory[expense.category] += expense.amount;
      }
    });

    // Calculate sponsors by type
    const sponsorsByType = {};
    event.sponsors.forEach((sponsor) => {
      if (!sponsorsByType[sponsor.type]) {
        sponsorsByType[sponsor.type] = 0;
      }
      sponsorsByType[sponsor.type] += sponsor.amount;
    });
    
    // Use the already populated arrays directly
    const sponsors = event.sponsors;
    const expenses = event.expenses;

    res.status(200).json({
      success: true,
      budget: event.budget,
      sponsors: sponsors,
      expenses: expenses,
      budgetAllocations: event.budgetAllocations,
      budgetHistory: event.budgetHistory,
      summary: {
        expensesByCategory,
        sponsorsByType,
        totalSponsors: event.sponsors.length,
        totalExpenses: event.expenses.length,
        pendingExpenses: event.expenses.filter(
          (e) => e.paymentStatus === "pending"
        ).length,
      },
    });
  } catch (error) {
    console.error("Error fetching budget summary:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching budget summary",
      error: error.message,
    });
  }
};

/**
 * Update event gallery (add/remove images)
 * @route PATCH /api/events/:id/gallery
 */
export const updateEventGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { imagesToAdd = [], imagesToRemove = [] } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    // Find event
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Validate image IDs
    const validImagesToAdd = imagesToAdd.filter((img) =>
      mongoose.Types.ObjectId.isValid(img)
    );

    const validImagesToRemove = imagesToRemove.filter((img) =>
      mongoose.Types.ObjectId.isValid(img)
    );

    // Process updates
    let updateOperations = {};

    if (validImagesToAdd.length > 0) {
      updateOperations.$addToSet = {
        eventGallery: { $each: validImagesToAdd },
      };
    }

    if (validImagesToRemove.length > 0) {
      updateOperations.$pull = {
        eventGallery: { $in: validImagesToRemove },
      };
    }

    if (Object.keys(updateOperations).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid gallery operations specified",
      });
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(id, updateOperations, {
      new: true,
    }).populate("eventGallery");

    res.status(200).json({
      success: true,
      message: "Event gallery updated successfully",
      gallery: updatedEvent.eventGallery,
    });
  } catch (error) {
    console.error("Error updating event gallery:", error);
    res.status(500).json({
      success: false,
      message: "Error updating event gallery",
      error: error.message,
    });
  }
};

/**
 * Get event gallery
 * @route GET /api/events/:id/gallery
 */
export const getEventGallery = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(id).populate("eventGallery");
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      gallery: event.eventGallery || [],
    });
  } catch (error) {
    console.error("Error fetching event gallery:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching event gallery",
      error: error.message,
    });
  }
};

/**
 * Delete sponsor from event - both admin and coordinator can do this
 * @route DELETE /api/events/:id/sponsors/:sponsorId
 */
export const deleteEventSponsor = async (req, res) => {
  try {
    const { id, sponsorId } = req.params;
    const userRole = req.user?.role || "coordinator";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Find the sponsor
    const sponsor = event.sponsors.id(sponsorId);
    if (!sponsor) {
      return res.status(404).json({
        success: false,
        message: "Sponsor not found",
      });
    }

    // Create history entry
    const historyEntry = {
      action: "sponsor_deleted",
      amount: sponsor.amount,
      note: `Deleted sponsor: ${sponsor.name}`,
      performedBy: {
        userId: req.user?._id,
        role: userRole,
      },
      timestamp: new Date(),
    };

    // Prepare update operation - only adjust budget if sponsor status is not pending
    const updateOperation = {
      $pull: { sponsors: { _id: sponsorId } },
      $push: { budgetHistory: historyEntry }
    };

    // Only deduct from budget if sponsor status is not pending
    if (sponsor.receivedStatus !== "pending") {
      updateOperation.$inc = {
        "budget.totalAllocated": -sponsor.amount,
        "budget.remaining": -sponsor.amount,
      };
    }

    // Remove sponsor and adjust budget if needed
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateOperation,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Sponsor deleted successfully",
      sponsors: updatedEvent.sponsors,
      budget: updatedEvent.budget,
    });
  } catch (error) {
    console.error("Error deleting sponsor:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting sponsor",
      error: error.message,
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
  linkGuestToEvent,
  updateEventBudget,
  addEventSponsor,
  addEventExpense,
  updateExpenseStatus,
  deleteEventExpense,
  addBudgetAllocation,
  deleteBudgetAllocation,
  getEventBudgetSummary,
  updateEventGallery,
  getEventGallery,
  updateReceiptId, // not used
};
