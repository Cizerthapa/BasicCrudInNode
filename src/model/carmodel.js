// src/model/carmodel.js
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    model: String,
    brand: String,
    year: Number,
    drivenkm: Number,
    price: Number
});

const Car = mongoose.model('Car', carSchema);

export default Car;
