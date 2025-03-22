const { createVehicleSchema } = require("../middleware/validator");
const Vehicle = require("../models/vehicle");

exports.getVehicles = async (req, res) => {
    const { page } = req.query;
    const vehiclePostPerPage = 10;

    try {
        // Pagination
        let pageNum = 0;
        if (page <= 1) {
            pageNum = 0;
        } else {
            pageNum = page - 1;
        }
        const result = await Vehicle.find().sort({ createdAt: -1 }).skip(pageNum * vehiclePostPerPage).limit(vehiclePostPerPage);

        res.status(200).json({ success: true, message: 'Vehicles fetched successfully', data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch vehicles', error: error.message });
    }
};

exports.createVehicle = async (req, res) => {
    try {
        const { error } = createVehicleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const newVehicle = await Vehicle.create(req.body);
        res.status(201).json({ success: true, message: "Vehicle registration successful", vehicle: newVehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: "Vehicle registration failed", error: error.message });
    }
};

exports.getSingleVehicle = async (req, res) => {
    const { _id } = req.query;

    try {
        const existingVehicle = await Vehicle.findOne({ _id });

        if (!existingVehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        res.status(200).json({ success: true, message: 'Vehicle fetched successfully', data: existingVehicle });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch vehicle', error: error.message });
    }
};

exports.updateVehicle = async (req, res) => {
    try {
        const { _id } = req.query;

        const { error } = createVehicleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existingVehicle = await Vehicle.findOne({ _id });

        if (!existingVehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        Object.assign(existingVehicle, req.body);

        const updatedVehicle = await existingVehicle.save();

        res.status(200).json({ success: true, message: "Vehicle updated successfully", vehicle: updatedVehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update vehicle", error: error.message });
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        const { _id } = req.query;

        const existingVehicle = await Vehicle.findOne({ _id });

        if (!existingVehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        await Vehicle.deleteOne({ _id });

        res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete vehicle", error: error.message });
    }
};