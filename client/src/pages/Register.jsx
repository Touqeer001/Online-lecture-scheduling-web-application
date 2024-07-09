import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, []);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be the same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 4) {
      toast.error(
        "Password should be equal or greater than 4 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        isAdmin: values.isAdmin,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        if (data.user.isAdmin === true) {
          localStorage.setItem("secret-key-admin", JSON.stringify(data.user));
          navigate("/admin");
        } else if (data.user.isAdmin === false) {
          localStorage.setItem("secret-key", JSON.stringify(data.user));
          navigate("/instructor");
        }
      }
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues({ ...values, [name]: newValue });
  };

  return (
    <>
      <div className="row registers">
        <div className="col-md-6">
          <img id="image" src="image\login.avif" alt="Login"></img>
        </div>

        <div className="col-md-4 registerBorder">
          <div className="registers">
            <div className="mb-3">
              <FormContainer onSubmit={(event) => handleSubmit(event)}>
                {/* <div className="brand">
          <h1>Course Schedule</h1>
        </div> */}
                <form>
                  <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => handleChange(e)}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="checkbox-container">
                    <Checkbox
                      type="checkbox"
                      id="isAdmin"
                      name="isAdmin"
                      checked={values.isAdmin}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="isAdmin">Admin</label>
                  </div>
                  <SubmitButton type="submit">Create User</SubmitButton>
                  <span>
                    Already have an account? <Link to="/login">Login.</Link>
                  </span>
                </form>
              </FormContainer>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  //  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  // background-color: #f3e0db; /* Mink Mirage */
  padding: 2rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: #d4af37; /* Golden Honey */
      text-transform: uppercase;
      font-size: 2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff; /* Silken Ivory */
    border-radius: 1rem;
    padding: 0px 0px 10px 0px;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 0px opx -10px;
  }

  span {
    color: black; /* Golden Honey */
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    font-size: 0.9rem;

    a {
      color: red; /* Turquoise */
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 0.1rem solid #d2b48c; /* Tan */
  border-radius: 0.4rem;
  color: #4e0eff; /* Deep Blue Text */
  width: 100%;
  font-size: 1rem;

  &:focus {
    border: 0.1rem solid #b76e79; /* Rose Gold Focus Border */
    outline: none;
  }
`;

const Checkbox = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 0.1rem solid #d4af37; /* Golden Honey */
  border-radius: 0.2rem;
  outline: none;
  margin-right: 0.5rem;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #d4af37; /* Golden Honey Background */
    border-color: #d4af37; /* Golden Honey Border */

    &:before {
      content: "\u2713";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 1.2rem;
    }
  }
`;

const SubmitButton = styled.button`
  background-color: blue; /* Golden Honey */
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
`;
