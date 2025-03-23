const Joi = require('joi');

exports.signupSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$'))
});

exports.signinSchema = Joi.object({ 
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$'))
});

exports.acceptCodeSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    providedCode:Joi.number().required()
});

exports.changePasswordSchema = Joi.object({
    newPassword: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$')),
    oldPassword: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$'))
});

exports.acceptForgotPasswordSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    providedCode: Joi.number().required(),
    newPassword: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*()-_]{6,}$'))
});

exports.createVehicleSchema = Joi.object({
    brand: Joi.string().min(2).max(50).required().trim(),
    model: Joi.string().min(2).max(50).required().trim(),
    //category: Joi.string().required().trim(), // Assuming category is an ObjectId (String)
    year: Joi.number().integer().min(1950).max(new Date().getFullYear()).required(),
    registrationNumber: Joi.string().min(5).max(20).required().trim(),
    fuelType: Joi.string().valid("Petrol", "Diesel", "Electric", "Hybrid").required(),
    rentalPricePerDay: Joi.number().min(0).required(),
    additionalPricePayKilometer: Joi.number().min(0).required(),
    status: Joi.string().valid("Available", "Booked", "Maintenance").default("Available"),
    imageUrl: Joi.string().uri().trim(),
});
//------------------------ validation for create appoinment --------------------------
exports.createAppointmentSchema = Joi.object({
  AID: Joi.string().min(3).max(20).optional().trim(),
  Aname: Joi.string().min(2).max(50).required().trim(),
  Aphone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Aphone must be a 10-digit number.",
    }),
  AregID: Joi.string().min(3).max(20).optional().trim(),
  Avtype: Joi.string().valid("Car", "Bike", "Truck", "Van").required(),
  Avnum: Joi.string().min(5).max(20).required().trim(),
  service: Joi.array().items(Joi.string().min(3).max(50)).min(1).required(),
  comment: Joi.string().max(500).allow("").trim(),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) 
    .required()
    .messages({
      "string.pattern.base": "Date must be in YYYY-MM-DD format.",
    }),
  time: Joi.string()
    .pattern(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)
    .required()
    .messages({
      "string.pattern.base": "Time must be in HH:MM AM/PM format.",
    }),
});
