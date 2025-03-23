import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UAppointments() {
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    AID: "",
    Aname: "",
    Aphone: "",
    AregID: "",
    Avtype: "",
    Avnum: "",
    service: [],
    comment: "",
    date: "",
    time: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormData({
      ...formData,
      AID: generateAID(),
      AregID: generateAregID(),
    });
  }, []);

  const generateAID = () => {
    const now = new Date();
    const AID = `AID-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
    return AID;
  };

  const generateAregID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let AregID = 'REG-';
    for (let i = 0; i < 4; i++) {
      AregID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return AregID;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      if (checked) {
        return { ...prevState, service: [...prevState.service, value] };
      } else {
        return { ...prevState, service: prevState.service.filter((s) => s !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9]) (AM|PM)$/;

    if (!timeRegex.test(formData.time)) {
      alert("Please enter the time in the correct format (e.g. 10:30 AM).");
      return;
    }

    try {
      console.log("Submitting data:", formData);

      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:9000/api/appointments/create-appointment",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setSuccessMessage("Appointment created successfully!");
      setFormData({
        AID: "",
        Aname: "",
        Aphone: "",
        AregID: "",
        Avtype: "",
        Avnum: "",
        service: [],
        comment: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Error saving the appointment!", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Failed to create an appointment.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
      {/* Top Button for See Appointments */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
          onClick={() => navigate('/appointments-list')} // Navigate to the appointment list page
        >
          See Appointments
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Appointment Reservation</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">{successMessage}</strong>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">{errorMessage}</strong>
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="Aname"
                value={formData.Aname}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Phone
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">🇱🇰</span>
                <input
                  type="text"
                  name="Aphone"
                  value={formData.Aphone}
                  onChange={handleChange}
                  className="w-full pl-10 mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="071 234 5678"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Type & Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Vehicle Type
              </label>
              <input
                type="text"
                name="Avtype"
                value={formData.Avtype}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="E.g., Sedan, SUV, Truck"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Vehicle Number
              </label>
              <input
                type="text"
                name="Avnum"
                value={formData.Avnum}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Enter vehicle number"
              />
            </div>
          </div>

          {/* Services Selection */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Services
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Wash and Grooming",
                "Lube Services",
                "Exterior & Interior Detailing",
                "Engine Tune-ups",
                "Undercarriage Degreasing",
                "Windscreen Treatments",
                "Inspection Reports",
                "Insurance Claims",
                "Part Replacements",
                "Hybrid Services",
                "Wheel Alignment",
                "Battery Services",
                "Nano Treatments",
                "Full Paints",
                "Mechanical",
                "Detailing",
                "Body Shop",
                "Periodic Maintenances",
                "Other",
              ].map((service, index) => (
                <label key={index} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="service"
                    value={service}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Branch Selection */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-lg font-medium text-gray-700">
              Branch
            </label>
            <select
              name="AregID"
              value={formData.AregID}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            >
              <option value="Dehiwala">Dehiwala</option>
              <option value="Matara">Matara</option>
              <option value="Galle">Galle</option>
              <option value="Colombo">Colombo</option>
            </select>
          </div>

          {/* Date/Time Selection */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-lg font-medium text-gray-700">
              Date / Time
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter date"
            />
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter time"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Additional Comments
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter any comments"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              Submit Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UAppointments;
