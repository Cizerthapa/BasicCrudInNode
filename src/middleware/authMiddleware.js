// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    console.log('verifying Token');
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
        console.log('verifying Token Done');
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;