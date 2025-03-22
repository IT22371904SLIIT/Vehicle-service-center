// Importing Required Modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const path = require('path'); // ✅ Import 'path' module

// Import routers
const authRouter = require('./routes/authroutes');
const appointmentRouter = require('./routes/appointments');
const storeRouter = require('./routes/stores');
const emergencyRouter = require('./routes/emergencies');
const vehicleRouter = require('./routes/vehicles');

dotenv.config();

// ✅ Initialize 'app' before using it
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database Connected");
}).catch(err => {
    console.log(err);
});

// ✅ Now, use `app.get()` after defining `app`
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/stores', storeRouter);
app.use('/api/emergencies', emergencyRouter);
app.use('/api/vehicles', vehicleRouter);

// Test Route
app.get('/api/v1/test', (req, res) => {
    res.json({ message: "Hello, from server" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
