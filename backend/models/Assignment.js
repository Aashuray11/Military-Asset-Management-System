const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  assignedTo: { type: String, required: true }, // personnel identifier
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['assigned','expended','returned'], default: 'assigned' },
  notes: { type: String },
  assignedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
