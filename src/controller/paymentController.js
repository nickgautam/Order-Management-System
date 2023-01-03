const paymentModel= require("../model/paymentModel.js")



exports.getAllPayments= async (req, res)=>{
    try{
        const getData= await paymentModel.find()
        return res.status(200).send({status:true, msg:"All Payment Details", data: getData})
    }catch(err){return res.status(500).send({status:false, msg:err.message})}
}