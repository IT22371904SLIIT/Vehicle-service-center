const express = require('express');
const router = express.Router();
const Appoinments = require("../models/appoinment"); // Corrected model name

// Test route
router.get("/test", (req, res) => res.send("Appointments routes working..."));

// Create a new appointment
router.post("/", (req, res) => {
    Appoinments.create(req.body)
        .then(() => res.json({ msg: "Appointment reservation successful" }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Appointment reservation failed...", error: error.message });
        });
});

// Get all appointments
router.get("/", (req, res) => {
    Appoinments.find()
        .then(appoinments => res.json(appoinments))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to fetch appointments...", error: error.message });
        });
});

// Get appointment by ID
router.get("/:id", (req, res) => {
    Appoinments.findById(req.params.id)
        .then(appoinment => res.json(appoinment))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to fetch appointment...", error: error.message });
        });
});

// Update appointment by ID
router.put("/:id", (req, res) => {
    Appoinments.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(appoinment => res.json({ msg: "Appointment updated successfully", appoinment }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to update appointment...", error: error.message });
        });
});

// Delete appointment by ID
router.delete("/:id", (req, res) => {
    Appoinments.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Appointment deleted successfully" }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to delete appointment...", error: error.message });
        });
});

module.exports = router;