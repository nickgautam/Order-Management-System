// const mongoose = require("mongoose")
const orderModel = require("../model/orderModel.js")
const customerModel = require("../model/customerModel.js")
const productModel = require("../model/productModel.js")
const paymentModel = require("../model/paymentModel.js")
const { isValidObjectId, isValidNumber } = require("../validation/validation.js")



exports.createOrder = async (req, res) => {
    try {
        const data = req.body
        const customerID = req.params.customerID
        
        if (!isValidObjectId(customerID)) return res.status(400).send({
            status: false,
            msg: ` customerID is invalid. It should be Like:---  63b346092ef889a113ea56ec `
        })
        
                const customerDetails = await customerModel.findById(customerID)
        
                if(!customerDetails) return res.status(400).send({
                    status: false,
                    msg: " No data found with this customerID "
                })

        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please Mention Data"
        })

        const { productID, quantity } = data
        if (!productID) return res.status(400).send({
            status: false,
            msg: "Please Mention productID"
        })

        if (!quantity) return res.status(400).send({
            status: false,
            msg: "Please Mention quantity"
        })

        if (!isValidObjectId(productID)) return res.status(400).send({
            status: false,
            msg: ` productID is invalid. It should be Like:---  63b346092ef889a113ea56ec `
        })

        if (isValidNumber(quantity)) return res.status(400).send({
            status: false,
            msg: " quantity must be number. "
        })

        const productDetails = await productModel.findById(productID)

        if (!productDetails) return res.status(400).send({
            status: false,
            msg: " No data found with this productID "
        })

        if (quantity > productDetails.quantity) return res.status(400).send({
            status: false,
            msg: " you can't order more than available quantity "
        })

        productDetails.price *= quantity

        if (+quantity >= 10 && +quantity < 20) {
            await customerModel.findOneAndUpdate({ _id: customerID }, { $set: { category: "gold" } }, { new: true, upsert: true })
        }

        if (+quantity >= 20) {
            await customerModel.findOneAndUpdate({ _id: customerID }, { $set: { category: "platinum" } }, { new: true, upsert: true })
        }

        let discount
        if (customerDetails.category == "gold") {
            discount = productDetails.price * 10 / 100
        }

        if (customerDetails.category == "platinum") {
            discount = productDetails.price * 20 / 100
        }

        const saveData = await orderModel.create(data)
        await paymentModel.create({ customerID: customerID, productID: productID, quantity: quantity, totalPrice: productDetails.price, discount: discount || null })

        return res.status(201).send({ status: true, msg: "Order Created Successfully", data: saveData })

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}