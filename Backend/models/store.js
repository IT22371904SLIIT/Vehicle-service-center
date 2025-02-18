const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    productQuantity: {
        type: Number,
        required: true,
        min: 0,
    },
    productDescription: {
        type: String,
        required: true,
        trim: true,
    },
    productImage: {
        type: String, // Store the filename or image URL here
    },
});

module.exports = mongoose.model('Store', StoreSchema);
