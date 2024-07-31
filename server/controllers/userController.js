// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");

// module.exports.login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return res.json({ status: true, user: userWithoutPassword });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.register = async (req, res, next) => {
//   try {
//     const { username, email, password, isAdmin } = req.body;
//     const usernameCheck = await User.findOne({ username });
//     if (usernameCheck) {
//       return res.json({ msg: "Username already used", status: false });
//     }
//     const emailCheck = await User.findOne({ email });
//     if (emailCheck) {
//       return res.json({ msg: "Email already used", status: false });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       email,
//       username,
//       password: hashedPassword,
//       isAdmin,
//     });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const register = async (req, res, next) => {
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
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    return res.json({ status: true, user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    next(error); // Call next with the error to ensure it gets handled properly
  }
};

// module.exports.allInstructors = async (req, res, next) => {
//   try {
//     // useful to get all lecture data
//     //After executing this query, the users variable will contain an array of user objects, each containing the specified fields (email, username, avatarImage, and _id).
//     const users = await User.find({ _id: { $ne: req.params.id } }).select([
//       "email",
//       "username",
//       "_id",
//     ]);
//     return res.json(users);
//   } catch (ex) {
//     next(ex);
//   }
// };

export const allInstructors = async (req, res, next) => {
  try {
    // Useful to get all lecture data
    // After executing this query, the users variable will contain an array of user objects,
    // each containing the specified fields (email, username, and _id).
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

export const logOut = (req, res, next) => {
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
