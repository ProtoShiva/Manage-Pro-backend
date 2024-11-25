const Task = require("../../models/tasks/task.model")
const ErrorHandler = require("../../utils/customError")
const { asyncHandler } = require("../../utils/tryCatch")

const newTaskList = asyncHandler(async (req, res, next) => {
  const { title, priority, checkList, dueDate, status } = req.body
  const { _id } = req.user

  const newTask = new Task({
    createdBy: _id,
    status,
    title,
    priority,
    checkList,
    dueDate,
  })

  // Save the task to the database
  const savedTask = await newTask.save()

  if (!savedTask) {
    return next(
      new ErrorHandler("Failed to create the task. Please try again.")
    )
  }

  res.status(201).json({ success: true, task: savedTask })
})

const getAllTasks = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const taskByUser = await Task.find({ createdBy: id })

  if (!taskByUser)
    return next(new ErrorHandler("Cannot find tasks. Please try again."))

  res.status(200).json(taskByUser)
})

const removeTask = asyncHandler(async (req, res, next) => {
  const { id } = req?.params

  const deleteTask = await Task.findByIdAndDelete(id)

  if (!deleteTask)
    return next(new ErrorHandler("Cannot delete the task. Please try again"))

  res.status(200).json(deleteTask)
})

const updateTheTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const updates = req.body

  const updatedTask = await Task.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
  if (!updatedTask) {
    return next(new ErrorHandler("Task not found", 404))
  }

  res.status(200).json({ success: true, task: updatedTask })
})

module.exports = { newTaskList, getAllTasks, removeTask, updateTheTask }
