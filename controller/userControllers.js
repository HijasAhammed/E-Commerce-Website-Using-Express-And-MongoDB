const banner=require("../models/banner")
const products=require("../models/addproduct")
const ReviewSchema = require('../models/review')
module.exports={
    userGet: async (req,res)=>{
        const bannerscheme= await banner.find()
        const addproducts= await products.find()
       res.render("userside/userhome",{bannerscheme,addproducts})
    },
    productdetailsGet: async (req,res)=>{
        const data=req.query.id
        const review = await ReviewSchema.find({productID:req.query.id}).populate("review.UserId")
            console.log(review);
        const showproducts= await products.findOne({_id:data})
        res.render("userside/productdetails", { showproducts, reviewone: review ? review : null });
    }
}