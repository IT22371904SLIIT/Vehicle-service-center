const express = require('express');
const dbConnection = require("./config/db");
const vehicleRoutes = require("./routes/vehicles");
const appoinmentRoutes = require("./routes/appoinments");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ origin: true, credentials: true }));

dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello, server is running..."));
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/appoinments", appoinmentRoutes); // Corrected path

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));