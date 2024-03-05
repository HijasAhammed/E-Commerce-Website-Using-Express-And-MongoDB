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
            console.log("you")
            const userID=req.session.user_id
            if(!userID){
                console.log("namaskar"+userID)
                return res.stutas(401).redirect('/login')
            }
            else{
                const productid=req.body.id
                const userID = req.session.user_id
                const id=new mongoose.Types.ObjectId(productid)
                console.log("userid"+userID)
                const cart= await addcart.findOne({userID})

                console.log("cart"+cart)
                if(!cart){
                    console.log("hallo")
                    const newcart= new addcart({userID,items:[{productID:id,quantity:1}]})
                    await newcart.save()
                }
                else{
                    console.log("how");
                    const productexist=cart.items.find(item=>item.productID==id)
                    console.log("product"+productexist)
                    if(productexist){
                        productexist.quantity += 1;
                    }
                    else{
                        console.log('are')
                        cart.items.push({productID:id,quantity:1})
                        await cart.save()
                        const cartdetails=await addcart.findOne({userID})
                        // const count = cartdetails.productid.length
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