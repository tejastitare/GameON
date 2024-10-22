const mongoose = require('mongoose');

// Check if the model already exists
const ImageDetails = mongoose.models.ImageDetails || mongoose.model('ImageDetails', new mongoose.Schema({
    name: { type: String, required: true },  // Make required fields explicit
    sport: { type: String, required: true },
    category: { type: String },
    slug: { type: String },
    location: {
        latitude: { type: String, required: false },  // Optional location
        longitude: { type: String, required: false }
    }
}, {
    collection: "ImageDetails"
}));

module.exports = ImageDetails;
