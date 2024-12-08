const mongoose = require('mongoose');

const attack_on_titanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number},
    originalPrice: { type: Number },
    discount: { type: Number}

});

module.exports = mongoose.model('attack on titan', attack_on_titanSchema);
