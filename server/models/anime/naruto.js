// models/Naruto.js
const mongoose = require('mongoose');

const NarutoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number},
    originalPrice: { type: Number },
    discount: { type: Number}

});

module.exports = mongoose.model('Naruto', NarutoSchema);
