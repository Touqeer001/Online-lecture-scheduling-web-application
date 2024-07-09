import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import { getUserSchedule } from "../../utils/APIRoutes";
import axios from "axios";

import loaderImage from "../../assets/loader.gif";
import { useParams } from "react-router-dom";

const IndividualInstructor = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [currUser, setCurrUser] = useState(undefined);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminKey = localStorage.getItem("secret-key-admin");

  useEffect(() => {
    if (!adminKey) {
      localStorage.clear();
      navigate("/");
    }
  }, [adminKey, navigate]);

  useEffect(() => {
    // Set currUser using the extracted 'name' parameter
    setCurrUser(username);

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getUserSchedule, {
          params: { currUser: username }, // Use 'name' instead of 'currUser' in the params
        });
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [currUser, navigate]); // Include 'name' in the dependency array

  if (loading) {
    return (
      <LoaderContainer>
        <LoaderImage src={loaderImage} alt="Loading..." />
      </LoaderContainer>
    );
  }

  return (
    <WelcomeContainer>
      <TopBar>
        <Logout />
        <Heading>Welcome Admin</Heading>
      </TopBar>
      <MainContent>
        <LecturesContainer>
          <SectionHeading>Upcoming Lectures For {currUser}</SectionHeading>
          <ScrollableContent>
            {schedules.map((schedule, index) => (
              <LectureCard key={index}>
                <CardHeading>Course:</CardHeading>
                <CourseContent>{schedule.course}</CourseContent>

                <CardHeading>Lecture:</CardHeading>
                <LectureContent>{schedule.lecture}</LectureContent>

                <CardHeading>Date:</CardHeading>
                <DateContent>
                  {new Date(schedule.date).toLocaleDateString()}
                </DateContent>

                <CardHeading>Location:</CardHeading>
                <LocationContent>{schedule.location}</LocationContent>
              </LectureCard>
            ))}
          </ScrollableContent>
        </LecturesContainer>
      </MainContent>
    </WelcomeContainer>
  );
};

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderImage = styled.img`
  width: 80px; /* Adjust the width as needed */
  height: 80px; /* Adjust the height as needed */
`;

// ... (import statements remain the same)

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0a0303; /* Charcoal Plum */
  padding-bottom: 1rem;
`;

const TopBar = styled.div`
  width: 100%;
  //  background: #eadce6; /* Satin Pearl */
  padding: 25px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: white; /* White */
  font-size: 36px;
  font-weight: bold;
  margin-top: 10px;
`;

const LecturesContainer = styled.div`
  width: 100%;
  // background-color:white;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-around;
  gap: 1rem;
  max-height: 450px;
  overflow-y: auto;
`;

const LectureCard = styled.div`
  background-color: white; /* Deep Burgundy */
  border-radius: 15px;
  padding: 25px; /* Increased padding */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 20%; /* Reduced width */
  box-sizing: border-box;
`;

const SectionHeading = styled.h2`
  color: white;
  font-size: 24px;
  margin: 15px;
`;

const CardHeading = styled.h3`
  color: black;
  font-size: 25px; /* Increased font size */
  margin-bottom: 10px; /* Increased margin */
`;

const CardContent = styled.p`
  margin-bottom: 15px;
  font-size: 18px; /* Increased font size */
  color: black;
`;

// Apply unique styles for each card content
const CourseContent = styled(CardContent)`
  color: black;
  font-weight: bold;
  font-size: 25px; /* Increased font size */
`;

const LectureContent = styled(CardContent)`
  color: #000000; /* Ivory Lace */
  font-style: italic;
  font-size: 25px; /* Increased font size */
  font-weight: bold;
`;

const DateContent = styled(CardContent)`
  color: #d4a2b0; /* Mauve Mist */
  font-weight: bold;
  font-size: 25px; /* Increased font size */
`;

const LocationContent = styled(CardContent)`
 color: black; 
  font-size: 16px; /* Adjusted font size */
`;

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding: 10px;
  overflow: hidden;
  width: 100%;
`;

export default IndividualInstructor;
