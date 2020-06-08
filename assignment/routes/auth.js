const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




router.post('/register',async (req,res)=>{
    if(req.body.email == '' || req.body.password=='' || req.body.name == '')
        return res.status(300).json({'error':'Please Type Something'})
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist){
        return res.status(400).json({'error':"email already Exists"})
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        
        user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword })
        const savedUser = await user.save()
        res.status(200).json({'success':"Registered Successfully"})
        
        
    } catch (error) {
        res.status(401).send("failed")
    }
    
})

router.post('/signin',(req,res)=>{
    res.send(req.body.email + req.body.password)
})


router.post('/login',async(req,res)=>{
    if(req.body.email == "" && req.body.password=="")
    return res.status(400).json({'error':'Please Type Something'})
    if(req.body.email == "")
        return res.status(400).json({'error':'Email Field is Missing'})
    if(req.body.password == "")
        return res.status(400).json({'error':'Password Field is Missing'})
    
    const user = await User.findOne({email:req.body.email})
    if(user){
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        if(validPassword){
            const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)

            res.header("auth-token",token).status(200).json({"token":token})
        } else {
            res.status(400).json({"error":"Email or Password Mismatched"})
        }
    } else {
        return res.status(404).json({'error':"Email or Password Mismatched"})
    }
})



module.exports = router