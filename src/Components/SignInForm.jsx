import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  let navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Send the username and password to the signUp endpoint
    const response = await axios.post("http://localhost:3000/auth/SignUp", {
      username,
      password,
    });
    setError(response.data.message);
    console.log(response);
    // Optionally, reset the form fields
    setUsername("");
    setPassword("");
    navigate("/Login");
    //catch (error) {
    //   // Check if the error response exists and update the message accordingly
    //   if (error.response && error.response.data) {
    //     setError(error.response.data.message);
    //   } else {
    //     setError("An error occurred. Please try again.");
    //   }
    // }
  };
  return (
    <div id="signIn">
      <section>
        {/*  */}
        <div class="signin">
          <div class="content">
            <h2>Sign Up</h2>

            <div class="form">
              {Error && <p style={{ color: "red" }}>{Error}</p>}
              <div class="inputBox">
                <input
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />{" "}
                <i>Username</i>
              </div>

              <div class="inputBox">
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <i>Password</i>
              </div>

              {/* <div class="links">
                <a href="#">Forgot Password</a> <a href="#">Signup</a>
              </div> */}

              <button class="inputBox" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignInForm;
