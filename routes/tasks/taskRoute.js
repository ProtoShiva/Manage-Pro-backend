const express = require("express")
const userAuth = require("../../middleware/auth.js")
const {
  newTaskList,
  getAllTasks,
} = require("../../controllers/tasks/taskController.js")

const route = express.Router()

route.post("/taskList", userAuth, newTaskList)
route.get("/allTasks/:id", userAuth, getAllTasks)

module.exports = route
