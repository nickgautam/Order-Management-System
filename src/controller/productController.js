// const mongoose = require("mongoose")
const productModel = require("../model/productModel.js")
const { isValidString, isValidNumber, isValidName } = require("../validation/validation.js")



exports.createProduct = async (req, res) => {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please Mention Data"
        })

        const { item, quantity, size, price } = data
        if (!item) return res.status(400).send({
            status: false,
            msg: "Please Mention item"
        })

        if (!quantity) return res.status(400).send({
            status: false,
            msg: "Please Mention quantity"
        })

        if (!size) return res.status(400).send({
            status: false,
            msg: "Please Mention size"
        })

        if (!price) return res.status(400).send({
            status: false,
            msg: "Please Mention price"
        })

        if (!isValidName(item)) return res.status(400).send({
            status: false,
            msg: " item is invalid. It should be Like:---  'Shirt' "
        })

        if (isValidNumber(quantity)) return res.status(400).send({
            status: false,
            msg: " quantity must be number. "
        })

        if (isValidNumber(price)) return res.status(400).send({
            status: false,
            msg: " price must be number. "
        })

        if (!isValidString(size)) return res.status(400).send({
            status: false,
            msg: " size must be string. Like:---  'S', 'M', 'L', 'XL', 'XXL' "
        })

        if (["S", "M", "L", "XL", "XXL"].indexOf(size.toUpperCase()) == -1) return res.status(400).send({
            status: false,
            msg: " size must be string. Like:---  'S', 'M', 'L', 'XL', 'XXL' "
        })

        data.item = item.toLowerCase()
        data.size = size.toUpperCase()

        const saveData = await productModel.create(data)

        return res.status(201).send({ status: true, msg: "Product Created Successfully", data: saveData })

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}