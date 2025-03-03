const mongoose = require("mongoose");

const AppoinmentSchema = new mongoose.Schema({
    AID: {
        type: String,
        required: true,
        unique: true
    },
    Aname: {
        type: String,
        required: true
    },
    Aphone: {
        type: String,
        required: true
    },
    AregID: {
        type: String,
        required: true
    },
    Avtype: {
        type: String,
        required: true
    },
    Avnum: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Appointment', AppoinmentSchema);