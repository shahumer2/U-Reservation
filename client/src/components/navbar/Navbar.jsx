import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user } = useContext(authContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
          <span className="logo">U-Bookings</span>
        </Link>
        {user ? (
          <button className="btn btn-outline-info">
            WELCOME {user.username.match(/[a-zA-Z]+/g)}
          </button>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
