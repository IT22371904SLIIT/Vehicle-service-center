import React from "react";
import Usidebar from "./usersidebar";
import AppointmentForm from "./uappoinments"; // Import UAppointments Component

function Userdashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Usidebar />

      {/* Main Dashboard Content */}
      <div className="flex-grow mt-[100px] p-8">
        <h1 className="text-2xl font-semibold text-gray-700">User Dashboard</h1>

        {/* User Appointments Section */}
        <div className="mt-6">
          <AppointmentForm/>
        </div>
      </div>
    </div>
  );
}

export default Userdashboard;
