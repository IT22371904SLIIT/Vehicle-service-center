import React, { useState, useEffect } from "react";
import Usidebar from "./usersidebar";
import AppointmentForm from "./uappoinments"; // Import Appointment Form Component
import AppointmentList from "./seeAppoinments"; // Import Appointment List Component
import axios from "axios";

function Userdashboard() {
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming you store the token in localStorage
        const response = await axios.get("http://localhost:9000/api/appointments", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });
        setAppointments(response.data); // Set appointments data in state
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setErrorMessage("Failed to fetch appointments.");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Usidebar />

      {/* Main Dashboard Content */}
      <div className="flex-grow mt-[100px] p-8">
        <h1 className="text-2xl font-semibold text-gray-700">User Dashboard</h1>

        {/* Appointment Form Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Create Appointment</h2>
          <AppointmentForm />
        </div>

      
      </div>
    </div>
  );
}

export default Userdashboard;
