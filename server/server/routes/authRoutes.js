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
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const college = await College.create({ name, email, password: hashedPassword, role });
        res.status(201).json(college);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/register/student', async (req, res) => {
    try {
        const { name, email, password, collegeName } = req.body;

        // Find collegeId based on collegeName
        const college = await College.findOne({ name: collegeName });
        if (!college) {
            return res.status(400).json({ message: 'College not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({ name, email, password: hashedPassword, collegeId: college._id });
        res.status(201).json(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Register Alumni Route
router.post('/register/alumni', async (req, res) => {
    try {
        const { name, email, password, collegeName } = req.body;

        // Find collegeId based on collegeName
        const college = await College.findOne({ name: collegeName });
        if (!college) {
            return res.status(400).json({ message: 'College not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const alumni = await Alumni.create({ name, email, password: hashedPassword, collegeId: college._id });
        res.status(201).json(alumni);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/register/linkedin', async (req, res) => {
    try {
        const { name, email, userType, collegeId } = req.body;
        console.log(req.body, "register linkedin body");
        let user;
        if (userType === 'student') {
            user = await Student.findOne({ email });
            if (!user) {
                user = await Student.create({ name, email, collegeId });
            }

        } else {
            user = await Alumni.findOne({ email });
            if (!user) {
                user = await Alumni.create({ name, email, collegeId });
            }
        }
        // user = await Alumni.findOne({ email });
        console.log("db user", user);
        const payload = {
            userId: user._id,
            userType: userType,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed
        res.cookie('token', token, {
            sameSite: 'lax',
            secure: true,
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body, "login body")
    try {
        const { email, password } = req.body;
        let user = await Student.findOne({ email });
        let userType = 'student';
        if (!user) {
            user = await Alumni.findOne({ email });
            userType = 'alumni';
        }
        if (!user) {
            user = await College.findOne({ email });
            userType = 'college';
        }
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const payload = {
            userId: user._id,
            userType: userType,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed
        res.cookie('token', token, {
            sameSite: 'lax',
            secure: true,
        });
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;