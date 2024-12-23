const express = require("express")
const {
  registerUser,
  userLogin,
  getUserDetails,
} = require("../../controllers/user/userController.js")
const userAuth = require("../../middleware/auth.js")

const route = express.Router()

route.post("/register", registerUser)
route.post("/login", userLogin)
route.get("/", userAuth, getUserDetails)

module.exports = route
