//1 automatically load .env file in the application
require('dotenv').config()

//2 import express
const express = require('express')

//6 import cors
const cors =require('cors')

//import connection.js
require('./connection')

//import routes
const router = require('./routes/router')


//3 create a application using express
const server = express()

//4 Define the port
const PORT = 5000

//7 use cors
server.use(cors())
server.use(express.json()) //express.json method is used to convert objects data into array
server.use(router)

//5 run application
server.listen(PORT,()=>{
    console.log('listing to on port ' +PORT);
})

//8 define routes
server.get('/',(req,res)=>{
    res.status(200).json('Ecommerce service started')
})