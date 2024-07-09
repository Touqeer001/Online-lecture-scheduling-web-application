const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  lecture: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    // Remove the unique constraint
  },
  date: {
    type: Date,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
