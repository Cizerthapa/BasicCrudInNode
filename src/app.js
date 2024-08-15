// src/app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedroutes.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const carRoutes = require('./routes/carRoute.js');
const verifyToken = require('./middleware/authMiddleware.js');

dotenv.config();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/car', verifyToken, carRoutes);

app.use('/protected', protectedRoute);
const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URL;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.error('Database connection failed:', error));

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});