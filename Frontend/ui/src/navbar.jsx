import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing necessary React Router components
import ServicesMenu from "./services";

const NavBar = ({ onHomeClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Used for programmatically navigating to other routes

  // Check if the user is logged in (this can be modified to check actual user session or token)
  useEffect(() => {
    // Example: You can check a token or sessionStorage here
    const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
    setIsLoggedIn(!!token);
  }, []); // Empty dependency array ensures this runs once on component mount

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setIsLoggedIn(false); // Update login state
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="bg-white py-2 px-6 flex justify-between items-center shadow-md font-montserrat fixed top-0 w-full z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src="./motrone.png" alt="Logo" className="h-20 w-20 mr-4" />
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-black font-bold">
        <li>
          <a href="#" onClick={onHomeClick} className="hover:text-red-700 hover:underline">
            HOME
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-700 hover:underline">
            ABOUT US
          </a>
        </li>

        {/* Services Dropdown */}
        <li className="relative group">
          <a href="#" className="hover:text-red-700 hover:underline">
            SERVICES
          </a>
          <div className="absolute left-0 hidden group-hover:flex bg-white shadow-lg p-4 mt-2">
            <ServicesMenu />
          </div>
        </li>

        <li>
          <a href="#" className="hover:text-red-700 hover:underline">
            BRANCHES
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-700 hover:underline">
            PACKAGES
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-700 hover:underline">
            NEWS
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-red-700 hover:underline">
            CONTACT
          </a>
        </li>
      </ul>

      {/* Signup / Signin Buttons */}
      <div className="flex space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/signup">
              <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900">
                SIGN UP
              </button>
            </Link>
            <Link to="/signin">
              <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900">
                SIGN IN
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            LOG OUT
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
