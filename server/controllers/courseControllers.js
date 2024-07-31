

import Course from "../models/courseModel.js";


export const addCourse = async (req, res, next) => {
  try {
    // Extract course data from the request body
    const { name, level, description, image } = req.body;

    // Create a new course instance using the Course model
    const newCourse = new Course({
      name,
      level,
      description,
      image,
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Send a response indicating successful course creation
    return res.json({ status: true, savedCourse });
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    next(error);
  }
};

export const  getCourse = async (req, res, next) => {
  try {
    // Retrieve the list of courses from the database
    const courses = await Course.find();

    // Send the list of courses as a response
    return res.json({ status: true, courses });
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    next(error);
  }
};

export const getCourseName = async (req, res, next) => {
  try {
    const { courseId } = req.params; // Change this line to use req.params instead of req.body

    // Rest of the code remains the same
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.json({ courseName: course.name });
  } catch (error) {
    next(error);
  }
};
