// Import Mongoose
const mongoose = require('mongoose');

// College Schema
const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    linkedinId: { type: String },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Alumni Schema
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

// Job Schema
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }, // or Alumni
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Event Schema
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // or Alumni
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Define Models
const College = mongoose.model('College', collegeSchema);
const Student = mongoose.model('Student', studentSchema);
const Alumni = mongoose.model('Alumni', alumniSchema);
const Job = mongoose.model('Job', jobSchema);
const Event = mongoose.model('Event', eventSchema);

// Export Models
module.exports = {
    College,
    Student,
    Alumni,
    Job,
    Event
};
