const userModel = require('../models/userModel')
const  { 
    signAccessToken,
} = require('../configurations/Tokens/webtoken')

const createError = require('http-errors')
const { userValidation } = require("../configurations/validationSchema/userValidation");
const { loginValidation } = require("../configurations/validationSchema/userValidation");

module.exports = { 
    register:async (req, res, next) => {
        try {
            const { email, password, confirmPassword } = req.body
            if (!email || !password  ||!confirmPassword) {
                throw createError.BadRequest()
            }
            await userValidation.validateAsync(req.body);

            if(password !== confirmPassword){
                throw createError.Conflict(`Password and confirm password must be same`)
            }
            const doesExist = await userModel.findOne({ email: email })
            if (doesExist) {
                throw createError.Conflict(`${email} is already registerd`)
            }
            const newUser = new userModel({ email, password})
            const savedUser = await newUser.save()
            if (!savedUser) {
                throw createError.createError("can not Register user")
            }
            const accessToken = await signAccessToken(savedUser.id)
    
            res.json({
                id:newUser._id,
                email:newUser.email,
                accessToken:accessToken
              })
        } catch (error) {
            if (error.isJoi == true) {
                error.status = 422;
            }
            next(error)
        }
    }, 

    logIn:async (req, res, next) => {
        try {
            
            const { email, password } = req.body
            if (!email || !password) {
                throw createError.BadRequest()
            }
            await loginValidation.validateAsync(req.body) 
            const user = await userModel.findOne({email:email})
            if (!user) {
                return next(createError.NotFound("User not found"))
            }
    
            const isMatch = await userModel.isValidPassword(password, user.password)
            if (!isMatch) {
                return next(createError.Unauthorized("username/password is not valid"))
            }
    
            const accessToken = await signAccessToken(user.id)
            res.json({
              id:user._id,
              email:user.email,  
              accessToken:accessToken
            })
        } catch (error) {
            if (error.isJoi === true) {
                error.status = 422;
                error.message = "Invalid username/password"
            }
            next(error)
        }
    },   

}