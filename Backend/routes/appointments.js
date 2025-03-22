const express = require('express');
const appointmentController = require('../controllers/appointmentcontroller');
const { identifierUser, identifierAdmin } = require('../middleware/identification');

const router = express.Router();

router.get('/all-appointments', appointmentController.getAppointments);
router.get('/single-appointment', appointmentController.getSingleAppointment);
router.post('/create-appointment', identifierAdmin, appointmentController.createAppointment);
router.put('/update-appointment', identifierAdmin, appointmentController.updateAppointment);
router.delete('/delete-appointment', identifierAdmin, appointmentController.deleteAppointment);

module.exports = router;