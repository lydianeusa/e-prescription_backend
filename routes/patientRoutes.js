const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authController = require('../controllers/authController');

router
    .route('/')
    .get(patientController.findAllPatients)
    .post(authController.protect, patientController.createPatient)

router
    .route('/:id')
    .get(patientController.findPatientByPk)
    .put(authController.protect, patientController.updatePatient)
    .delete(authController.protect, patientController.deletePatient)
    
    
module.exports = router; 