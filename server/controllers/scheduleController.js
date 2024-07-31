// schedule
import CourseSchedule from "../models/scheduleModel.js";

export const addSchedule = async (req, res, next) => {
  try {
    const { course, lecture, date, instructor, location } = req.body;

    // Create a new schedule document
    const newSchedule = new CourseSchedule({
      course,
      lecture,
      date: new Date(date), // Convert date string to Date object
      instructor,
      location,
    });

    // Save the new schedule to the database
    const savedSchedule = await newSchedule.save();

    // Respond with the saved schedule
    res.status(201).json(savedSchedule);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const CourseSchedule = require("../models/scheduleModel");
export const getSchedule = async (req, res, next) => {
  try {
    const { courseName } = req.query;

    // Validate if courseName is provided
    if (!courseName) {
      return res.status(400).json({ error: "Course name is required." });
    }

    // Assuming you have some endpoint to fetch schedules
    const schedules = await CourseSchedule.find({ course: courseName });

    // Send the fetched schedule data in the response
    res.status(200).json({ schedules });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserSchedule = async (req, res, next) => {
  try {
    const { currUser } = req.query;
    if (!currUser) {
      return res.status(400).json({ error: "No user is here! To display" });
    }

    // Assuming you have some endpoint to fetch schedules
    const schedules = await CourseSchedule.find({ instructor: currUser });
    // Send the fetched schedule data in the response
    res.status(200).json({ schedules });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Assuming you have a route like this
export const checkAvailable = async (req, res, next) => { 
  const { username, date } = req.body;

  try {
    const existingSchedule = await CourseSchedule.findOne({
      instructor: username,
      date: new Date(date),
    });

    if (existingSchedule) {
      return res
        .status(409)
        .json({ error: "Instructor is already busy on this date." });
    }

    return res
      .status(200)
      .json({ message: "Instructor is available on this date." });
  } catch (error) {
    console.error("Error checking instructor availability:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}