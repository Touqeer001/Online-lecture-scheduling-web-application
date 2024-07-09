import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "./Main.css";

const Main = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, []);

  return (
    

    <div className="row registers">
      <div className="col-md-6">
        <img id="image" src="image\main.jpg" alt="Login"></img>
      </div>

      <div className="col-md-4 registerBorder">
        <div className="registers">
          <div className="mb-3">
            {/* <MainContainer> */}
            <Overlay>
              <Message>Welcome to Online Lecture Schedule</Message>
              <ButtonContainer>
                <Button onClick={handleLoginClick}>Login</Button>
                <Message>Create an Account,Click Register</Message>
                <Button onClick={handleRegisterClick}>Register</Button>
              </ButtonContainer>
            </Overlay>
            {/* </MainContainer> */}
          </div>
        </div>
      </div>
    </div>
  );
};



const Overlay = styled.div`
  background:  #282c34;;
  border-radius: 10px;
  margin-top: 60px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Message = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  padding: 15px;
 
  background-color: #434343a4
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

 
`;

export default Main;
