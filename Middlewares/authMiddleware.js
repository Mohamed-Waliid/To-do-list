const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET 

const authMiddleware = (req, res, next) => {
try {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
} catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
}
};

module.exports = authMiddleware;
