const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    linkedinId: { type: String },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    graduationYear: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;