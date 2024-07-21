import express from 'express';
const router = express.Router();
import Order from '../Models/Orders.js'

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    console.log("1231242343242354", req.body.email)


    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            console.log(data)
            console.log("1231242343242354", req.body.email)
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        const email = req.body.email;
        console.log("Received email:", email);

        const myData = await Order.findOne({ email });

        if (myData) {
            console.log("Order data found:", myData);
            res.json({ orderData: myData });
        } else {
            console.log("No order data found for email:", email);
            res.json({ orderData: null });
        }
    } catch (error) {
        console.error("Error fetching order data:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

export default router;