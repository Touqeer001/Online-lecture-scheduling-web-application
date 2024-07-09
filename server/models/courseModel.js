const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: false,
  },
  level: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  description: {
    type: String,
    required: true,
    min: 8,
  },
  image: {
    type: String, // url for image
  },
});

module.exports = mongoose.model("Course", CourseSchema);
