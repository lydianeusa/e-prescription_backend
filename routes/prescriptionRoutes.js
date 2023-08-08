const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const authController = require('../controllers/authController');


router
    .route('/')
    .get(
        authController.protect, 
        prescriptionController.findAllPrescriptions)
    .post(
        authController.protect,
        authController.restrictTo ('admin', 'physician'), 
        prescriptionController.createPrescription)

    router
    .route('/:id')
    .get(
        authController.protect, 
        authController.restrictTo ('admin', 'physician', 'pharmacist', 'patient'),
        prescriptionController.findPrescriptionByPk)
    .put(
        authController.protect, 
        authController.restrictTo ('admin', 'physician'),
        prescriptionController.updatePrescription)
    .delete(
        authController.protect, 
        authController.restrictTo ('admin', 'physician',),
        prescriptionController.deletePrescription)
    
module.exports = router; 