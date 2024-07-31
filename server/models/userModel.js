import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default value is false, change as needed
  },
});


export default mongoose.model("Users", userSchema);