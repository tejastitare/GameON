const mongoose = require('mongoose');

// Check if the model already exists
const ImageDetails = mongoose.models.ImageDetails || mongoose.model('ImageDetails', new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    sport: { type: String },
    // image: { type: String },
    category: { type: String },
    slug: { type: String },
    location: {
        latitude: String,
        longitude: String   
    }
}, {
    collection: "ImageDetails"
}));

module.exports = ImageDetails;
