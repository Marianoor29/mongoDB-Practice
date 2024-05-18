const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/signup', (req,res) => {
    console.log('sent by client',req.body)
const {name, email, password} = req.body;
if (!name || !email || !password ){
    return res.status(422).json({error: "Please fill all the fields"})
}

User.findOne({email: email}).
then(
    async(SavedUser)=>{
        if(SavedUser){
            console.log('already have this user')
            return res.status(422).json({error: "invalid Credential"})
            
        }
        const user = new User({
        name,
        email,
        password,
        })
        try{
            await user.save();
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
            res.send({token})
        }
        catch(err){
            console.log(err, 'error in catch')
            return res.status(422).send({error : err.message})
        }
    }
    
)
})
module.exports = router
