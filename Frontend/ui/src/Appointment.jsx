import React, { useEffect, useState } from "react";
import axios from "axios";
import Usidebar from "./usersidebar"; // Sidebar component

function Appointment() {
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [errorMessage, setErrorMessage] = useState(""); // Error handling

  // Fetch appointments from backend when component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = token
          ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
          : { "Content-Type": "application/json" };
  
        const response = await axios.get("http://localhost:9000/api/appointments/all-appointments", { headers });
  
        console.log("Appointments Data:", response.data); // Debugging
        setAppointments(response.data.data); // Ensure you're setting `data`
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

      {/* Main Content */}
      <div className="mt-[100px] p-8 w-full">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong className="font-bold">{errorMessage}</strong>
          </div>
        )}

        {/* Appointments List */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Your Appointments</h2>

          {/* Table */}
          <div className="overflow-x-auto shadow-md border border-gray-300 rounded-lg mt-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-black text-lg">
                  <th className="py-3 px-6 text-left">AID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Phone</th>
                  <th className="py-3 px-6 text-left">Vehicle Type</th>
                  <th className="py-3 px-6 text-left">Vehicle Number</th>
                  <th className="py-3 px-6 text-left">Services</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment._id} className="border-b border-gray-200">
                      <td className="py-3 px-6">{appointment.AID}</td>
                      <td className="py-3 px-6">{appointment.Aname}</td>
                      <td className="py-3 px-6">{appointment.Aphone}</td>
                      <td className="py-3 px-6">{appointment.Avtype}</td>
                      <td className="py-3 px-6">{appointment.Avnum}</td>
                      <td className="py-3 px-6">
                        {Array.isArray(appointment.service) ? appointment.service.join(", ") : "N/A"}
                      </td>
                      <td className="py-3 px-6">
                        {appointment.date ? new Date(appointment.date).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-3 px-6">{appointment.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-3 px-6 text-center text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
