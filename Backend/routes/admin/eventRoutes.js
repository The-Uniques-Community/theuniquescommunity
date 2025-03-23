import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addEventMembers,
  removeEventMembers,
  addEventGuests,
  updateEventStatus,
  getEventsByStatus
} from '../../controller/events/eventController.js';

const eventRouter = express.Router();

// Base routes
eventRouter.post('/', createEvent);
eventRouter.get('/', getAllEvents);
eventRouter.get('/:id', getEventById);
eventRouter.put('/:id', updateEvent);
eventRouter.delete('/:id', deleteEvent);

// Member management
eventRouter.patch('/:id/members', addEventMembers);
eventRouter.patch('/:id/members/remove', removeEventMembers);

// Guest management
eventRouter.patch('/:id/guests', addEventGuests);

// Status management
eventRouter.patch('/:id/status', updateEventStatus);
eventRouter.get('/status/:status', getEventsByStatus);

export default eventRouter;