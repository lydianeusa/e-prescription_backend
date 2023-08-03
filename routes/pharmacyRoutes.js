const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');
const authController = require('../controllers/authController');

router
    .route('/')
    .get(pharmacyController.findAllPharmacies)
    .post(
        authController.protect, 
        authController.restrictTo ('admin'),
        pharmacyController.createPharmacy)

    router
    .route('/:id')
    .get(pharmacyController.findPharmacyByPk)
    
module.exports = router; 