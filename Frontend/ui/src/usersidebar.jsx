import React from 'react';

const Usidebar = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white w-64">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold text-red-500">Service Center</h1>
      </div>
      <div className="flex-grow">
        <nav className="mt-10">
          <a href="/user-dashboard" className="flex items-center py-2 px-8 bg-gray-800 text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
            <span className="mx-4">Dashboard</span>
          </a>
          <a href="/appointment" className="flex items-center py-2 px-8 text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
            <span className="mx-4">Appointments</span>
          </a>
          <a href="#" className="flex items-center py-2 px-8 text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
            <span className="mx-4">Store</span>
          </a>
          <a href="#" className="flex items-center py-2 px-8 text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
            <span className="mx-4">Emergency Services</span>
          </a>
          <a href="#" className="flex items-center py-2 px-8 text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
            <span className="mx-4">Customers</span>
          </a>
          <a href="#" className="flex items-center py-2 px-8 text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
            <span className="mx-4">Reports</span>
          </a>
        </nav>
      </div>
      <div className="flex items-center justify-center h-20 border-t border-gray-700">
        <a href="#" className="text-gray-300 hover:text-white hover:bg-red-500 transition-colors duration-200 py-2 px-4 rounded">Logout</a>
      </div>
    </div>
  );
};

export default Usidebar;