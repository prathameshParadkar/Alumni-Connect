const express = require('express');
const router = express.Router();
const verifyTokenFromCookie = require('../middleware/verifyToken');

// Protected route example
router.get('/protected-route', verifyTokenFromCookie, (req, res) => {
    // Access user information from req.user
    const userId = req.user.userId;
    const userType = req.user.userType;
    res.json({ message: 'Access granted to protected route', userId, userType });
});

module.exports = router;
