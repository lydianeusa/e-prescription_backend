const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');


router
    .route('/')
    .get(prescriptionController.findAllPrescriptions)
    .post(prescriptionController.createPrescription)

    router
    .route('/:id')
    .get(prescriptionController.findPrescriptionByPk)
    .put(prescriptionController.updatePrescription)
    .delete(prescriptionController.deletePrescription)
    
module.exports = router; 