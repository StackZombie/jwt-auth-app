const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../models/User')

router.get('/home/',verify,async(req,res)=>{
  const user  = await User.findById({"_id":req.user._id})
  console.log(user)
  res.status(200).json({
    name:user.name,
    email:user.email
  })
  
})



module.exports = router