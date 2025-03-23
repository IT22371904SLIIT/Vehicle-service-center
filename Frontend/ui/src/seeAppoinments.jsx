import React, { useState, useEffect } from "react";
import axios from "axios";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : { "Content-Type": "application/json" };
  
        const response = await axios.get("http://localhost:9000/api/all-appointments", { headers });
        
        console.log("API Response:", response.data); // Debugging line
  
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setErrorMessage("Failed to fetch appointments.");
      }
    };
  
    fetchAppointments();
  }, []);
  

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-black text-center mb-6">
        Created Appointments
      </h2>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">{errorMessage}</strong>
        </div>
      )}

      <div className="overflow-x-auto shadow-md border border-gray-300 rounded-lg">
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
              <th className="py-3 px-6 text-left">Actions</th>
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
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    {appointment.time}
                  </td>
                  <td className="py-3 px-6">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={() => alert(`Edit appointment with AID: ${appointment.AID}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                      onClick={() => alert(`Delete appointment with AID: ${appointment.AID}`)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-3 px-6 text-center text-gray-500">
                  No appointments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentsList;
