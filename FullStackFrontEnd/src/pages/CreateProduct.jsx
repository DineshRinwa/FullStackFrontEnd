import React from "react";
import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CreateProduct = () => {
  const [formData, setFromData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState(); // State to show errors

  const createProduct = async (data) => {
    try {
      const token = localStorage.getItem("authToken"); // Get Token
      const response = await axios.post(`${BASE_URL}/api/products`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response", response.data);
      alert("Product created successfully!"); // Provide feedback to user
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong while creating the product!"
      );
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
    // console.log(formData);

    const dataToSubmit = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };
    console.log(dataToSubmit);

    createProduct(dataToSubmit); // Register Funcation

    // Reset form data to empty strings
    setFromData({
      name: "",
      price: "",
      quantity: "",
      description: "",
    });
  };

  return (
    <div className="create-product-container">
      <h1>Create Product</h1>

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
          type="text"
          name="name"
          placeholder="Enter Product Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="Number"
          name="price"
          placeholder="Enter Product Price"
          onChange={handleChange}
          value={formData.price}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Enter Product Quantity"
          onChange={handleChange}
          value={formData.quantity}
          required
        />

        <textarea
          name="description"
          rows="5"
          cols="50"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a detailed description..."
          required
        ></textarea>

        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
    </div>
  );
};
