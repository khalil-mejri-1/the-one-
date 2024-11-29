const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  tlf: { type: Number, required: true },
  nb: { type: Number, required: true },
  ids: [
    {
      id: { type: String, required: true },       // معرف المنتج
      quantity: { type: Number, required: true },
      category: { type: String, required: true },
      size: { type: String, required: true },      // إضافة حقل الحجم
    },
  ],
  randomNumber: { type: Number, required: true }, // إضافة حقل الرقم العشوائي
});

module.exports = mongoose.model('command', commandSchema);
