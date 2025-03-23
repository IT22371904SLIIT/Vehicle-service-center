const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  AID: {
    type: String,
    required: true,
    unique: true,
  },
  Aname: {
    type: String,
    required: true,
  },
  Aphone: {
    type: String,
    required: true,
  },
  AregID: {
    type: String,
    required: true,
  },
  Avtype: {
    type: String,
    required: true,
  },
  Avnum: {
    type: String,
    required: true,
  },
  service: {
    type: [String], // Updated to store multiple services
    required: true,
  },
  comment: {
    type: String,
    required: false, // Changed to optional
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);