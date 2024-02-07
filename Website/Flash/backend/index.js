const express=require('express')
const cors=require('cors')
const bodyParser = require('body-parser')
const router =require ("./routes/router")

const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions={
    "origin": "*",
    "credentials":true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
  }
app.use(cors(corsOptions))

app.use('/',router)

const port=5174
const server=app.listen(port,()=>{
    console.log('Server running on port 5174')
})