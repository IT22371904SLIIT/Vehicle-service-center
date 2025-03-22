const { createEmergencySchema } = require("../middleware/validator");
const Emergency = require("../models/emergency");

exports.getEmergencies = async (req, res) => {
    const { page } = req.query;
    const emergencyPostPerPage = 10;

    try {
        // Pagination
        let pageNum = 0;
        if (page <= 1) {
            pageNum = 0;
        } else {
            pageNum = page - 1;
        }
        const result = await Emergency.find().sort({ createdAt: -1 }).skip(pageNum * emergencyPostPerPage).limit(emergencyPostPerPage);

        res.status(200).json({ success: true, message: 'Emergencies fetched successfully', data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch emergencies', error: error.message });
    }
};

exports.createEmergency = async (req, res) => {
    try {
        const { error } = createEmergencySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const newEmergency = await Emergency.create(req.body);
        res.status(201).json({ success: true, message: "Emergency added successfully!", emergency: newEmergency });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding emergency", error: error.message });
    }
};

exports.getSingleEmergency = async (req, res) => {
    const { _id } = req.query;

    try {
        const existingEmergency = await Emergency.findOne({ _id });

        if (!existingEmergency) {
            return res.status(404).json({ success: false, message: "Emergency not found" });
        }

        res.status(200).json({ success: true, message: 'Emergency fetched successfully', data: existingEmergency });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch emergency', error: error.message });
    }
};

exports.updateEmergency = async (req, res) => {
    try {
        const { _id } = req.query;

        const { error } = createEmergencySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existingEmergency = await Emergency.findOne({ _id });

        if (!existingEmergency) {
            return res.status(404).json({ success: false, message: "Emergency not found" });
        }

        Object.assign(existingEmergency, req.body);

        const updatedEmergency = await existingEmergency.save();

        res.status(200).json({ success: true, message: "Emergency updated successfully", emergency: updatedEmergency });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating emergency", error: error.message });
    }
};

exports.deleteEmergency = async (req, res) => {
    try {
        const { _id } = req.query;

        const existingEmergency = await Emergency.findOne({ _id });

        if (!existingEmergency) {
            return res.status(404).json({ success: false, message: "Emergency not found" });
        }

        await Emergency.deleteOne({ _id });

        res.status(200).json({ success: true, message: "Emergency deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting emergency", error: error.message });
    }
};