import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import "../Sidebar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SideBar = ({ funcOpenDialog }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/auth/Logout", {
        withCredentials: true, // Ensures cookies are sent with request
      });

      // Clear local storage or user state (if used)

      // Redirect to login page
      navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <div id="sidebar-container">
        <img src="profile.webp" />

        <div
          style={{
            height: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <button id="sidebar-menu">
            <FaHome size={25} style={{ alignSelf: "center" }} />
            <h2 style={{ marginLeft: "10px", alignSelf: "center" }}>
              All tasks
            </h2>
          </button>

          <button id="sidebar-menu2" onClick={() => funcOpenDialog(true)}>
            <FaPlusCircle size={25} style={{ alignSelf: "center" }} />
            <h2 style={{ marginLeft: "10px", alignSelf: "center" }}>
              Add task
            </h2>
          </button>
        </div>
        <button id="signOut" onClick={handleLogout}>
          <PiSignOutBold size={25} style={{ alignSelf: "center" }} />
          <h2 style={{ marginLeft: "10px", alignSelf: "center" }}>Sign out</h2>
        </button>
      </div>
    </>
  );
};

export default SideBar;
