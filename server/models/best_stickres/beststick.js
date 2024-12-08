const mongoose = require('mongoose');

const beststickSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number},
    originalPrice: { type: Number },
    discount: { type: Number}


});

module.exports = mongoose.model('best stickres ', beststickSchema);
