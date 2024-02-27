const { name } = require("ejs")
const adminschema=require("../models/category")
const category = require("../models/category")

module.exports={
    categoryGet: async (req,res)=>{
        try{
            const categoryData= await adminschema.find()
            res.render("adminside/category",{ categorydata:categoryData })
        }
        catch(error){
            console.log("error",)
        }
      
    },
    categoryPost: async (req,res)=>{
        try{
            const {Name}=req.body;
            console.log("Category Name is",Name);
            const Category=await adminschema.findOne({ categories:Name })
            if(!Category){
              categoryVar=new adminschema({
                    categories:Name,
                })
                await categoryVar.save();
                res.redirect("/admin/category")
            }
        }
        catch(error){
            console.log(error.message)
        }
        
    },
    deletecategory: async (req,res)=>{
        try{
            const categoryId=req.query.id
            console.log(categoryId);    
            if(categoryId){
                await adminschema.deleteOne({_id:categoryId})
                return res.status(200).json({success:true})
            }else {
                return res.status(404).json({success:false})

            }
            
            }
            catch(error){
                console.log(error)
            }
        }
       
}