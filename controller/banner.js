const bannerschema=require("../models/banner")
const bannermulter=require('../middileware/multer')


module.exports={
    bannerGet: async (req,res)=>{
        try{
            const bannershow = await bannerschema.find()
            res.render("adminside/banner",{product:bannershow})
        }
        catch(error){
            console.log(error)
        }
        
    },
    bannerPost:(req,res)=>{
        
    },
    addbannerGet: async (req,res)=>{
        try{
            res.render("adminside/addbanner")
        }
        catch(error){
            console.log(error)
        }
      
    },
    addbannerPost: async (req,res)=>{
        try{
            const{
                BannerName,
                Description,
                Offer,
                Startdate,
                Enddate,
            }=req.body
            const productimg = req.file? req.file.filename:'no image'
            const addbanner= new bannerschema({
                BannerName,
                Image:productimg,
                Description,
                Offer,
                Startdate,
                Enddate,
            });
            console.log(addbanner)
            await addbanner.save()
            res.redirect("/admin/banner")
        }
        catch(error){
            console.log(error)
        }
    },
    addbannerDelete: async (req,res)=>{
        try{
            const dltproduct=req.query.id
            console.log(dltproduct)
            if(dltproduct){
               const aa= await bannerschema.deleteOne({_id:dltproduct})
               console.log(aa);
                return res.status(200).json({success:true})
            }else{
                return res.status(404).json({success:false})
            }
        }catch(error){
            console.log(error)
        }
    }
    
}