import express from "express";
import {
  getCustomMembers,
  addCustomMember,
  updateCustomMember,
  deleteCustomMember,
} from "../../controller/community/customMemberController.js";

const router = express.Router();

router.get("/", getCustomMembers);
router.post("/add", addCustomMember);
router.put("/:id", updateCustomMember);
router.delete("/:id", deleteCustomMember);

export default router;
