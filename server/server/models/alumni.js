const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    email: { type: String, required: true },
    password: { type: String,  },
    linkedinId: { type: String },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;