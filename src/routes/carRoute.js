// src/routes/carRoutes.js
const express = require('express');
const { createCar, getCar, deleteCar, deleteCarbyId, updateCar } = require('../controllers/carController.js');
const router = express.Router();

// Middleware for validating text fields
router.get('/', getCar);
router.post("/postcar", createCar);
router.delete("/deletecar", deleteCar);
router.delete('/deletecarbyid', deleteCarbyId);
router.put('/carupdate', updateCar);

module.exports = router;