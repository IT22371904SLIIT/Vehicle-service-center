const express = require('express');
const router = express.Router();
const Stores = require("../models/store");

// Test route
router.get("/test", (req, res) => res.send("S routes working..."));

// Create a new appointment
router.post("/", (req, res) => {
    Stores.create(req.body)
        .then(() => res.json({ msg: "ITEM add successful" }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "item add failed...", error: error.message });
        });
});

// Get all appointments
router.get("/", (req, res) => {
    Stores.find()
        .then(stores => res.json(stores))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to fetch store...", error: error.message });
        });
});

// Get appointment by ID
router.get("/:id", (req, res) => {
    Stores.findById(req.params.id)
        .then(stores => res.json(stores))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to fetch store...", error: error.message });
        });
});

// Update appointment by ID
router.put("/:id", (req, res) => {
    Stores.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(store => res.json({ msg: "store updated successfully", store }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to update store...", error: error.message });
        });
});

// Delete appointment by ID
router.delete("/:id", (req, res) => {
    Stores.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Store deleted successfully" }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({ msg: "Failed to delete store...", error: error.message });
        });
});

module.exports = router;