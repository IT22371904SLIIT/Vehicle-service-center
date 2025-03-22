const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehiclecontroller');
const { identifierUser, identifierAdmin } = require('../middleware/identification');

// Test route
router.get("/test", (req, res) => res.send("V routes working..."));

// Create a new vehicle
router.post("/create-vehicle", identifierAdmin, vehicleController.createVehicle);

// Get all vehicles
router.get("/all-vehicles", vehicleController.getVehicles);

// Get vehicle by ID
router.get("/single-vehicle", vehicleController.getSingleVehicle);

// Update vehicle by ID
router.put("/update-vehicle", identifierAdmin, vehicleController.updateVehicle);

// Delete vehicle by ID
router.delete("/delete-vehicle", identifierAdmin, vehicleController.deleteVehicle);

module.exports = router;