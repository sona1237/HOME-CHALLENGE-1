import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.post('/logout', (req, res) => {
    try {
        console.log('Request received to /api/logout');
        
        // Check if Authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log('No authorization header provided');
            return res.status(401).json({ message: 'No authorization header provided' });
        }

        // Extract token from Authorization header
        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log('No token provided in Authorization header');
            return res.status(401).json({ message: 'No token provided in Authorization header' });
        }

        console.log('Token:', token);

        // Verify the token
        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
            if (err) {
                console.error('Invalid token:', err);
                return res.status(401).json({ message: 'Invalid token' });
            }

            console.log('Decoded token:', decoded);

            // Here, you can perform any additional actions required upon logout, such as deleting user data, etc.
            // For example:
            // deleteUserData(decoded.userId);

            // Redirect to login page
            console.log('Logged out successfully');
            return res.status(200).json({ message: 'Logged out successfully', data:null });
        });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
