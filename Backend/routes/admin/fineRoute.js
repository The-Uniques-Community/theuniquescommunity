import express from "express";
import { 
  searchMembers,
  imposeFine,
  clearFine,
  getFineHistory
} from "../../controller/admin/fineController.js";

const fineRouter = express.Router();

// Search members route
fineRouter.get("/search", searchMembers);

// Fine management routes
fineRouter.post("/:memberId/impose", imposeFine);
fineRouter.post("/:memberId/clear", clearFine);
fineRouter.get("/:memberId/history", getFineHistory);

export default fineRouter;