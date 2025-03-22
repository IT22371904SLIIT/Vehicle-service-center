const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencycontroller');
const { identifierUser, identifierAdmin } = require('../middleware/identification');

// Test route
router.get("/test", (req, res) => res.send("E routes working..."));

// Create a new emergency
router.post("/create-emergency", identifierAdmin, emergencyController.createEmergency);

// Get all emergencies
router.get("/all-emergencies", emergencyController.getEmergencies);

// Get emergency by ID
router.get("/single-emergency", emergencyController.getSingleEmergency);

// Update emergency by ID
router.put("/update-emergency", identifierAdmin, emergencyController.updateEmergency);

// Delete emergency by ID
router.delete("/delete-emergency", identifierAdmin, emergencyController.deleteEmergency);

module.exports = router;