import express from 'express';
import { register, login, logout, editProfile, getProfile } from '../../controller/member/memberController.js';

const memberRoute = express.Router()

memberRoute.post('/register', register);
memberRoute.post('/login', login);
memberRoute.post('/logout', logout);
memberRoute.post('/editProfile', editProfile);
memberRoute.post('/getProfile', getProfile);

export default memberRoute;