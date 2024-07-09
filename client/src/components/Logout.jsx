import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    let id;
    if (localStorage.getItem("secret-key") != null) {
      id = await JSON.parse(localStorage.getItem("secret-key"))._id;
    } else if (localStorage.getItem("secret-key-admin") != null) {
      id = await JSON.parse(localStorage.getItem("secret-key-admin"))._id;
    }

    const data = await axios.get(`${logoutRoute}/${id}`);

    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return <StyledLogoutButton onClick={handleClick}>Logout</StyledLogoutButton>;
}

const StyledLogoutButton = styled.button`
  background-color: black; /* Dodger Blue */
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.6rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

 
`;
