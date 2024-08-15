// src/routes/auth.js
const express = require('express');
const router = express.Router();
const Car = require('../model/carmodel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User.js');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', errorMessage: error.message });
    }
});

router.post("/user/generateToken", (req, res) => {
    // Validate User Here

    // left to do here

    // Then generate JWT Token

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }

    const token = jwt.sign(data, jwtSecretKey);
    const yo = req.header.Cizer;
    console.log(yo);
    res.send(token);
});

// Car login
router.post('/login', async (req, res) => {
try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
    });
    return res.status(200).json({ token });
} catch (error) {
    return res.status(500).json({ error: 'Login failed', message: error.message });
}
});
module.exports = router;