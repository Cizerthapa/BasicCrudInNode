// src/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import Car from '../model/carmodel.js'; // Note: If Car isn't used in this file, you can remove this import.

const router = express.Router();

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

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
        time: Date(),
        userId: 12,
    };

    const token = jwt.sign(data, jwtSecretKey);
    const yo = req.headers.Cizer; // Use 'req.headers' to access headers
    console.log(yo);
    res.send(token);
});

// Car login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });
        return res.status(200).json({ message: "Login Success!", data: token });
    } catch (error) {
        return res.status(500).json({ error: 'Login failed', message: error.message });
    }
});

export default router;
