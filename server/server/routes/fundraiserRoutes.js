// Import necessary modules and models
const express = require('express');
const router = express.Router();
const Fundraiser = require('../models/fundraiser');
const axios = require('axios');
const e = require('express');
const { ObjectId } = require('mongodb');

const url = 'http://3.108.236.192:8080/blockchain';


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
        const { title, description, targetAmount, createdBy, deadline, collegeId } = req.body;
        if (!title || !description || !targetAmount || !deadline || !collegeId) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        console.log("Creating fundraiser", req.body)

        const fundraiser = new Fundraiser({
            title,
            description,
            targetAmount,
            deadline,
            collegeId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy
        });
        const response = await fundraiser.save();
        res.status(201).json({ success: true, data: response });
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


const getFundraiserById = async (req, res, next) => {
    try {
        const fundraiserId = req.params.id;
        const fundraiser = await Fundraiser.findById(ObjectId(fundraiserId));

        console.log("Getting fundraiser", fundraiserId, fundraiser)
        if (!fundraiser) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }
        const donations = await axios.get(url + '/donations/' + fundraiserId);
        console.log(donations.data);
        console.log(donations.data.data);

        const obj = {
            ...fundraiser._doc,
            donations: donations.data.data
        }

        res.status(200).json({ success: true, data: obj });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

router.get('/:id', getFundraiserById);

const donate = async (req, res,) => {
    try {
        const { amount, userId, userName, userEmail, message } = req.body;
        const fundraiserId = req.params.id;
        console.log("Donating", fundraiserId)
        if (!amount || !userId || !userName || !userEmail || !message || !fundraiserId) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        //check if fundraiser exists
        const fundraiser = await Fundraiser.findById(ObjectId(fundraiserId));
        if (!fundraiser) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }

        console.log({ ...req.body, fundraiseId: `${fundraiserId}` })
        // const response = 'hey'
        const response = await axios.post(url + '/create', { ...req.body, fundraiseId: `${fundraiserId}` });

        console.log(response.data.data)
        // update currentAmount in fundraiser
        fundraiser.currentAmount += amount;
        await fundraiser.save();
        res.status(201).json({ success: true, data: response.data.data });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}

router.post('/:id/donate', donate);

module.exports = router;
