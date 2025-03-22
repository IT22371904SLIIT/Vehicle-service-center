// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import NavBar from "./navbar";
import ServicesMenu from "./services";
import HomePage from "./home"; // Import the HomePage component
import Footer from "./Footer"; // Import the Footer component
import Signup from "./Signup"; // Import the Signup component
import Signin from "./Signin";
import axios from "axios";
import Userdashboard from "./Userdashboard";
import AdminDashboard from "./AdminDashboard";

const App = () => {
  const [showServices, setShowServices] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true); // State to control homepage visibility

  const handleHomeClick = () => {
    setShowHomePage(true); // Show the homepage when "HOME" is clicked
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/v1/test");
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Main content */}
        <div className="flex-grow">
          {/* Navbar with hover handlers */}
          <NavBar 
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
            onHomeClick={handleHomeClick} // Pass the click handler to NavBar
          />

          {/* Services Menu - Shows only when hovering */}
          {showServices && (
            <div 
              className="absolute left-0 mt-2"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <ServicesMenu />
            </div>
          )}

          {/* Routing Setup */}
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* HomePage Route */}
            <Route path="/signup" element={<Signup />} /> {/* Signup Route */}
            <Route path='/signin' element={<Signin />} />
            <Route path="/user-dashboard" element={<Userdashboard />} />
            <Route path='/admin-dashboard' element={<AdminDashboard/>} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
