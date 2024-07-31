// const {
//   register,
//   login,
//   allInstructors,
//   logOut,
// } = require("../controllers/userController.js");

import {
  register,
  login,
  allInstructors,
  
  logOut,
} from "../controllers/userController.js";

import express from "express";
const router = express.Router();

// authentication
router.post("/register", register);
router.post("/login", login);
router.get("/allinstructors/:id", allInstructors);
router.get("/logout/:id", logOut);

export default router;
