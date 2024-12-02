import React, { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL; //http://localhost:3000/api/auth/login

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  // User Login Funcation
  const loginUser = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, data);

      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }

      alert(res.data.message);
    } catch (error) {
      console.error("Error Login user:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.error || "Unable to login. Please try again.!"
      );
    }
  };

  // Handle Input data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  // Handle Form data
  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(formData); // Login Funcation

    setFromData({
      email: "",
      password: ""
    })
  };

  return (
    <div className="login-container">
      <h1> Please Login</h1>

      {/* Display errors */}
      {errorMessage && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: "1.3rem",
          }}
        >
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
    </div>
  );
};