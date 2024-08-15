const { body, validationResult } = require('express-validator');
const Car = require('../model/carmodel'); // Make sure this path is correct

module.exports = {
    createCar: async (req, res, next) => { 
        try {
            await body('model').isLength({ min: 2 }).withMessage('Model must be at least 2 characters long').run(req);
            await body('brand').isLength({ min: 2 }).withMessage('Brand must be at least 2 characters long').run(req);
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { model, brand, year, drivenkm, price } = req.body;
            const car = new Car({ model, brand, year, drivenkm, price });
            await car.save();
            res.status(201).json({ message: 'Car registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Registration failed', message: error.message });
        }
    },

    getCar: async (req, res, next) => {
        try {
            const cars = await Car.find();
            res.status(201).json({ message: 'Car get successful',cars });
        } catch (error) {
            next(error);
        }
    },

    updateCar : async (req, res, next) => {
        try {
            await body('brand').isLength({ min: 2 }).withMessage('Brand must be at least 2 characters long').run(req);
            await body('model').isLength({ min: 2 }).withMessage('Model must be at least 2 characters long').run(req);
            await body('newmodel').isLength({ min: 2 }).withMessage('New model must be at least 2 characters long').run(req);
    
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            const { model, newmodel, brand } = req.body;
            let car = await Car.findOneAndUpdate(
                { model, brand },
                { model: newmodel },
                { new: true }
            );
            
            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            } else {
                return res.status(200).json({ message: 'Car updated successfully', car });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

    },

    deleteCar: async (req, res, next) => {
        try {
            await body('model').isLength({ min: 2 }).withMessage('Model must be at least 2 characters long').run(req);
            await body('brand').isLength({ min: 2 }).withMessage('Brand must be at least 2 characters long').run(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { model, brand } = req.body;
            const car = await Car.findOneAndDelete({ model, brand });
            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.status(200).json({ message: 'Car deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Delete failed', message: error.message });
        }
    },

    deleteCarbyId: async  (req, res, next) => {
        try {
            await body('id').isLength({ min : 5}).withMessage('id must be at least 2 characters long').run(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.message() });
            }

            const { id } = req.body;    
            const car = await Car.findByIdAndDelete(id);
            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.status(200).json({ message: 'Car deleted successfully' });
        } catch (error) {

        }
    }
};
