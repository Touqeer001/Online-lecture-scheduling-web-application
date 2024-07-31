import express from "express";
const router = express.Router();
import {
  addSchedule,
  getSchedule,
  getUserSchedule,
  checkAvailable,
} from "../controllers/scheduleController.js";


// schedule
router.post("/addschedule", addSchedule);
router.get("/getschedule", getSchedule);
router.get("/getuserschedule", getUserSchedule);
router.post("/checkInstructorAvailability", checkAvailable);

export default router;
