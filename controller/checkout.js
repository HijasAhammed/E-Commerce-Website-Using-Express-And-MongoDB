const addressSchema=require("../models/adress")

module.exports={
    checkoutGet: async (req,res)=>{
        try{
            const addresscheck=await addressSchema.find()
            res.render("userside/checkout",{addresscheck})
        }catch(error){
            console.log(error)
        }
       
    }
}