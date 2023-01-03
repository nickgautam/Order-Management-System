const jwt= require("jsonwebtoken")
const customerModel = require("../model/customerModel.js")
const { isValidString, isValidNumber, isValidName, isValidMobileNo, isValidEmailId, isValidPassword } = require("../validation/validation.js")



exports.createCustomer = async (req, res) => {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please Mention Data"
        })

        const { fullName, email, password, mobile, address, category } = data
        if (!fullName) return res.status(400).send({
            status: false,
            msg: "Please Mention fullName"
        })

        if (!email) return res.status(400).send({
            status: false,
            msg: "Please Mention email id"
        })

        if (!password) return res.status(400).send({
            status: false,
            msg: "Please Mention password"
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

        if (!isValidPassword(password)) {
            return res.status(400).send({
                status: false,
                msg: "password must have atleast 1digit , 1lowercase , special symbols(@$!%*?&) and between 5-15 range, ex:nick@121"
            })
        }

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

        const registerPassword = await customerModel.find({ password: password })
        if (registerPassword.length != 0) return res.status(400).send({
            status: false,
            msg: "password is already registered"
        })

        const saveData = await customerModel.create(data)

        return res.status(201).send({ status: true, msg: "Customer Created Successfully", data: saveData })

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}



exports.customerLogin = async function (req, res) {
    try {
        let credentials = req.body
      
        if (Object.keys(credentials).length == 0) return res.status(400).send({ status: false, msg: "Please enter email & password" })

        let { email, password } = credentials

        if (!email) return res.status(400).send({ status: false, msg: "email is required" })

        if (!password) return res.status(400).send({ status: false, msg: "password is required" })

        if (!isValidEmailId(email)) return res.status(400).send({ status: false, msg: " email is invalid. It should be Like:---  'nk123@gmail.com' " }) 
       
        if (!isValidPassword(password)) return res.status(400).send({ 
            status: false, 
            msg: "password must have atleast 1digit , 1lowercase , special symbols(@$!%*?&) and between 5-15 range, ex:nick@121" 
        }) 

        let customer = await customerModel.findOne({ email: email })

        if (!customer) return res.status(404).send({ status: false, msg: "customer not found" })

        let token = jwt.sign(
            {
                customerID: customer._id, 
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 //expiry time is 24 hours ///2.56=>2  
            }, "customer@123");

          res.setHeader("x-api-key", token);

        let final = { customerID: customer._id, token: token }
          return res.status(200).send({ status: true, msg: "Customer Login Successfully", token: final })
        
        }catch(err){res.status(500).send({ status:false, msg: err.message })}
        
    }
