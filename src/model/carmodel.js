// src/model/carmodel.js
const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
 model: { type: String, unique: true, required: true },
 brand : { type: String, unique: true, required: true},
 year: { type: Number, required: true },
 drivenkm: { type: Number, required: true },
 price: { type: Number, required: true },
 });
module.exports = mongoose.model('Car', carSchema);