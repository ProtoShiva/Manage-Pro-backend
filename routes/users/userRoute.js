const express = require("express")
const {
  registerUser,
  userLogin,
} = require("../../controllers/user/userController.js")

const route = express.Router()

route.post("/register", registerUser)
route.post("/login", userLogin)

module.exports = route
