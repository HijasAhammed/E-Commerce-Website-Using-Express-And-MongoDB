const { default: mongoose } = require("mongoose")
const addcart=require("../models/addcart.js")
module.exports={
    // addcartGet: async (req,res)=>{
    //     try{
    //         const cartdata= await addcart.find()
    //         res.render("userside/addToCart",{cartdata})
    //     }
    //     catch(error){
    //     console.error(error)
    //     res.status(500).send("Enternal Server Error")
    //     }
    // },
    addcartPost: async (req,res)=>{
        try{
            const userID=req.session.user_id
            if(!userID){
                return res.stutas(401).redirect('/login')
            }
            else{
                const productid=req.body.id
                const userID = req.session.user_id
                const id=new mongoose.Types.ObjectId(productid)
                const cart= await addcart.findOne({userID})
                if(!cart){
                    const newcart= new addcart({userID,items:[{productID:id,quantity:1}]})
                    await newcart.save()
                }
                else{
                    const productexist=cart.items.find(item=>item.productID==id)
                    if(productexist){
                        productexist.quantity += 1;
                    }
                    else{
                        cart.items.push({productID:id,quantity:1})
                        await cart.save()
                        const cartdetails=await addcart.findOne({userID})
                        res.render("userside/addToCart",{cartdetails})
                    }
                }
            }
        }
        catch(error){
            console.log(error)
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
}