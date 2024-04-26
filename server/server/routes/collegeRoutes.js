const express = require('express');
const router = express.Router();
const College = require('../models/college'); // Import the College model

// Route to fetch names of all colleges
router.get('/colleges', async (req, res) => {
    try {
        // Fetch all colleges from the database
        const colleges = await College.find({}, 'name'); // Only select the 'name' field
        res.json(colleges);
    } catch (error) {
        console.error('Error fetching colleges:', error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/collegeById', async (req, res) => {
    try {
        const { id } = req.body; // Get the ID from request body
        const college = await College.findById(id, 'name'); // Fetch only the name field using the ID
        if (!college) {
            return res.status(404).send('College not found');
        }
        res.json(college);
    } catch (error) {
        console.error('Error fetching student:', error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;