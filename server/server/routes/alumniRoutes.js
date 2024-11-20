const express = require('express');
const router = express.Router();
const Alumni = require('../models/alumni');

router.get('/', async (req, res) => {
    console.log('GET /api/alumni')
    try {
        const alumni = await Alumni.aggregate([
            {
                $lookup: {
                    from: 'colleges',
                    localField: 'collegeId',
                    foreignField: '_id',
                    as: 'college'
                }
            },
            {
                $unwind: '$college'
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    // graduationYear: 1,
                    college: '$college.name'
                }
            }
        ]);
        res.status(200).json(alumni);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;