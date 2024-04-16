const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    field: { type: String, required: true },
    location: { type: String, required: true },
    fullorpart: { type: String, required: true },
    closingDate: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }, // or Alumni
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;