const express = require('express');
const appointmentController = require('../controllers/appointmentcontroller');
const { identifierUser, identifierAdmin } = require('../middleware/identification');

const router = express.Router();

router.get('/all-appointments', appointmentController.getAppointments);
router.get('/single-appointment', appointmentController.getSingleAppointment);
router.post('/create-appointment', identifierUser, appointmentController.createAppointment);
router.put('/update-appointment', identifierUser, appointmentController.updateAppointment);
router.delete('/delete-appointment', identifierUser, appointmentController.deleteAppointment);

module.exports = router;