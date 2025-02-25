const express = require('express');
const mongoose = require('mongoose');
const vehicleRoutes = require("./routes/vehicles");
const appoinmentRoutes = require("./routes/appoinments");
const storeRoutes = require("./routes/stores");
const emergencyRoutes = require("./routes/emergencies");
const authRoutes = require("./routes/authroutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.get("/", (req, res) => res.send("Hello, server is running..."));
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/appoinments", appoinmentRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));