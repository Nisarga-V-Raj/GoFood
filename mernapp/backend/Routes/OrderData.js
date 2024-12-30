const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    const orderDate = new Date();
    const formattedDate = orderDate.toDateString();
    const orderWithDate = [{ Order_date: formattedDate }, ...data];
    console.log("Email:", req.body.email);
    let existingOrder = await Order.findOne({ email: req.body.email });
    if (!existingOrder) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [orderWithDate]
            });
            res.json({ success: true });
        } catch (error) {
            console.error("Error creating order:", error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    } else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: orderWithDate } }
            );
            res.json({ success: true });
        } catch (error) {
            console.error("Error updating order:", error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    }
});
router.post('/myOrderData', async (req, res) => {
    try {
        console.log("Fetching orders for email:", req.body.email);
        let existingOrder = await Order.findOne({ email: req.body.email });
        if (existingOrder) {
            res.json({ orderData: existingOrder });
        } else {
            res.json({ orderData: [] });
        }
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).send("Error: " + error.message);
    }
});
module.exports = router;