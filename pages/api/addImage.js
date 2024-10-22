import ImageDetails from '@/models/ImageDetails';
import connectDb from '@/middleware/mongoose';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb', // Adjust as needed
        },
    },
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { name, sport, location } = req.body;
        try {
            if (!name || !sport || !location) {
                throw new Error('Required fields are missing');
            }

            const newImageDetails = new ImageDetails({
                name,
                sport,
                location
            });

            await newImageDetails.save();
            res.status(200).send({ status: "ok", message: "Sport Registered" });
        } catch (error) {
            console.error("Error uploading data:", error);
            res.status(400).send({ status: "error", message: "Failed to save data", error: error.message });
        }
    } else {
        res.status(405).json({ error: "This method is not allowed." });
    }
};

export default connectDb(handler);
