import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Product = () => {
  const [userId, setUserId] = useState("");
  const [product, setProduct] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // Added error state

  // Fetch Product function
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      console.log(response.data.product); // Ensure this matches your API's response
      setProduct(response.data.product);
    } catch (error) {
      console.error(
        "Error Fetching Products:",
        error.response?.data || error.message
      );
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token); // Decode token
      setUserId(decoded.userId); // Set the user role
      console.log("Decoded Role:", decoded.userId);
    }

    fetchProduct(); // Fetch products on component mount
  }, []);

  // Handle delete product
  const handleClick = async (productId) => {
    console.log(productId);
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${BASE_URL}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product deleted successfully!");
      setProduct((prevProduct) =>
        prevProduct.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error(
        "Error Deleting Product:",
        error.response?.data || error.message
      );
      setErrorMessage(
        error.response?.data?.message || "Failed to delete the product!"
      );
    }
  };

  return (
    <div key={111} className="product-container">
      <h1 key={222}>Product List</h1>

      {/* Show error messages */}
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

      <div className="product-cart" key={333}>
        {product.length > 0 ? (
          product.map((item) => (
            <div key={item._id} className="product">
              <h2>{item.name}</h2>
              <p>Price : {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Description: {item.description}</p>

              {/* Show delete button only if user is admin or seller */}
              {(userId === item.userId || userId === item.userId) && (
                <button onClick={() => handleClick(item._id)} className="btn">
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No Products Found</p>
        )}
      </div>
    </div>
  );
};
