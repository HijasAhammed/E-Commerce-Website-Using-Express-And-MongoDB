const addressSchema = require("../models/adress")
const productdetails = require("../models/addproduct")
const orders = require("../models/orders")
const { default: mongoose } = require("mongoose")
const Razorpay = require("razorpay")
const razorpay = new Razorpay({
    key_id: process.env.RAZKEY,
    key_secret: process.env.RAZSECRET
});
module.exports = {
    checkoutGet: async (req, res) => {
        if (req.session.user_id) {
            try {
                const product = req.params.productId
                const productData = await productdetails.findOne({ _id: product })
                const addresscheck = await addressSchema.find()
                res.render("userside/checkout", { addresscheck: addresscheck, data: productData })
            } catch (error) {
                console.log(error)
            }
        } else {
            res.redirect("/")
        }
    },
    orderplacedGet: (req, res) => {
        res.render("userside/orderplaced")
    },
    orderplacedPost: async (req, res) => {
        try {
            const { paymentMethod, productid, totalprice, Address } = req.body;
            const userId = req.session.user_id;
            const trimmedAddress = Address.replace(/\s+/g, ' ').trim();
            const strippedAddress = trimmedAddress.replace(/<[^>]*>|&nbsp;/g, '');
            const productId = new mongoose.Types.ObjectId(productid);
            const products = [{
                id: productId
            }]

            const newOrder = new orders({
                userID: userId,
                products: products,
                TotalPrice: totalprice,
                PaymentMethod: paymentMethod,
                Address: strippedAddress,
                status: 'pending'
            });
            await newOrder.save()
            res.json({ success: true, payed: 'cod' })
        } catch (error) {
            console.log(error)
        }
    },
    razorpayPost: async (req, res) => {
        try {
            const { PaymentMethod, productid, totalprice, Address } = req.body;
            const userId = req.session.user_id;
            const trimmedAddress = Address.replace(/\s+/g, ' ').trim();
            const strippedAddress = trimmedAddress.replace(/<[^>]*>|&nbsp;/g, '');

            const productId = new mongoose.Types.ObjectId(productid);
            const products = [{
                id: productId
            }]

            const order = await razorpay.orders.create({
                amount: totalprice * 100, // Amount is in paise
                currency: 'INR',
                payment_capture: 1
            });
            const newOrder = new orders({
                userID: userId,
                products: products,
                TotalPrice: totalprice,
                PaymentMethod: PaymentMethod,
                Address: strippedAddress,
                status: 'pending' // Initial status
            });
            await newOrder.save();
            // Send the order ID back to the client
            res.status(200).json({ orderId: order.id, key: process.env.RAZKEY });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Failed to create order' });
        }
    }

}