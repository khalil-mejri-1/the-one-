// models/Naruto.js
const mongoose = require('mongoose');

const Detective_ConanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number},
    originalPrice: { type: Number },
    discount: { type: Number}

});

module.exports = mongoose.model('Detective_ConanSchema', Detective_ConanSchema);
