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
            try{
                await adress.create(req.body)    
                res.redirect('/user/adressdashboard')
            }
            catch(error){
                console.log(error)
            }
            
        },
        adressdashget: async (req,res)=>{
            const adressdash= await adress.find()
            res.render("userside/adressdash",{adressdash})
        },
        adressdelete: async (req,res)=>{
            const adressid=req.query.id;
            console.log("aaa",adressid)
            try{
              const abc=  await adress.deleteOne({_id:adressid});
              console.log(abc);
                res.json("deleted")
            }
            catch(error){
                console.log(error)
            }
           
           
        }
    
}