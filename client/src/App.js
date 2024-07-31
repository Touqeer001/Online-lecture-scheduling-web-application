import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./components/admin/Admin";
import Main from "./pages/Main";
import ErrorPage from "./components/ErrorPage";
import Instructor from "./components/user/Instructor";
import IndividualCourse from "./components/IndividualCourse";
import IndividualInstructor from "./components/admin/IndividualInstructor";
export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route
          path="/individualcourse/:courseId"
          element={<IndividualCourse />}
        />
        <Route
          path="/individualinstructor/:username"
          element={<IndividualInstructor />}
        />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
