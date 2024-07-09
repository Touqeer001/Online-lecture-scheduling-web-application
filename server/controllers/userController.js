const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      isAdmin,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};

module.exports.allInstructors = async (req, res, next) => {
  try {
    // useful to get all lecture data
    //After executing this query, the users variable will contain an array of user objects, each containing the specified fields (email, username, avatarImage, and _id).
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.json({ msg: "User id is required " });
    }
    // localStorage.clear();
    // onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

// -------------------------------------------------------------------
const Course = require("../models/courseModel");

module.exports.addCourse = async (req, res, next) => {
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

module.exports.getCourse = async (req, res, next) => {
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

module.exports.getCourseName = async (req, res, next) => {
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

// schedule
const CourseSchedule = require("../models/scheduleModel");

module.exports.addSchedule = async (req, res, next) => {
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

module.exports.getSchedule = async (req, res, next) => {
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

module.exports.getUserSchedule = async (req, res, next) => {
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
module.exports.checkAvailable = async (req, res, next) => { 
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