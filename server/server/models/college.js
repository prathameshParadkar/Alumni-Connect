const mongoose = require('mongoose');

// College Schema
const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;