// src/model/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

export default User; // Make sure to export as default
