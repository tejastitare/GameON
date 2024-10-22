const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String },
  video: { type: String }, // Add video field here
  img: { type: String },
  category: { type: String }, // Press, or other categories
  sport: { type: String }, // New field for sports like 'cricket', 'kabaddi', etc.
  color: { type: String },
  size: { type: String },
  availableQty: { type: Number, default: 0 },
}, {
  collection: "products",
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
