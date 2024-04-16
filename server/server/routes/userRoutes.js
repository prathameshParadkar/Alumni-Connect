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

module.exports = router;