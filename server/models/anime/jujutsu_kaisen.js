const mongoose = require('mongoose');

const jujutsukaisonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number},
    originalPrice: { type: Number },
    discount: { type: Number}

});

module.exports = mongoose.model('jujutsu_kaison', jujutsukaisonSchema);