const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const authController = require('../controllers/authController');


router
    .route('/')
    .get(prescriptionController.findAllPrescriptions)
    .post(authController.protect, prescriptionController.createPrescription)

    router
    .route('/:id')
    .get(prescriptionController.findPrescriptionByPk)
    .put(authController.protect, prescriptionController.updatePrescription)
    .delete(authController.protect, prescriptionController.deletePrescription)
    
module.exports = router; 