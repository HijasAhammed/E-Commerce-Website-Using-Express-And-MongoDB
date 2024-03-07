const { default: mongoose } = require("mongoose")
const addcart = require("../models/addcart.js")
const productschema = require("../models/addproduct.js")
module.exports = {
    addcartGet: async (req,res)=>{
        try{
            const userID = req.session.user_id
            const datas = await addcart.aggregate([{
                $lookup: {
                    from: "addproducts",
                    localField: 'items.productID',
                    foreignField: '_id',
                    as: 'newpro'
                }
            }])
            res.render("userside/addToCart",{datas})
        }
        catch(error){
        console.error(error)
        res.status(500).send("Enternal Server Error")
        }
    },
    addcartPost: async (req, res) => {
        try {
            const userID = req.session.user_id
            if (!userID) {
                return res.status(401).redirect('/')
            }
            else {
                const productid = req.query.id
                const userID = req.session.user_id
                const id = new mongoose.Types.ObjectId(productid)
                const cart = await addcart.findOne({ userID })
                let product;
                if (!cart) {
                    const newcart = new addcart({ userID, items: [{ productID: id, quantity: 1 }] })
                    await newcart.save()
                }
                else {
                    const productexist = cart.items.find((item) => item.productID == productid)
                        if (productexist) {
                            const updatedCart = await addcart.findOneAndUpdate(
                                { userID: userID, 'items.productID': productid }, // Find the cart with given _id and matching productId
                                { $inc: { 'items.$.quantity': 1} }, // Increment the quantity of the matching item
                                { new: true } // Return the updated document
                            );
                        }
                    else {
                        product = []
                        cart.items.push({ productID: id, quantity: 1 })
                        await cart.save()
                    }
                }
            }
            res.redirect("/user/cart")
        }
        catch (error) {
            console.log(error)
            return res.status(500).send('internal server error');
        }
    }
}