const ordersModel=require("../models/orders")

module.exports = {
    orderlistGet: async (req, res) => {
        try {
            const userId = req.session.user_id;
            const orders = await ordersModel.find({userID:userId}).populate('products.id');
           orders.forEach(data=>{
           console.log( data.products[0]);
           })
            res.render("userside/orderlist", { orders }); 
        } catch (err) {
            console.error(err);
        }
    }
    
};