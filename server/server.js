const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const route = require('./route') 
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use('/api', route)
mongoose.connect('mongodb+srv://dashboard:G8R7BOJSDSVXXBUe@cluster0.v3glpju.mongodb.net/?retryWrites=true&w=majority')
.then( () => {
   app.listen(5000, () => {
    console.log("Server is running")
})

})

