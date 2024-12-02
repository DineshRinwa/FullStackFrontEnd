import { Link } from "react-router";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to="/product">Product</Link>
      <Link to="/create_product">Create_Product</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};
