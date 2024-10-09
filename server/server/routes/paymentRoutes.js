const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
//import dotenv
const dotenv = require('dotenv');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');



const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency, receipt, notes } = req.body;
        const options = {
            amount: amount * 100, // Convert amount to paise
            currency,
            receipt,
            notes,
        };
        console.log(options);


        const order = await razorpay.orders.create(options);
        console.log(order);
        // Read current orders, add new order, and write back to the file


        res.json(order); // Send order details to frontend, including order ID
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order');
    }
});

router.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = razorpay.key_secret;
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    try {
        const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
        if (isValidSignature) {
            // Update the order with payment details
            res.status(200).json({ status: 'ok' });
            console.log("Payment verification successful");
        } else {
            res.status(400).json({ status: 'verification_failed' });
            console.log("Payment verification failed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error verifying payment' });
    }
});

module.exports = router;