const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authController = require('../controllers/authController');

router
    .route('/')
    .get(
        authController.protect, 
        patientController.findAllPatients)
    .post(
        authController.protect, 
        authController.restrictTo ('admin'), 
        patientController.createPatient)

router
    .route('/:id')
    .get(
        authController.protect,    
        authController.restrictTo ('admin', 'physician', 'pharmacist'), 
        patientController.findPatientByPk)
    .put(
        authController.protect,
        authController.restrictTo ('admin'), 
        patientController.updatePatient)
    .delete(
        authController.protect,
        authController.restrictTo ('admin'),
        patientController.deletePatient)

        
    
module.exports = router; 