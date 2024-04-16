const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    linkedinId: { type: String },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;