const { default: _default } = require('concurrently');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ProductCategory', 
        required: true 
    },
    name: { type: String, required: true, unique: true }, 
    imageUrl: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    discount: { type: Number, required: true }, 
    maxCount: { type: Number, required: false, default: 5 },
});

module.exports = mongoose.model('Product', productSchema);
