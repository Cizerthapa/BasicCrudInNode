// src/routes/carRoute.js
import express from 'express';
import { createCar, getCar, deleteCar, deleteCarbyId, updateCar } from '../controllers/carController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware for validating text fields
router.get('/', getCar);
router.post("/postcar", verifyToken, createCar);
router.delete("/deletecar", verifyToken, deleteCar);
router.delete('/deletecarbyid', verifyToken, deleteCarbyId);
router.put('/carupdate', verifyToken, updateCar);

export default router; // Use export default
