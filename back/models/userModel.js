const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    created_at: {
        type: String,
        default: new Date()
    },
    updated_at: {
        type: String,
        default: new Date()
    }
})


userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)  
        this.password = hashedPassword
        next()
        console.log(hashedPassword);      
    } catch (error) {
        next(error)
    }
})

const user = mongoose.model("user", userSchema);
module.exports = user;


module.exports.isValidPassword = async function(password, userPassword) { 
    try {
        return await bcrypt.compare(password, userPassword)
    } catch (error) {
        throw error
    }  
}
