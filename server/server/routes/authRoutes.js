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
        const { name, email, password, linkedin_url, collegeName } = req.body;

        // Find collegeId based on collegeName
        const college = await College.findOne({ name: collegeName });
        if (!college) {
            return res.status(400).json({ message: 'College not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({ name, email, password: hashedPassword, linkedin: linkedin_url, collegeId: college._id });
        res.status(201).json(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Register Alumni Route
router.post('/register/alumni', async (req, res) => {
    try {
        const { name, email, password, linkedin_url, collegeName } = req.body;

        // Find collegeId based on collegeName
        const college = await College.findOne({ name: collegeName });
        if (!college) {
            return res.status(400).json({ message: 'College not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const alumni = await Alumni.create({ name, email, password: hashedPassword, linkedin: linkedin_url, collegeId: college._id });
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

// Update Alumni and Student Route
router.put('/update', async (req, res) => {
    try {
        const { name, work_experience, skills, education } = req.body;
        let user = await Student.findOne({ name });
        let userType = 'student';
        if (!user) {
            user = await Alumni.findOne({ name });
            userType = 'alumni';
        }
        if (!user) {
            return res.status(400).json({ message: 'Not found' });
        }
        let userModel;
        if (userType === 'alumni') {
            userModel = Alumni;
        } else if (userType === 'student') {
            userModel = Student;
        } else {
            return res.status(400).json({ message: 'Invalid user type' });
        }

        // Find the user by name and update the fields
        const updatedUser = await userModel.findOneAndUpdate(
            { name: name },  // Find user by name
            {
                $set: {
                    work_experience: work_experience,
                    skills: skills,
                    education: education
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: `${userType} not found` });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;