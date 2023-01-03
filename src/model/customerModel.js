const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({

    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, unique: true, trim: true },
    mobile: { type: Number, required: true, unique: true, trim: true },
    address: { type: String, required: true, trim: true },
    category: { type: String, enum: ["regular", "gold", "platinum"], default: "regular", trim: true }, 
    isDeleted: {type: Boolean, default:false, trim: true}

})

module.exports= mongoose.model("Customer", customerSchema)