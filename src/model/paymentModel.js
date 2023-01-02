const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({

    customerID: { type: String, required: true, trim: true },
    productID: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    totalPrice: { type: Number, required: true, trim: true },
    discount: { type: Number, default: "null", trim: true },

})

module.exports = mongoose.model("Payment", paymentSchema)