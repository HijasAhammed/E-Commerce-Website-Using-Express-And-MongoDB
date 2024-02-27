const banner=require("../models/banner")
const products=require("../models/addproduct")
module.exports={
    userGet: async (req,res)=>{
        const bannerscheme= await banner.find()
        const addproducts= await products.find()
       res.render("userside/userhome",{bannerscheme,addproducts})
    },
    productdetailsGet:(req,res)=>{
        res.render("userside/productdetails")
    }
}