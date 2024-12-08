const mongoose = require('mongoose');

const deathnoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number},
    originalPrice: { type: Number },
    discount: { type: Number}

});

module.exports = mongoose.model('death_note', deathnoteSchema);
