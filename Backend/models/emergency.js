const mongoose = require("mongoose");

const EmergencySchema = new mongoose.Schema({
    eID :{
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    vehicleColor: {
        type: String,
        required: true
    },
 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Emergency', EmergencySchema);