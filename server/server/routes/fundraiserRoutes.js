// Import necessary modules and models
const express = require('express');
const router = express.Router();
const Fundraiser = require('../models/fundraiser');

router.get('/', async (req, res) => {
    try {
        const fundraisers = await Fundraiser.find();
        res.status(200).json({ success: true, data: fundraisers });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, targetAmount, deadline, collegeId } = req.body;
        if (!title || !description || !targetAmount || !deadline || !collegeId) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const fundraiser = new Fundraiser({
            title,
            description,
            targetAmount,
            deadline,
            collegeId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: req.user.id
        });
        const res = await fundraiser.save();
        res.status(201).json({ success: true, data: res });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, description, targetAmount, deadline, collegeId } = req.body;
        if (!title || !description || !targetAmount || !deadline || !collegeId) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const fundraiser = await Fundraiser.findById(req.params.id);
        if (!fundraiser) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }

        fundraiser.title = title;
        fundraiser.description = description;
        fundraiser.targetAmount = targetAmount;
        fundraiser.deadline = deadline;
        fundraiser.collegeId = collegeId;
        fundraiser.updatedAt = new Date().toISOString();

        const res = await fundraiser.save();
        res.status(200).json({ success: true, data: res });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
