const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    regID: {
        type: String,
        required: true,
        unique: true
    },
    Vtype: {
        type: String,
        required: true
    },
    Vnumber: {
        type: String,
        required: true
    },
    Vcolour: {
        type: String,
        required: true
    },
    Oname: {
        type: String,
        required: true
    },
    Ophone: {
        type: String,
        required: true
    },
    Oaddress: {
        type: String,
        required: true
    },
    Oemail: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);