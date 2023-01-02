const express= require("express")
const router= express.Router()
const {createCustomer} = require("../controller/customerController.js")
const {createProduct} = require("../controller/productController.js")
const {createOrder} = require("../controller/orderController.js")


router.post("/customer", createCustomer)

router.post("/product", createProduct)

router.post("/order/:customerID", createOrder)


router.all("/**", (req,res)=>{
    return res.status(404).send({
        status:false, 
        msg:"The Api you are requesting is not available. Make sure your endpoint is correct or not"
    })
})

module.exports= router