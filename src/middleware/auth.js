const jwt = require("jsonwebtoken");
const customerModel = require("../model/customerModel.js")
const { isValidObjectId } = require("../validation/validation.js")

exports.authentication = async function (req, res, next) {

    try {
        let token = req.headers["x-api-key"];         
        if (!token) {    
            token = req.headers["X-Api-Key"];     
        }
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        jwt.verify(token, "customer@123", { ignoreExpiration:true }, //avoid the invalid error
        function (err, decodedToken) {
           if (err) return res.status(401).send({ status: false, message: "Token is invalid" });
           if (Date.now() > decodedToken.exp * 1000) 
               return res .status(401).send({ status: false, message: "Token expired" })
    
       req.customerID = decodedToken.customerID;
       
       next();
    })
 } catch (error) {return res.status(500).send({ status: false, msg: error.message })}

}


exports.authorization = async (req, res, next) => {
    try {
        let customerID = req.params.customerID
        if (!isValidObjectId(customerID)) return res.status(400).send({ status: false, msg: "customerID is not valid" })
        let checkCustomer = await customerModel.findById(customerID)
        if (!checkCustomer) return res.status(404).send({ status: false, msg: "customer not found" })
    
        if(customerID!=req.customerID) return res.status(403).send({ status: false, msg: "customer not authorized" })
        next();
    
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
