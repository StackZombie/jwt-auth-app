const express = require('express')
const mongoose = require("mongoose")
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const dotenv = require('dotenv')
const cors = require("cors")
dotenv.config()

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true ,useUnifiedTopology: true },()=>{
    console.log('connected')
})
app=express()

app.use(cors())
app.use(express.json())
app.use('/',authRoutes)
app.use('/welcome',homeRoutes)
app.listen(3000,()=>{
    console.log(`Running on port 3000`)
})