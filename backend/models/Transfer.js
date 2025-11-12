const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  fromBase: { type: String, required: true },
  toBase: { type: String, required: true },
  quantity: { type: Number, required: true },
  executedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  executedAt: { type: Date, default: Date.now },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transfer', TransferSchema);
