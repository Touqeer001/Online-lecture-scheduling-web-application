import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { allInstructors } from "../../utils/APIRoutes";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: 530px;
 
`;

const Heading = styled.h1`
  font-size: 36px;
  margin: 20px;
  color:black;
padding: 15px;
  border-radius: 10px;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  width: 92%;
`;

const CardList = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
`;

const Card = styled.div`

  
  border: 1px solid black;
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 0px;
  width: 35%;
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

const InstructorName = styled.h3`
  color: #010101;
  font-size: 25px;
  /* margin: 8px; */
  text-align: center;
`;

export default function Instructors({ user }) {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (user) {
          const response = await axios.get(`${allInstructors}/${user._id}`);
          setInstructors(response.data);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [user]);

  return (
    <Container>
      <Heading>All Instructors Name :</Heading>
      <CardList>
        {instructors.map((instructor) => (
          <Card key={instructor._id}>
            <CardLink
              to={{
                pathname: `/individualinstructor/${instructor.username}`,
                state: { instructorUsername: instructor.username }, 
              }}
            >
             
              <div className="card-content">
              
                <InstructorName>{instructor.username}</InstructorName>
             
              </div>
            </CardLink>
          </Card>
        ))}
      </CardList>
    </Container>
  );
}
