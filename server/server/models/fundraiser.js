const mongoose = require('mongoose');

const fundraiseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // or Alumni
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'pending', 'inactive'], default: 'pending' }
});

const Fundraiser = mongoose.model('Fundraiser', fundraiseSchema);

module.exports = Fundraiser;