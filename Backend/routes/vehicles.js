const express = require('express');
const router = express.Router();
const Vehicles = require("../models/vehicle");

// Test route
router.get("/test", (req, res) => res.send("V routes working..."));

// Create a new vehicle
router.post("/", (req, res) => {
    Vehicles.create(req.body)
        .then(() => res.json({ msg: "Vehicle registration successful" }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Vehicle registration failed...", error: error.message });
        });
});

// Get all vehicles
router.get("/", (req, res) => {
    Vehicles.find()
        .then(vehicles => res.json(vehicles))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to fetch vehicles...", error: error.message });
        });
});

// Get vehicle by ID
router.get("/:id", (req, res) => {
    Vehicles.findById(req.params.id)
        .then(vehicle => res.json(vehicle))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to fetch vehicle...", error: error.message });
        });
});

// Update vehicle by ID
router.put("/:id", (req, res) => {
    Vehicles.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(vehicle => res.json({ msg: "Vehicle updated successfully", vehicle }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to update vehicle...", error: error.message });
        });
});

// Delete vehicle by ID
router.delete("/:id", (req, res) => {
    Vehicles.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Vehicle deleted successfully" }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to delete vehicle...", error: error.message });
        });
});

module.exports = router;