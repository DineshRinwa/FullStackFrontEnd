import React, { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL; // Backend_Url

export const SignupForm = () => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errorMessage, setErrorMessage] = useState(); // State to show errors

  // Register Function
  const registerUser = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, data);
      console.log("Response-", response.data);
      alert("User Signup Successful!"); // Provide feedback to user
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  // handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(formData); // Register Funcation

    // Reset form data to empty strings
    setFromData({
      email: "",
      password: "",
      role: "",
    });
  };
  return (
    <div className="signup-container">
      <h1>Signup Form</h1>

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
        <select
          name="role"
          id="role"
          onChange={handleChange}
          value={formData.role}
          required
        >
          <option value=""> -- Select Your Role -- </option>
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </select>
        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
    </div>
  );
};
