const adress=require("../models/adress")
module.exports={
        adressget: async (req,res)=>{
            try{
                const adressdata= await adress.find()
                res.render("userside/adress",{adressdata})
            }
            catch(error){
                console.log(error)
            }
           
        }
    
}