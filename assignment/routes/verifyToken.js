const jwt = require('jsonwebtoken')
module.exports = function(req,res,next){
    const token = req.header('auth-token')
    console.log(token)
    if(!token){
        console.log(token)
        return res.status(400).send("Access Denied")
    }

        
    try {
        const verifiedUser = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=verifiedUser
        next()
    } catch (error) {
        res.status(401).send('Invalid Token')
    }
}

