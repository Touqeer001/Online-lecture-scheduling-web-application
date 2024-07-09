import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";
import styled from "styled-components";

export default function Admin() {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("secret-key-admin")) {
          navigate("/login");
        } else {
          const storedUser = JSON.parse(
            localStorage.getItem("secret-key-admin")
          );
          setUser(storedUser);
          // console.log("user hai bhai ", storedUser);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <>
      <Container>
        <div className="container">
          <Welcome user={user} />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
   height: 100vh;
   width: 1vw;
  
   .container {
     height: 85vh;
     width: 85vw;
    
     display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
