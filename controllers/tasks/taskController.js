const Task = require("../../models/tasks/task.model")
const ErrorHandler = require("../../utils/customError")

const newTaskList = async (req, res, next) => {
  const { title, priority, checkList, dueDate } = req.body
  const { _id } = req.user

  try {
    const newTask = new Task({
      createdBy: _id,
      title,
      priority,
      checkList,
      dueDate,
    })

    // Save the task to the database
    const savedTask = await newTask.save()

    // Respond with the created task
    res.status(201).json({ success: true, task: savedTask })
  } catch (error) {
    next(error)
  }
}

const getAllTasks = async (req, res, next) => {
  const { id } = req.params
  try {
    const taskByUser = await Task.findById({ _id: id })
    res.status(200).json(taskByUser)
  } catch (error) {
    next(error)
  }
}

const removeTask = async (req, res, next) => {
  //find the product
  const { id } = req?.params

  try {
    const deleteTask = await Task.findByIdAndDelete(id)

    res.status(200).json(deleteTask)
  } catch (error) {
    next(error)
  }
}

const updateTheTask = async (req, res, next) => {
  const { id } = req.params
  try {
    const updates = req.body // Only the fields to be updated

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    })
    if (!updatedTask) {
      return next(new ErrorHandler("Task not found", 404))
    }

    res.status(200).json({ success: true, task: updatedTask })
  } catch (error) {
    next(error)
  }
}

module.exports = { newTaskList, getAllTasks, removeTask, updateTheTask }
