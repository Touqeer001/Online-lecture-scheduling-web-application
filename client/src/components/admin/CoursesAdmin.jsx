import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { addCourse, getCourse } from "../../utils/APIRoutes";
import axios from "axios";

const Container = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;
   justify-content: space-between;
   overflow-y: auto;
   max-height: 480px;
  
`;

const Form = styled.form`
   width: 70%;
    background-color: #2c3e50;
   color: white;
  border: 1px solid transparent;
   border-radius: 15px;
  margin: 1rem;
   text-align: center;
  padding: 20px;

  input,
  select {
    margin: 10px 0;
    padding: 10px;
    width: calc(100% - 20px);
    border-radius: 5px;
    border: 1px solid #ccc;
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

const CardList = styled.div`
   width: 90%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 20px;
  width: 45%;
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
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

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const CoursesAdmin = ({ user }) => {
  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });
  const [courses, setCourses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(addCourse, { ...courseData });
      setCourseData({
        name: "",
        level: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(getCourse);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [courseData, user]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Add a Course</h1>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={courseData.name}
          onChange={handleChange}
          required
        />
        <select
          name="level"
          value={courseData.level}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>
            Select Level
          </option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={courseData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={courseData.image}
          onChange={handleChange}
        />
        <button type="submit">Add Course</button>
      </Form>

      <CardList>
        {courses.map((course) => (
          <Card key={course._id}>
            <CardLink
              to={{
                pathname: `/individualcourse/${course._id}`, // Update this path
              }}
            >
              <img src={course.image} alt={course.name} />
              <div className="card-content">
                <h2>{course.name}</h2>
                <p>Level: {course.level}</p>
                <p>{course.description}</p>
              </div>
            </CardLink>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default CoursesAdmin;
