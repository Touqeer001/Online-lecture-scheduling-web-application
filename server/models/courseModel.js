
import mongoose from "mongoose";

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


export default mongoose.model("Course", CourseSchema);
