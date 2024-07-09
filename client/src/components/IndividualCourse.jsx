// IndividualCourse.js

// Import React and necessary modules
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSchedule,
  allInstructors,
  getCourseName,
  addSchedule,
  checkAvailable,
} from "../utils/APIRoutes";
import axios from "axios";

// Define color schemes

const ivoryCream = "black";
const darkGray = "#333333";


// Styled components with color schemes
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  height: 100vh;
  background-color: white
`;

const TopBar = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
`;

const CourseName = styled.h1`
  margin-bottom: 20px;
  color: ${ivoryCream};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

const CardList = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
`;

const NoScheduleMessage = styled.p`
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: black;
`;

const Card = styled.div`

  border: 1px solid #ccc;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 20px;
  width: calc(45% - 20px);
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: scale(1.06);
  }

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
  }

  .card-content {
    padding: 10px;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 20px;
  }

  p {
    margin-bottom: 5px;
    font-size: 16px;
  }
`;

const Form = styled.form`
  width: 45%;
  background-color: black;
  color: white;
  border: 1px solid transparent;
  border-radius: 15px;
  text-align: center;
  padding: 20px;

  select,
  input {
    margin: 10px 0;
    padding: 10px;
    width: calc(100% - 20px);
    border-radius: 5px;
    border: 1px solid ${darkGray};
    box-sizing: border-box;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    background-color: white;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

   
  }
`;

// IndividualCourse component
const IndividualCourse = () => {
  // Hooks for managing state
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [dropDropUser, setDropUser] = useState(undefined);
  const [id, setId] = useState(null);
  const [courseName, setCourseName] = useState("Dummy Course");
  const [instructorData, setInstructorData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [schedule, setSchedule] = useState([]);

  // Keys for local storage
  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  // Effect hook to check user authentication
  useEffect(() => {
    if (adminKey) {
      const adminUserData = JSON.parse(adminKey);
      setId(adminUserData._id);
    } else if (userKey) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, [navigate, adminKey, userKey]);

  // Function to update instructor data
  const updateInstructorData = (instructor) => {
    const existingInstructor = instructorData.find(
      (i) => i === instructor.username
    );
    if (!existingInstructor) {
      setInstructorData((prevData) => [...prevData, instructor.username]);
    }
  };

  // Function to get course name by ID
  const getCourseNameById = async (courseId) => {
    try {
      const response = await axios.get(`${getCourseName}/${courseId}`);
      return response.data.courseName;
    } catch (error) {
      console.error("Error fetching course name:", error);
      return null;
    }
  };

  // Effect hook to fetch course name
  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        if (courseId) {
          setCourseName(await getCourseNameById(courseId));
        }
      } catch (error) {
        console.error("Error fetching course name:", error);
      }
    };
    fetchCourseName();
  }, [courseId]);

  // Effect hook to fetch instructors
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (id) {
          const response = await axios.get(`${allInstructors}/${id}`);
          const fetchedInstructors = response.data;
          fetchedInstructors.forEach(updateInstructorData);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [id]);

  // State for lecture data
  const [lectureData, setLectureData] = useState({
    instructor: "",
    date: "",
    subject: "", // Set to the first subject by default
    lecture: "",
    location: "",
  });

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Event handler for instructor selection
  const handleInstructorSelection = (e) => {
    const selectedInstructor = e.target.value;
    setDropUser(selectedInstructor);
    setSelectedInstructor(selectedInstructor);
  };

  // Effect hook for instructor selection
  useEffect(() => {}, [setDropUser]);

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const course = courseName;
    const scheduleData = {
      course: course,
      lecture: lectureData.lecture,
      date: lectureData.date,
      instructor: dropDropUser,
      location: lectureData.location,
    };
    // Check instructor availability
    try {
      const availabilityCheckResponse = await axios.post(
        checkAvailable,
        {
          username: dropDropUser, // Assuming dropDropUser is the instructor's ID
          date: lectureData.date,
        }
      );

      if (availabilityCheckResponse.status === 200) {
        // Instructor is available, proceed to add schedule
        const response = await axios.post(addSchedule, scheduleData);
        console.log("Schedule added successfully:", response.data);
      } else {
        // Instructor is busy, show an error message
        console.error("Instructor is busy on this date.");
        // You may want to display an error message to the user
      }
    } catch (error) {
      console.error("Error checking instructor availability:", error);
    }

    setLectureData({
      instructor: "",
      date: "",
      subject: "",
      lecture: "",
      location: "",
    });
  };

  // Effect hook to fetch schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getSchedule, {
          params: { courseName },
        });
        setSchedule(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
      }
    };
    fetchSchedules();
  }, [courseName, dropDropUser, handleSubmit]);

  // JSX for rendering the component
  return (
    <Container>
      <TopBar>
        <Logout />
        <CourseName>{courseName}</CourseName>
        <Heading>Welcome admin</Heading>
      </TopBar>
      <ContentWrapper>
        {schedule.length === 0 ? (
          <NoScheduleMessage>No lectures scheduled.</NoScheduleMessage>
        ) : (
          <CardList>
            {schedule.map((scheduleItem, index) => (
              <Card key={index}>
                <div className="card-content">
                  <h2>Lecture: {scheduleItem.lecture}</h2>
                  <p>Instructor: {scheduleItem.instructor}</p>
                  <p>
                    Date: {new Date(scheduleItem.date).toLocaleDateString()}
                  </p>
                  <p>Location: {scheduleItem.location}</p>
                </div>
              </Card>
            ))}
          </CardList>
        )}

        {/* Form for scheduling a lecture */}
        <Form onSubmit={handleSubmit}>
          <h2>Schedule a Lecture</h2>
          <select
            name="instructor"
            value={selectedInstructor}
            onChange={handleInstructorSelection}
            required
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructorData.map((instructor, index) => (
              <option key={index} value={instructor}>
                {instructor}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={lectureData.date}
            onChange={handleChange}
            required
          />
          <select
            name="subject"
            value={lectureData.subject}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            <option>{courseName}</option>
          </select>
          <input
            type="text"
            name="lecture"
            placeholder="Lecture"
            value={lectureData.lecture}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={lectureData.location}
            onChange={handleChange}
            required
          />
          <button type="submit">Schedule Lecture</button>
        </Form>
      </ContentWrapper>
    </Container>
  );
};

// Export the IndividualCourse component
export default IndividualCourse;
