const express = require("express")
const userAuth = require("../../middleware/auth.js")
const {
  newTaskList,
  getAllTasks,
  removeTask,
  updateTheTask,
} = require("../../controllers/tasks/taskController.js")

const route = express.Router()

route.post("/taskList", userAuth, newTaskList)
route.get("/allTasks/:id", userAuth, getAllTasks)
route.patch("/:id", userAuth, updateTheTask)
route.delete("/:id", userAuth, removeTask)

module.exports = route
