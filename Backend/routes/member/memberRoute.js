import {getProfile, login, register, editProfile, logout} from '../../controller/member/memberController'

const memberRouter = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/editProfile', editProfile);
router.post('/getProfile', getProfile);

module.exports = memberRouter;