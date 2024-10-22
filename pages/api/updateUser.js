import connectDb from '@/middleware/mongoose'; // Adjust the import path as needed
import User from '../../models/User'; // Assuming you have a User model

export default async (req, res) => {
    await connectDb();

    if (req.method === 'PUT') {
        const userId = req.userId; // Get the user ID from the authenticated request
        const { name, email } = req.body;

        try {
            const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
            if (!user) return res.status(404).json({ success: false, message: 'User not found' });
            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
