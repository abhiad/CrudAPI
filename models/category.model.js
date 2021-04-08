const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    category_name: String,
    createdAt: Date,
    updatedAt: Date,
    category_details:
        [{
            product_name: String,
            quantity: Number,
            price: String,
            createdAt: Date,
            updatedAt: Date,
        }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);