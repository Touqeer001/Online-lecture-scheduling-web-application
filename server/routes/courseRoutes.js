import express from "express";
const router = express.Router();
import {
  addCourse,
  getCourse,
  getCourseName,
} from "../controllers/courseControllers.js";


router.post("/addcourse", addCourse);
router.get("/getcourse", getCourse);
router.get("/getcoursename/:courseId", getCourseName);

export default router;
