const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController')

router
    .route('/')
    .get(patientController.findAllPatients)
    .post(patientController.createPatient)

router
    .route('/:id')
    .get(patientController.findPatientByPk)
    .put(patientController.updatePatient)
    .delete(patientController.deletePatient)
    
    
module.exports = router; 