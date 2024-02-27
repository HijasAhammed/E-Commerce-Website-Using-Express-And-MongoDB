const userschema=require("../models/signupdata")

module.exports ={
    admindash:(req,res)=>{
        res.render("admindash")
    },      
    userdetailsGet: async (req,res)=>{
        try{
            const userdetails=await userschema.find()
            res.render("adminside/userlist",{userdetails})
        }
        catch(error){
            console.log(error)
            console.log("cannot get user details")
        }
    },
    userdetailsPost:(req,res)=>{

    },


}       