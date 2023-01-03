const express= require("express")
const router= express.Router()
const {authentication, authorization}= require("../middleware/auth.js")
const {createCustomer, customerLogin} = require("../controller/customerController.js")
const {createProduct} = require("../controller/productController.js")
const {createOrder} = require("../controller/orderController.js")
const {getAllPayments} = require("../controller/paymentController.js")

router.post("/customer", createCustomer)

router.post("/customerLogin", customerLogin)

router.post("/product", createProduct)

router.post("/order/:customerID", authentication, authorization, createOrder)

router.get("/payment", getAllPayments)


router.all("/**", (req,res)=>{
    return res.status(404).send({
        status:false, 
        msg:"The Api you are requesting is not available. Make sure your endpoint is correct or not"
    })
})

module.exports= router