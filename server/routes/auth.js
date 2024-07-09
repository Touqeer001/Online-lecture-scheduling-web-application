const {
  register,
  login,
  allInstructors,
  logOut,
  addCourse,
  getCourse,
  getCourseName,
  addSchedule,
  getSchedule,
  getUserSchedule,
  checkAvailable,
} = require("../controllers/userController");

const router = require("express").Router();

// authentication
router.post("/register", register);
router.post("/login", login);
router.get("/allinstructors/:id", allInstructors);
router.get("/logout/:id", logOut);

// courses
router.post("/addcourse", addCourse);
router.get("/getcourse", getCourse);
router.get("/getcoursename/:courseId", getCourseName);

// schedule
router.post("/addschedule", addSchedule);
router.get("/getschedule", getSchedule);
router.get("/getuserschedule", getUserSchedule);
router.post("/checkInstructorAvailability", checkAvailable);

module.exports = router;
