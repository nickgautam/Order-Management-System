const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    item: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    size: { type: String, required: true, enum: ["S", "M", "L", "XL", "XXL"], trim: true },
    price: { type: Number, required: true, trim: true }

})

module.exports = mongoose.model("Product", productSchema)