import React from "react";
import styled from "styled-components";
import Logout from "../Logout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Instructors from "./Instructors";
import Courses from "./CoursesAdmin";
import IndividualCourse from "../IndividualCourse";

export default function Welcome({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <WelcomeContainer>
      <TopBar>
        <Logout />
        <Heading> Welcome Admin</Heading>
      </TopBar>
      <MainContent>
        <InstructorsContainer>
          <Instructors user={user} />
        </InstructorsContainer>
        <CoursesContainer>
          <Courses user={user} />
        </CoursesContainer>
      </MainContent>
    </WelcomeContainer>
  );
}



const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 100%;
  width: 100%;
`;

const InstructorsContainer = styled.div`
  width: 40%;

  padding: 1rem;
  border-radius: 0.5rem;
`;

const CoursesContainer = styled.div`
  width: 60%;

  color: #333333; /* Dark Gray */
  padding: 1rem;
  border-radius: 0.5rem;
`;

const TopBar = styled.div`
  width: 100%;
 

  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  // color: black;
  // font-size: 25px;
  // font-weight: bold;
  // margin-top: 8px;
  // border-radius: 50%;
  // border: 5px solid black;

   background-color: black; /* Dodger Blue */
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  font-weight: bold;

  border-radius: 0.6rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  

`;

