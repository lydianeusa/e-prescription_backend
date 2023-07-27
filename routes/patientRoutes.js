const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authController = require('../controllers/authController');

router
    .route('/')
    .get(
        authController.protect, 
        authController.restrictTo ('admin', 'physician', 'pharmacist'), 
        patientController.findAllPatients)
    .post(
        // authController.protect, 
        // authController.restrictTo ('admin', 'physician'), 
        patientController.createPatient)

router
    .route('/:id')
    .get(patientController.findPatientByPk)
    .put(
        // authController.protect, 
        patientController.updatePatient)
    .delete(
        // authController.protect, 
        patientController.deletePatient)
    
    
module.exports = router; 