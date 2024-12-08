const mongoose = require('mongoose');

const Art_numériqueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number},
    originalPrice: { type: Number },
    discount: { type: Number}

});

module.exports = mongoose.model('Art numérique', Art_numériqueSchema);
