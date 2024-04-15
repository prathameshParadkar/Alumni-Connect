const express = require('express');
const router = express.Router();
const Student = require('../models/student'); 
const Alumni = require('../models/alumni'); 
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

router.get('/alumni', async (req, res) => {
    try {
        // Fetch all colleges from the database
        const alumni = await Alumni.find({}, 'name'); // Only select the 'name' field
        res.json(alumni);
    } catch (error) {
        console.error('Error fetching colleges:', error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;