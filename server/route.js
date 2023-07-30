const express = require('express')
const route = express()
const userRoute = require('./controllers/userController')

route.use('/user', userRoute)

module.exports = route