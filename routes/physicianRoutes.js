const express = require('express');
const router = express.Router();
const physicianController = require('../controllers/physicianController')

router
    .route('/')
    .get(physicianController.findAllPhysicians)
    .post(physicianController.createPhysician)

router
    .route('/:id')
    .get(physicianController.findPhysicianByPk)
    
module.exports = router; 