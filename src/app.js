import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import protectedRoute from './routes/protectedroutes.js';
import carRoutes from './routes/carRoute.js';
import connectDB from './database/dbconnect.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/car', carRoutes);
app.use('/protected', protectedRoute);

const PORT = process.env.PORT || 3000; // Provide a default value for PORT
const MONGO_URI = process.env.MONGO_URL;

try {
    connectDB(MONGO_URI);
} catch (e) {
    console.error('Error connecting:', e.message);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
