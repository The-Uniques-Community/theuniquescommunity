import express from 'express';
import { register, login, logout, editProfile, getProfile, uploadDummyMembers} from '../../controller/member/memberController.js';
import { updateMemberFines } from '../../controller/member/members.js';
const memberRoute = express.Router()
import Member from '../../models/member/memberModel.js';
memberRoute.post('/register', register);
memberRoute.post('/login', login);
memberRoute.post('/logout', logout);
memberRoute.post('/editProfile', editProfile);
memberRoute.post('/getProfile', getProfile);
memberRoute.post('/bulk-upload', uploadDummyMembers)
memberRoute.post("/update-fine-data", async (req, res) => {
    try {
      const result = await updateMemberFines(Member);
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

export default memberRoute;