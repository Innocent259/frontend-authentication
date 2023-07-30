const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

exports.isAutheticated = async(req,res,next) => {
    const {user} = req.cookies
    console.log(req.cookies)
    if(!user) {
        return res.status(401).json({
            success: false,
            message: "You must login first"
        })
    }
    const decodedToken = jwt.verify(user, '13e42udeiwdhskjsdhj')
    req.user = await userModel.findById(decodedToken.id)
    next()
}