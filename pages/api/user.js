import connectDb from '@/middleware/mongoose'; // Ensure this path is correct
import User from '../../models/User'; // Ensure you have a User model defined
import jwt from 'jsonwebtoken'; // Ensure JWT is installed

// Function to verify the JWT token
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err); // Token verification failed
            } else {
                resolve(decoded); // Token verified, return decoded payload
            }
        });
    });
};

// Main API handler function
const handler = async (req, res) => {
    if (req.method === 'GET') {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
        
        if (!token) {
            return res.status(401).json({ success: false, error: 'Unauthorized - No token' });
        }

        try {
            // Verify the token and decode it
            const decoded = await verifyToken(token);

            // Fetch the user from the database using the decoded token's user ID
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }

            // Return the user's data
            return res.status(200).json({ success: true, user });
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(401).json({ success: false, error: 'Unauthorized - Invalid token' });
        }
    } else {
        // If the method is not GET, return method not allowed
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }
};

export default connectDb(handler);
