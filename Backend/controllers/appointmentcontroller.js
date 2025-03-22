const { createAppointmentSchema } = require("../middleware/validator");
const Appointment = require("../models/appointment");

exports.getAppointments = async (req, res) => {
    const { page } = req.query;
    const appointmentPostPerPage = 10;

    try {
        // Pagination
        let pageNum = 0;
        if (page <= 1) {
            pageNum = 0;
        } else {
            pageNum = page - 1;
        }
        const result = await Appointment.find().sort({ createdAt: -1 }).skip(pageNum * appointmentPostPerPage).limit(appointmentPostPerPage);

        res.status(200).json({ success: true, message: 'Appointments fetched successfully', data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch appointments', error: error.message });
    }
};

exports.createAppointment = async (req, res) => {
    try {
        const { error } = createAppointmentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const newAppointment = await Appointment.create(req.body);
        res.status(201).json({ success: true, message: "Appointment reservation successful", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding appointment", error: error.message });
    }
};

exports.getSingleAppointment = async (req, res) => {
    const { _id } = req.query;

    try {
        const existingAppointment = await Appointment.findOne({ _id });

        if (!existingAppointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        res.status(200).json({ success: true, message: 'Appointment fetched successfully', data: existingAppointment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch appointment', error: error.message });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const { _id } = req.query;

        const { error } = createAppointmentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existingAppointment = await Appointment.findOne({ _id });

        if (!existingAppointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        Object.assign(existingAppointment, req.body);

        const updatedAppointment = await existingAppointment.save();

        res.status(200).json({ success: true, message: "Appointment updated successfully", appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating appointment", error: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const { _id } = req.query;

        const existingAppointment = await Appointment.findOne({ _id });

        if (!existingAppointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        await Appointment.deleteOne({ _id });

        res.status(200).json({ success: true, message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting appointment", error: error.message });
    }
};