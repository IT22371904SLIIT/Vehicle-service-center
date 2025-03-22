const { createStoreSchema } = require("../middleware/validator");
const Store = require("../models/store");

exports.getStores = async (req, res) => {
    const { page } = req.query;
    const storePostPerPage = 10;

    try {
        // Pagination
        let pageNum = 0;
        if (page <= 1) {
            pageNum = 0;
        } else {
            pageNum = page - 1;
        }
        const result = await Store.find().sort({ createdAt: -1 }).skip(pageNum * storePostPerPage).limit(storePostPerPage);

        res.status(200).json({ success: true, message: 'Stores fetched successfully', data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch stores', error: error.message });
    }
};

exports.createStore = async (req, res) => {
    try {
        const { error } = createStoreSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const newStore = await Store.create(req.body);
        res.status(201).json({ success: true, message: "Store added successfully!", store: newStore });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding store", error: error.message });
    }
};

exports.getSingleStore = async (req, res) => {
    const { _id } = req.query;

    try {
        const existingStore = await Store.findOne({ _id });

        if (!existingStore) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }

        res.status(200).json({ success: true, message: 'Store fetched successfully', data: existingStore });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch store', error: error.message });
    }
};

exports.updateStore = async (req, res) => {
    try {
        const { _id } = req.query;

        const { error } = createStoreSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existingStore = await Store.findOne({ _id });

        if (!existingStore) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }

        Object.assign(existingStore, req.body);

        const updatedStore = await existingStore.save();

        res.status(200).json({ success: true, message: "Store updated successfully", store: updatedStore });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating store", error: error.message });
    }
};

exports.deleteStore = async (req, res) => {
    try {
        const { _id } = req.query;

        const existingStore = await Store.findOne({ _id });

        if (!existingStore) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }

        await Store.deleteOne({ _id });

        res.status(200).json({ success: true, message: "Store deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting store", error: error.message });
    }
};