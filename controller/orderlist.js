const ordersModel=require("../models/orders")

module.exports = {
    orderlistGet: async (req, res) => {
        try {
            const userId = req.session.user_id;
            const orders = await ordersModel.find({userID:userId}).populate('products.id');
           orders.forEach(data=>{
           })
            res.render("userside/orderlist", { orders }); 
        } catch (err) {
            console.error(err);
        }
    },
    cancelorder:async (req,res)=>{
        try{
            const orderId = req.params.orderId; 
            await ordersModel.findByIdAndUpdate(orderId, { status: 'cancelled' });
            res.redirect("/user/orderlist")
        }
        catch(error){
            console.log(error)
        }
    },
    ordersummary:(req,res)=>{
        res.render("userside/ordersummary")
    }
   
};