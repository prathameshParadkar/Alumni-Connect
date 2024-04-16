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

module.exports = router;
