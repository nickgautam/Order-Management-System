// const mongoose = require("mongoose")
const customerModel = require("../model/customerModel.js")
const { isValidObjectId, isValidString, isValidNumber, isValidName, isValidMobileNo, isValidEmailId } = require("../validation/validation.js")



exports.createCustomer = async (req, res) => {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please Mention Data"
        })

        const { fullName, email, mobile, address, category } = data
        if (!fullName) return res.status(400).send({
            status: false,
            msg: "Please Mention fullName"
        })

        if (!email) return res.status(400).send({
            status: false,
            msg: "Please Mention email id"
        })

        if (!mobile) return res.status(400).send({
            status: false,
            msg: "Please Mention mobile no"
        })

        if (!address) return res.status(400).send({
            status: false,
            msg: "Please Mention address"
        })

        if (!isValidName(fullName)) return res.status(400).send({
            status: false,
            msg: " fullName is invalid. It should be Like:---  'Nishant Gautam' "
        })

        if (!isValidEmailId(email)) return res.status(400).send({
            status: false,
            msg: " email is invalid. It should be Like:---  'nk123@gmail.com' "
        })

        if (!isValidMobileNo(mobile)) return res.status(400).send({
            status: false,
            msg: " mobile is invalid. It should be Indian No Like:---  '9058503601' "
        })

        if (!isValidString(address)) return res.status(400).send({
            status: false,
            msg: " address must be string. Like:---  'Rohini, Sector 63' "
        })

        if (!isValidNumber(address)) return res.status(400).send({
            status: false,
            msg: " address can't be number. "
        })

        if (category) {
            if (!isValidString(category)) return res.status(400).send({
                status: false,
                msg: " category must be string. Like:---  'regular'/'gold'/'platinum' "
            })

            if (["regular", "gold", "platinum"].indexOf(category) == -1) return res.status(400).send({
                status: false,
                msg: " category must be string. Like:---  'regular'/'gold'/'platinum' "
            })
        }

        data.fullName = fullName.toLowerCase()

        const registerMobileNumber = await customerModel.find({ mobile: mobile })
        if (registerMobileNumber.length != 0) return res.status(400).send({
            status: false,
            msg: "mobile number is already registered"
        })
        
        const registerEmailID = await customerModel.find({ email: email })
        if (registerEmailID.length != 0) return res.status(400).send({
            status: false,
            msg: "email ID is already registered"
        })

        const saveData = await customerModel.create(data)

        return res.status(201).send({ status: true, msg: "Customer Created Successfully", data: saveData })

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}