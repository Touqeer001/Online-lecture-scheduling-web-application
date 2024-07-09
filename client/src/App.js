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
    /*
    I've utilized React Router to manage navigation in our application. The main structure is wrapped in a <BrowserRouter> component, which provides the necessary context for routing. Inside that, I've defined different routes using the <Routes> component.

    For user authentication and entry points, I've set up specific routes:

    Login (/login): When users navigate to '/login', the <Login /> component is rendered, allowing them to log in.

    Register (/register): Similarly, the '/register' route is configured to render the <Register /> component, facilitating user registration.

    Main Page (/): The default route, '/', renders the <Chat /> component. This is the main page where users interact with the chat application.*/
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
