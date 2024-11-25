const express = require("express")
const {
  registerUser,
  userLogin,
} = require("../../controllers/user/userController.js")

const route = express.Router()

route.get("/register", registerUser)
route.get("/login", userLogin)

module.exports = route
