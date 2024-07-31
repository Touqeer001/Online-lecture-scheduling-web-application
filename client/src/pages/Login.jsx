import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "admin", password: '1234'});
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        if (data.user.isAdmin) {
          localStorage.setItem("secret-key-admin", JSON.stringify(data.user));
          navigate("/admin");
        } else {
          localStorage.setItem("secret-key", JSON.stringify(data.user));
          navigate("/instructor");
        }
      }
    }
  };

  return (
    <>
      
      <div className="row registers ">
        <div className="col-md-6">
          <img id="image" src="image\register1.jpg " alt="Login"></img>
        </div>

        <div className="col-md-4 registerBorder ">
          <div className="registers">
            <div className="mb-3 mt-5">
              <form action="" onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                  <h1>Login</h1>
                </div>
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                  onChange={(e) => handleChange(e)}
                  min="3"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={(e) => handleChange(e)}
                />
                <SubmitButton type="submit">Log In</SubmitButton>
                <span>
                  Don't have an account? <Link to="/register">Register.</Link>
                </span>
              </form>

              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Input = styled.input`
  padding: 1rem;
  border: 0.1rem solid #d2b48c; /* Tan */
  border-radius: 0.4rem;
  color: #4e0eff; /* Deep Blue Text */
  width: 100%;
  font-size: 1rem;
  margin: 10px 0px 0px 0px;

  &:focus {
    border: 0.1rem solid #b76e79; /* Rose Gold Focus Border */
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: blue; /* Golden Honey */
  color: white;
  padding: 1rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  margin: 8px;

  &:hover {
    background-color: light-blue; /* Rose Gold Hover */
  }
`;
