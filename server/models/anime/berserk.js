const mongoose = require('mongoose');

const berserkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number},
    originalPrice: { type: Number },
    discount: { type: Number}

});

module.exports = mongoose.model('berserk', berserkSchema);
