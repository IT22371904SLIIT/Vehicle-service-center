const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storecontroller');
const { identifierUser, identifierAdmin } = require('../middleware/identification');

// Test route
router.get("/test", (req, res) => res.send("S routes working..."));

// Create a new store
router.post("/create-store", identifierAdmin, storeController.createStore);

// Get all stores
router.get("/all-stores", storeController.getStores);

// Get store by ID
router.get("/single-store", storeController.getSingleStore);

// Update store by ID
router.put("/update-store", identifierAdmin, storeController.updateStore);

// Delete store by ID
router.delete("/delete-store", identifierAdmin, storeController.deleteStore);

module.exports = router;