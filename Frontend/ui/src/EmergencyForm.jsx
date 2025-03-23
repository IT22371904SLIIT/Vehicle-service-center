import React, { useState } from "react";
import axios from "axios";

const EmergencyForm = () => {
  const [formData, setFormData] = useState({
    eID: "",
    location: { type: "Point", coordinates: [] },
    vehicleNumber: "",
    phoneNumber: "",
    vehicleType: "",
    vehicleColor: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.eID) tempErrors.eID = "Emergency ID is required";
    if (!formData.vehicleNumber.match(/^[A-Z0-9-]+$/)) tempErrors.vehicleNumber = "Invalid vehicle number format";
    if (!formData.phoneNumber.match(/^\d{10}$/)) tempErrors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.vehicleType) tempErrors.vehicleType = "Vehicle type is required";
    if (!formData.vehicleColor) tempErrors.vehicleColor = "Vehicle color is required";
    if (!formData.location.coordinates.length) tempErrors.location = "Location is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post("http://localhost:5173/emergencyform", formData);
      alert("Emergency reported successfully!");
    } catch (error) {
      alert("Failed to report emergency");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Report Emergency</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Emergency ID" value={formData.eID} onChange={e => setFormData({...formData, eID: e.target.value})} className="w-full p-2 border rounded" />
        {errors.eID && <p className="text-red-500">{errors.eID}</p>}

        <input type="text" placeholder="Vehicle Number" value={formData.vehicleNumber} onChange={e => setFormData({...formData, vehicleNumber: e.target.value})} className="w-full p-2 border rounded" />
        {errors.vehicleNumber && <p className="text-red-500">{errors.vehicleNumber}</p>}

        <input type="text" placeholder="Phone Number" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} className="w-full p-2 border rounded" />
        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}

        <input type="text" placeholder="Vehicle Type" value={formData.vehicleType} onChange={e => setFormData({...formData, vehicleType: e.target.value})} className="w-full p-2 border rounded" />
        {errors.vehicleType && <p className="text-red-500">{errors.vehicleType}</p>}

        <input type="text" placeholder="Vehicle Color" value={formData.vehicleColor} onChange={e => setFormData({...formData, vehicleColor: e.target.value})} className="w-full p-2 border rounded" />
        {errors.vehicleColor && <p className="text-red-500">{errors.vehicleColor}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default EmergencyForm;
