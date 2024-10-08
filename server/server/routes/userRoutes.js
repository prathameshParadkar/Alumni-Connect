const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Alumni = require('../models/alumni');
const College = require('../models/college');
// Route to fetch names of all colleges
router.get('/students', async (req, res) => {
    try {
        // Fetch all colleges from the database
        const student = await Student.find({}, 'name'); // Only select the 'name' field
        res.json(student);
    } catch (error) {
        console.error('Error fetching colleges:', error.message);
        res.status(500).send('Server Error');
    }
});

// router.get('/alumni', async (req, res) => {
//     try {
//         // Fetch all colleges from the database
//         const alumni = await Alumni.find({}, 'name'); // Only select the 'name' field
//         res.json(alumni);
//     } catch (error) {
//         console.error('Error fetching colleges:', error.message);
//         res.status(500).send('Server Error');
//     }
// });

router.post('/studentById', async (req, res) => {
    try {
        const { id } = req.body; // Get the ID from request body
        const student = await Student.findById(id, 'name'); // Fetch only the name field using the ID
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student:', error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/alumniById', async (req, res) => {
    try {
        const { id } = req.body; // Get the ID from request body
        const alumni = await Alumni.findById(id, 'name'); // Fetch only the name field using the ID
        if (!alumni) {
            return res.status(404).send('Alumni not found');
        }
        res.json(alumni);
    } catch (error) {
        console.error('Error fetching alumni:', error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/fetchById', async (req, res) => {
    try {
        const { id } = req.body; // Get the ID from the request body
        let userData = {};
        // console.log(id)

        // Check in the student table
        const student = await Student.findById(id, 'name email');
        if (student) {
            userData = { ...student._doc, userType: 'Student' };
        }
        console.log(userData)
        // If not found in student table, check in the alumni table
        if (!userData._id) {
            const alumni = await Alumni.findById(id, 'name email');
            if (alumni) {
                userData = { ...alumni._doc, userType: 'Alumni' };
            }
        }

        // If not found in alumni table, check in the college table
        if (!userData._id) {
            const college = await College.findById(id, 'name email');
            if (college) {
                userData = { ...college._doc, userType: 'College' };
            }
        }

        // If no user found with the given ID in any table, return 404
        if (!userData._id) {
            res.status(404).send('User not found');
            return;
        }

        res.json(userData);
    } catch (error) {
        console.log('Error fetching user data:', error);
        res.status(500).send('Server Error');
    }
});


router.post('/studentDetById', async (req, res) => {
    try {
        const { id } = req.body; // Get the ID from request body
        const student = await Student.findById(id); // Fetch only the name field using the ID
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student:', error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/alumniDetById', async (req, res) => {
    try {
        const { id } = req.body; // Get the ID from request body
        const alumni = await Alumni.findById(id); // Fetch only the name field using the ID
        if (!alumni) {
            return res.status(404).send('Alumni not found');
        }
        res.json(alumni);
    } catch (error) {
        console.error('Error fetching alumni:', error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;