import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SignInForm from "./SignInForm";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  let navigate = useNavigate();
  function Login() {
    axios
      .post(
        "https://task-manager-auth-sable.vercel.app/auth/login",
        {
          username: username,
          password: password,
        },

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        navigate("/HomeTasks");
        console.log(response);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError("Invalid username or password. Please try again.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      });
  }
  return (
    <div id="signIn">
      <section>
        {/*  */}
        <div class="signin">
          <div class="content">
            <h2>Sign In</h2>

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

              <div class="links">
                {" "}
                <a href="#">Forgot Password</a>{" "}
                <Link to="/SignUp">Sign Up</Link>
              </div>

              <button class="inputBox" onClick={Login}>
                login
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
