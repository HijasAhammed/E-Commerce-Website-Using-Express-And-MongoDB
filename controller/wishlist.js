const { default: mongoose } = require("mongoose")

const wishlistschema=require("../models/wishlist.js")
const productschema=require("../models/addproduct.js")
module.exports={
    wishlistGet: async (req,res)=>{
        try{
            const userID=req.session.user_id
            const data= await wishlistschema.aggregate([{
                $lookup:{
                    from:"addproducts",
                    localField:'items.productID',
                    foreignField: '_id',
                    as: 'newdata'
                }
            }])
          console.log(data)
            res.render("userside/wishlist",{data})    
        }
        catch(error){
        console.log(error)
        }
    },
    wishlistPost: async (req,res)=>{
        try{
            const userID=req.session.user_id
            if(!userID){
                return res.status(401).redirect('/')
            }
            else{
                const productid= req.query.id
                const id= new mongoose.Types.ObjectId(productid)
                const wishlist= await wishlistschema.findOne({userID})
                if(!wishlist){
                    const newwish=new wishlistschema({userID, items:[{productID: id,}]})
              const wishing =  await newwish.save()
                }
                else {
                    const productexist = wishlist.items.find((item)=> item.productID == productid)
                    if(productexist){
                        const updatedCart=await wishlistschema.findOneAndUpdate(
                            { userID: userID, 'items.productID': productid }, 
                            { new: true }
                        )
                    }
                    else{
                        product=[]
                        wishlist.items.push({productID: id,})
                        await wishlist.save()
                    }
                }
            }
            res.redirect("/user/wishlist")
        }
        catch(error){
            console.log(error)
        }
    }
}