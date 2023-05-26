const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController')

router
    .route('/')
    .get(pharmacyController.findAllPharmacies)
    .post(pharmacyController.createPharmacy)

    router
    .route('/:id')
    .get(pharmacyController.findPharmacyByPk)
    
module.exports = router; 