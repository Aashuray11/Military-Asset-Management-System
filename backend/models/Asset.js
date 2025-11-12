const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., vehicle, weapon, ammo
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  base: { type: String, required: true },
  metadata: { type: Object },
  status: { type: String, enum: ['available','assigned','expended','maintenance'], default: 'available' },
}, { timestamps: true });

module.exports = mongoose.model('Asset', AssetSchema);
