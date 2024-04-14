const express = require('express');
const bcrypt = require('bcrypt');
const Alumni = require('../models/alumni');
const Student = require('../models/student');
const College = require('../models/college');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Register College Route
router.post('/register/college', async (req, res) => {
    try {
        const { name, location, website, description } = req.body;
        const college = await College.create({ name, location, website, description });
        res.status(201).json(college);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Register Student Route
router.post('/register/student', async (req, res) => {
    try {
        const { name, email, password, collegeId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({ name, email, password: hashedPassword, collegeId });
        res.status(201).json(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Register Alumni Route
router.post('/register/alumni', async (req, res) => {
    try {
        const { name, email, password, collegeId, graduationYear } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const alumni = await Alumni.create({ name, email, password: hashedPassword, collegeId, graduationYear });
        res.status(201).json(alumni);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Student.findOne({ email });
        let userType = 'student'; // Default user type is student
        if (!user) {
            user = await Alumni.findOne({ email });
            userType = 'alumni';
        }
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        // Generate JWT token
        const payload = {
            userId: user._id,
            userType: userType
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed
        res.cookie('token', token, { httpOnly: true });
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;