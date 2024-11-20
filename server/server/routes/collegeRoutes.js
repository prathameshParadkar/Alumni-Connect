const express = require('express');
const router = express.Router();
const College = require('../models/college'); // Import the College model
const Fundraiser = require('../models/fundraiser');
const { createObjectCsvWriter } = require('csv-writer');
require('dotenv').config();


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


router.get('/college/fundraisers', async (req, res) => {
    try {
        const fundraisers = await Fundraiser.find({ status: 'pending' });
        res.status(200).json({ success: true, data: fundraisers });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/appendToCSV', async (req, res) => {
    try {
        const { data } = req.body; // Expect an array of JSON objects in the request body
        if (!Array.isArray(data)) {
            return res.status(400).json({ success: false, message: 'Data should be an array of objects.' });
        }

        const csvFilePath = process.env.CSV_FILE_PATH;
        if (!csvFilePath) {
            return res.status(500).json({ success: false, message: 'CSV file path not configured.' });
        }

        // Define the CSV writer
        const csvWriter = createObjectCsvWriter({
            path: csvFilePath,
            header: [
                { id: 'name' },
                { id: 'linkedin_url' },
                { id: 'work_titles' },
                { id: 'current_education' },
                { id: 'skills' },
            ],
            append: true, // Appends to the file if it exists
        });

        // Write data to the CSV
        await csvWriter.writeRecords(data);

        res.status(200).json({ success: true, message: 'Data successfully appended to CSV.' });
    } catch (error) {
        console.error('Error appending to CSV:', error.message);
        res.status(500).json({ success: false, message: 'Failed to append data to CSV.' });
    }
});

module.exports = router;