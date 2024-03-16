const { default: mongoose } = require("mongoose")
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
        },
        adresspost: async (req,res)=>{
            if(req.session.user_id){
                try{
                    const userid=new mongoose.Types.ObjectId(req.session.user_id);
                    const datas={   
                        Name:req.body.Name,
                        Locality:req.body.Locality,
                        Phone:req.body.Phone,
                        District:req.body.District,
                        State:req.body.State,
                        City:req.body.City,
                        HouseName:req.body.HouseName,
                        Pincode:req.body.Pincode,
                    };
                    const updateaddress=await adress.findOneAndUpdate(
                        {user:userid},
                        {$push:{address:datas}},
                        {upsert:true,new:true}
                    );
                    res.redirect("/user/adressdashboard")
                }catch(error){
                    console.log(error)
                }
            }
        },
        adressdashget: async (req,res)=>{
            const adressdash= await adress.find()
            res.render("userside/adressdash",{adressdash})
        },
        adressdelete: async (req,res)=>{
            const adressid=req.query.id;
            const userId = req.session.user_id
            try{
              const abc=  await adress.updateOne({user:userId},{$pull:{address:{_id:adressid}}});
                res.json("deleted")
            }
            catch(error){
                console.log(error)
            }
        }
    
}