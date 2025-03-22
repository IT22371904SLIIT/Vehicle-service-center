import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide text-teal-400">Vehicle Service Center</h2>
          <p className="mt-4 text-gray-200">
            Your one-stop solution for all vehicle service needs. We are committed to keeping your vehicle in top condition.
          </p>
          <p className="mt-2 text-gray-400 text-sm">&copy; {new Date().getFullYear()} Vehicle Service Center. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-teal-400">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition duration-300">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition duration-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition duration-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-teal-400">Contact Us</h3>
          <p className="mt-4 text-gray-200">
            <span className="font-bold text-white">Address:</span> 123 Service Lane, Auto City, Country
          </p>
          <p className="text-gray-200">
            <span className="font-bold text-white">Phone:</span> +123 456 7890
          </p>
          <p className="text-gray-200">
            <span className="font-bold text-white">Email:</span>{" "}
            <a href="mailto:info@vehicleservice.com" className="text-teal-400 hover:underline">
              info@vehicleservice.com
            </a>
          </p>
          <div className="flex mt-4 space-x-6">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition duration-300">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition duration-300">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition duration-300">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition duration-300">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
