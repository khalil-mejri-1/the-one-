const mongoose = require('mongoose');

const monalisaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number},
    originalPrice: { type: Number },
    discount: { type: Number}

});

module.exports = mongoose.model('monalisa', monalisaSchema);
