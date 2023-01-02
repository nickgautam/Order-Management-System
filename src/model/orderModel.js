const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    productID: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true }
    
})

module.exports= mongoose.model("Order", orderSchema)