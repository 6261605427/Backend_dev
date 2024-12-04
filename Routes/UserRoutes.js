const express = require('express')
const userRoute = express.Router()

const { adduser, updateUser, getUser, deleteUser,getUsersByType } = require("../controller/user")

userRoute.post('/create-user', adduser)
userRoute.get('/get-all-users', getUser)
userRoute.put('/update-user/:id', updateUser)
userRoute.delete('/delete-user/:id', deleteUser)

module.exports = { userRoute }