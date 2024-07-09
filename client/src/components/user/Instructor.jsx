import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import { getUserSchedule } from "../../utils/APIRoutes";
import axios from "axios";

import loaderImage from "../../assets/loader.gif";

const Instructor = ({}) => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(undefined);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      navigate("/admin");
    } else if (userKey) {
      setCurrUser(JSON.parse(userKey).username);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getUserSchedule, {
          params: { currUser },
        });
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
        console.log("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [currUser, navigate, schedules]);

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
        <Heading>Welcome {currUser}</Heading>
      </TopBar>
      <MainContent>
        <LecturesContainer>
          <SectionHeading>Your Upcoming Lectures</SectionHeading>
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

  padding-bottom: 1rem;
`;

const TopBar = styled.div`
  width: 100%;
  
  padding: 25px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: black; /* White */
  font-size: 36px;
  font-weight: bold;
  margin-top: 40px;
`;

const LecturesContainer = styled.div`
  width: 100%;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  max-height: 450px;
  overflow-y: auto;
`;

const LectureCard = styled.div`

  border-radius: 30px;
  padding: 20px; /* Increased padding */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
 margin-top: 0px;
  width: 30%; /* Reduced width */
  box-sizing: border-box;
`;

const SectionHeading = styled.h2`
  color: black; 
  font-size: 24px;
  margin-bottom: 15px;

`;

const CardHeading = styled.h3`
  color: black; /* White */
  font-size: 30px;
  margin-bottom: 1px; /* Increased margin */
  font-weight: bold;
`;

const CardContent = styled.p`
  margin-bottom: 15px;
  font-size: 18px; /* Increased font size */
  color: #c0c0c0; /* Silver Mist */
`;

// Apply unique styles for each card content
const CourseContent = styled(CardContent)`

  font-weight: bold;
  font-size: 25px; /* Increased font size */
`;

const LectureContent = styled(CardContent)`
  color: black; /* Ivory Lace */
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
  font-size: 20px; /* Adjusted font size */
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

export default Instructor;
