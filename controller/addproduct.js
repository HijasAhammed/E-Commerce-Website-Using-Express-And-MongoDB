const productmodel=require("../models/addproduct")
const categorymodel=require("../models/category")
const { updateOne } = require("../models/signupdata")
module.exports={
    addproductGet: async (req,res)=>{ 
        try{
            const catgory= await categorymodel.find()
            res.render("adminside/addproduct",{catgory})
        }
        catch(error){
            console.log(error)
        }
    },
    addproductPost: async (req,res)=>{
        try{
            const {
                ProductName,
                Category,       
                Price,
                Quantity,
                DeliveryDate,
                Description,
            }=req.body;
            const productimg = req.files ? req.files.map(img=>img.filename):'no image' 
            const addproduct= new productmodel({
                ProductName,
                Category,
                Price,
                Quantity,
                DeliveryDate,
                Description,
                productimg,
            });
                await addproduct.save()
                res.redirect('/admin/editproduct')
            }
            catch(error){
                console.log(error)
            }
        },
        editproductGet: async (req,res)=>{
            try{
                const editproduct= await productmodel.find()
                res.render("adminside/editproduct",{products:editproduct})
            }catch(error){
                console.log(error)
            }
        },
        editprGet: async (req,res)=>{
            const id=req.params.id
            const productedit= await productmodel.findById(id)
            const allcategory= await categorymodel.find()
            console.log(productedit)
            res.render("adminside/editpr",{productedit,allcategory})
        },
        editprPost:async (req,res)=>{
            try{
                const id=req.params.id
                const{
                    ProductName,
                    Category,
                    Price,
                    Quantity,
                    Description,
                }=req.body
                let productimg;
                if(req.files.length>0){
                    productimg=req.files.map((img)=>img.filename)
                }else{
                    const productdetails = await productmodel.findOne({_id:id})
                    productimg = productdetails.productimg.map((img)=>img)
                }
               
                await productmodel.findByIdAndUpdate(id,{
                    $set:{
                        ProductName:ProductName,
                        Category:Category,
                        Price: Price,
                        Quantity:Quantity,
                        Description:Description,
                        productimg:productimg,
                    }
                })
               res.redirect("/admin/editproduct")
            }
            catch(error){
                console.log(error)
            }    
        },  
        deleteproduct: async(req,res)=>{
            try{
                const dltproduct=req.query.id
                console.log(dltproduct)
                if(dltproduct){
                   const aa= await productmodel.deleteOne({_id:dltproduct})
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

