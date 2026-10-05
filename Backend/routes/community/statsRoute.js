import express from "express";
import { getStats, updateStats } from "../../controller/community/statsController.js";

const router = express.Router();

router.get("/", getStats);
router.post("/update", updateStats);
router.put("/update", updateStats);

export default router;
