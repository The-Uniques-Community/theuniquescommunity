import {listNewEvent, blockMember, imposeFine, unblockMember, approveProfile , createAdmin} from '../../controller/admin/adminControllers.js';
import express from 'express';
const adminRoute = express.Router();


adminRoute.post('/approveProfile', approveProfile);
adminRoute.post('/blockMember', blockMember);
adminRoute.post('/unblockMember', unblockMember);
adminRoute.post('/imposeFine', imposeFine);
adminRoute.post('/listNewEvent', listNewEvent);
adminRoute.post('/createAdmin', createAdmin);

export default adminRoute;