// src/middleware/inputValidator.js
const {
    body,
    validationResult
} = require('express-validator');
const Car = require('./models/Car.js');

function validateTexts(Car) {
    if(Car.length === 0) { 
        return "Empty list"
    } else {
        if(Car.model.length === 0 || Car.brand.length === 0 || Car.year < 1940 || Car.drivenkm <= 0 || Car.price < 0) {
            return "Provide correct data"
        }
    }
}