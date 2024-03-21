const addressSchema=require("../models/adress")
const productdetails=require("../models/addproduct")
const orders=require("../models/orders")
const { default: mongoose } = require("mongoose")
module.exports={
    checkoutGet: async (req,res)=>{
        if(req.session.user_id){
            try{
                const product=req.params.productId
                const productData=await productdetails.findOne({_id:product})
                const addresscheck=await addressSchema.find()
                res.render("userside/checkout",{addresscheck:addresscheck,data:productData})
            }catch(error){
                console.log(error)
            }
        }else{
            res.redirect("/")
        }
    },
    orderplacedGet:(req,res)=>{
        res.render("userside/orderplaced")
    },
        orderplacedPost: async (req, res) => {
            try {   
                console.log("Received request body:", req.body);
                const { paymentMethod,productid,totalprice } = req.body;
                const userId = req.session.user_id;
                const products = []
                products.push(new mongoose.Types.ObjectId( productid))
                const newOrder = new orders({
                    userID: userId,
                    products: products,
                    TotalPrice:totalprice,
                    PaymentMethod: paymentMethod,
                    status: 'pending'
                });
                console.log(newOrder)
                await newOrder.save()
                res.json({success:true})
            } catch (error) {
                console.log(error)
            }
        }
    
    
    
}