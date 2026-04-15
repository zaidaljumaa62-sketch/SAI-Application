import React, { useState } from "react";
import "../Pages_css/Login.css";
import logo from "../assets/Pictures/AR.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // <-- FIXED

  const handleSubmit = () => {
    console.log("Username:", username);
    console.log("Password:", password);

    // Example check (you can replace with real validation)
    if (true) {
      goToHome();
    }
  };

  const goToHome = () => {
    navigate("/hrHome");
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />

      <div className="login-box">
        <h1 className="title">Welcome</h1>

        <input
          type="text"
          placeholder="User name"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
