const banner=require("../models/banner")
const products=require("../models/addproduct")
module.exports={
    userGet: async (req,res)=>{
        const bannerscheme= await banner.find()
       res.render("userside/userhome",{bannerscheme})
    },
    productdetailsGet: async (req,res)=>{
        const addproducts= await products.find()
        res.render("userside/productdetails",{addproducts})
    }
}