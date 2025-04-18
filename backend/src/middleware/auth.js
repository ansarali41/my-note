// filepath: /backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const verifyUser = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.validatePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.user = user;
    next();
};