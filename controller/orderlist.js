const ordersModel=require("../models/orders")
const reviewModel=require("../models/review")
const addproductModel=require("../models/addproduct")
module.exports = {
    orderlistGet: async (req, res) => {
        try {
            const userId = req.session.user_id;
            const orders = await ordersModel.find({userID:userId}).populate('products.id');
            orders.forEach(or=>{
                // console.log(or.id,'dddssd');
            })
            res.render("userside/orderlist", { orders }); 
        } catch (err) {
            console.error(err);
        }
    },
    cancelorder:async (req,res)=>{
        try{
            const orderId = req.params.orderId; 
            await ordersModel.findByIdAndUpdate(orderId, { status: 'cancelled' });
            res.redirect("/user/orderlist")
        }
        catch(error){
            console.log(error)
        }
    },
    ordersummary:async(req,res)=>{
       try {
        const orderId = req.query.orderId
        const orderDetails = await ordersModel.findOne({_id:orderId}).populate("products.id")
        res.render("userside/ordersummary",{order:orderDetails});
       } catch (error) {
            console.log(error.message);

       }
    },
    reviewGet: async (req,res)=>{
        try{
            const orderid=req.query.orderId
            console.log(orderid)
            const orderdata= await ordersModel.findById(orderid)
            const product=orderdata.products
            let productID;
            console.log(product)
            if(product.length<=1){
                console.log("aah")
                productID=product[0].id
             

            }
            else{
                productID=product
            }
            const reviewdata= await reviewModel.find()
            console.log(productID)
            res.render("userside/review",{productID})
        }catch(error){
            console.log(error)
        }
        
    },
    reviewPost: async (req, res) => {
        if (req.session.user_id) {
            console.log(req.session.user_id)
            console.log(req.query.pro)
            const productID=req.query.pro
            productID.trim()
            try {
                const { review, comment } = req.body;
    console.log(req.body)
                // Check if the productID exists
                const product = await addproductModel.findById(productID);
                const userorder= await ordersModel.findOne({userID:req.session.user_id})
                const orderID=userorder._id
               const proid =product._id
                console.log(product,"pososososo")     
               
                if (!product) {

                    return res.status(400).send("Invalid productID");
                }
    
                // Create a new review
                const newReview = new reviewModel({
                    productID:proid,
                    review:[{UserId:req.session.user_id}],
                    comment     
                });
    
                // Save the review
                await newReview.save();
                console.log(newReview, "Review saved successfully");
                res.redirect(`/user/ordersummary/?orderId=${orderID}`);
            } catch (error) {
                console.log(error);
                res.status(500).send("Error saving review");
            }
        } else {
            res.status(403).send("Unauthorized");
        }
    },
    
    
};