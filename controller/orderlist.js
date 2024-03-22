const ordersModel=require("../models/orders")

module.exports = {
    orderlistGet: async (req, res) => {
        try {
            const userId = req.session.user_id;
            const orders = await ordersModel.find({userID:userId}).populate('products.id');
            orders.forEach(or=>{
                console.log(or.id,'dddssd');
            })
            console.log(orders,"sassa");
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
    ordersummary:async(req,res)=>{
       try {
        const orderId = req.query.orderId
        const orderDetails = await ordersModel.findOne({_id:orderId}).populate("products.id")
        console.log(orderDetails,"ssss");
        res.render("userside/ordersummary",{order:orderDetails});
       } catch (error) {
            console.log(error.message);

       }
    }
   
};