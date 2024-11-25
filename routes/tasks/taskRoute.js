const express = require("express")
const userAuth = require("../../middleware/auth.js")

const newTaskList = require("../../controllers/tasks/taskController.js")
const route = express.Router()

route.post("/taskList", userAuth, newTaskList)

module.exports = route
