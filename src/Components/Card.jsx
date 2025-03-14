import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const Card = ({ title, description, taskId, func, editTaskHandler }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "265px",
        height: "230px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        background: "#fff",
        wordWrap: "break-word",
        wordBreak: "break-word",
        whiteSpace: "normal",
        overflowWrap: "break-word",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>{title}</h3>
      <p
        style={{
          margin: "0 0 10px 0",
          fontSize: "12px",
          color: "#555",
          flexGrow: 1,
          //   alignSelf: "flex-start",
          //   wordWrap: "break-word",
          //   wordBreak: "break-word",
          //   whiteSpace: "normal",
          //   overflowWrap: "break-word",
        }}
      >
        {description}
      </p>
      <div style={{ display: "flex", gap: "10px", cursor: "pointer" }}>
        <button
          onClick={() => {
            editTaskHandler(true, taskId);
          }}
        >
          <FaEdit size={20} color="blue" />
        </button>
        <button onClick={() => func(taskId)}>
          <FaTrash size={20} color="red" />
        </button>
      </div>
    </div>
  );
};

export default Card;
