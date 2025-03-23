import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const EmergencyList = () => {
    const [emergencies, setEmergencies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        // Fetch emergencies from the API
        axios.get('http://localhost:9001/api/emergencies')
            .then((res) => {
                setEmergencies(res.data);
                console.log(res.data);
            })
            .catch(() => { console.log('Error while getting data'); });
    }, []);

    const onDeleteClick = (_id) => {
        axios.delete(`http://localhost:9001/api/emergencies/${_id}`)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error('Delete Error', err.response ? err.response.data : err.message);
            });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleVehicleTypeChange = (e) => {
        setSelectedVehicleType(e.target.value);
    };

    // Filter emergencies based on search query and selected vehicle type
    const filteredEmergencies = emergencies.filter(emergency => {
        const matchesSearchQuery =
            emergency.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emergency.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emergency.vehicleType.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesVehicleType = selectedVehicleType ? emergency.vehicleType === selectedVehicleType : true;

        return matchesSearchQuery && matchesVehicleType;
    });

    const generateEmergencyReport = (emergency) => {
        // Navigate to EmergencyReport page with emergency details
        navigate('/emergencies/emergency-report', { state: { emergency } });
    };

    // Get unique vehicle types for the dropdown
    const uniqueVehicleTypes = [...new Set(emergencies.map(emergency => emergency.vehicleType))];

    return (
        <div>
            <h1 className="emergency-header">Emergency List</h1>
            
            <div className="emergency-search-container">
                <i className="fas fa-search emergency-search-icon"></i>
                <input
                    type="text"
                    placeholder="Search by Vehicle Number, Location, or Vehicle Type"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="emergency-search-bar"
                />
            </div>

            <div className="emergency-vehicle-type-filter">
                <select value={selectedVehicleType} onChange={handleVehicleTypeChange}>
                    <option value="">Select Vehicle Type</option>
                    {uniqueVehicleTypes.map((vehicleType, index) => (
                        <option key={index} value={vehicleType}>{vehicleType}</option>
                    ))}
                </select>
            </div>

            <table className="emergency-table">
                <thead>
                    <tr>
                        <th>Vehicle Number</th>
                        <th>Location</th>
                        <th>Vehicle Type</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmergencies.length > 0 ? (
                        filteredEmergencies.map((emergency) => (
                            <tr key={emergency._id}>
                                <td>{emergency.vehicleNumber}</td>
                                <td>{emergency.location}</td>
                                <td>{emergency.vehicleType}</td>
                                <td>{emergency.phoneNumber}</td>
                                <td className="emergency-buttons">
                                    <button className="emergency-btn emergency-btn-delete" onClick={() => onDeleteClick(emergency._id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <Link to={`/emergencies/update/${emergency._id}`} className="emergency-btn emergency-btn-update fas fa-edit"></Link>
                                    <button className="emergency-btn emergency-btn-report" onClick={() => generateEmergencyReport(emergency)}>
                                        <i className="fas fa-file-invoice-dollar"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="emergency-no-data">No data found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
