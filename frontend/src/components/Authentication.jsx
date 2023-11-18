import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import Signup from "./Signup";

const Authentication = ({ onLogin }) => {
  const navigate = useNavigate();
  const authenticateUser = async (email, password) => {
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        onLogin();
        navigate("/");
        console.error("Authentication failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Authentication request failed", error);
    }
  };
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginForm onAuthenticate={authenticateUser} />}
      />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Authentication;
