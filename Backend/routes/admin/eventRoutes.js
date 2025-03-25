import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addEventMembers,
  removeEventMembers,
  updateEventStatus,
  getEventsByStatus,
  submitFormResponse,
  getEventFormResponses,
  updateFormResponseStatus,
  linkGuestToEvent
} from '../../controller/events/eventController.js';
import  verifyRole  from '../../middlewares/verifyRole.js';
import  verifyToken  from '../../middlewares/verifyToken.js';

const eventRouter = express.Router();

// Public routes (no auth required)
eventRouter.get('/', getAllEvents);
eventRouter.get('/:id', getEventById);
eventRouter.get('/status/:status', getEventsByStatus);

// Form response submission - public or authenticated
eventRouter.post('/:eventId/form-response', submitFormResponse);

// Protected routes (authentication required)
// Admin/Coordinator only routes - using verifyRole middleware
eventRouter.post('/', verifyToken ,  verifyRole(['admin', 'coordinator']), createEvent);
eventRouter.put('/:id',verifyToken , verifyRole(['admin', 'coordinator']), updateEvent);
eventRouter.delete('/:id',verifyToken , verifyRole(['admin', 'coordinator']), deleteEvent);

// Member management - admin/coordinator only
eventRouter.patch('/:id/members', verifyToken ,verifyRole(['admin', 'coordinator']), addEventMembers);
eventRouter.patch('/:id/members/remove', verifyToken ,verifyRole(['admin', 'coordinator']), removeEventMembers);

// Status management - admin/coordinator only
eventRouter.patch('/:id/status', verifyToken ,verifyRole(['admin', 'coordinator']), updateEventStatus);

// Form responses - admin/coordinator only
eventRouter.get('/:eventId/form-responses',verifyToken , verifyRole(['admin', 'coordinator']), getEventFormResponses);
eventRouter.patch('/form-responses/:responseId/status', verifyToken ,verifyRole(['admin', 'coordinator']), updateFormResponseStatus);

// Guest-event linking - admin/coordinator only
eventRouter.post('/link-guest',verifyToken , verifyRole(['admin', 'coordinator']), linkGuestToEvent);

export default eventRouter;