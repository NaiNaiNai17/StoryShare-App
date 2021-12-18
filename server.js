const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')


//{path:'./config/config.env'} later
dotenv.config() 

const app = express()
connectDB()

const PORT = process.env.PORT || 5000 
app.listen(app.get('port'), () => {
     console.log('Server started on port' , PORT)
 })


