const express = require('express');
const router = express.Router();
const Emergencies = require("../models/emergency");

// Test route
router.get("/test", (req, res) => res.send("E routes working..."));

// Create a new appointment
router.post("/", (req, res) => {
    Emergencies.create(req.body)
        .then(() => res.json({ msg: "emergency add successful" }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "emergency add failed...", error: error.message });
        });
});

// Get all appointments
router.get("/", (req, res) => {
    Emergencies.find()
        .then(emergencies=> res.json(emergencies))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to fetch emergencies...", error: error.message });
        });
});

// Get appointment by ID
router.get("/:id", (req, res) => {
    Emergencies.findById(req.params.id)
        .then(emergency => res.json(emergency))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to fetch emergency...", error: error.message });
        });
});

// Update appointment by ID
router.put("/:id", (req, res) => {
    Emergencies.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(emergency => res.json({ msg: "emergency updated successfully", emergency }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to update emergency...", error: error.message });
        });
});

// Delete appointment by ID
router.delete("/:id", (req, res) => {
    Emergencies.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Emergency deleted successfully" }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to delete emergency...", error: error.message });
        });
});

module.exports = router;