// Import necessary modules and models
const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const Job = require('../models/job');

// Route to create a new event
router.post('/events', async (req, res) => {
    try {
        const { title, description, date, location, organize, collegeId } = req.body;
        const event = await Event.create({ title, description, date, location, organize, collegeId });
        res.status(201).json(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Route to create a new job
router.post('/jobs', async (req, res) => {
    try {
        const { title, field, location, fullorpart, closingDate, postedBy } = req.body;
        const job = await Job.create({ title, field, location, fullorpart, closingDate, postedBy });
        res.status(201).json(job);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/job-list', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/event-list', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
