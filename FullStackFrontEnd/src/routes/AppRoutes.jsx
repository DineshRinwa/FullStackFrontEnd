import { Routes, Route } from "react-router";
import { Product } from "../pages/Product";
import { CreateProduct } from "../pages/CreateProduct";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<Product />} />
      <Route path="/create_product" element={<CreateProduct />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
