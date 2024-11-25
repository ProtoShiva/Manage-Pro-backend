const Task = require("../../models/tasks/task.model")

const newTaskList = async (req, res) => {
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
    res.status(401).json({
      success: false,
      message: error.message,
    })
  }
}

const getAllTasks = async (req, res) => {
  const { id } = req.params
  try {
    const taskByUser = await Task.findById({ _id: id })
    res.status(200).json(taskByUser)
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    })
  }
}

const removeTask = async (req, res) => {
  //find the product
  const { id } = req?.params

  try {
    const deleteTask = await Task.findByIdAndDelete(id)

    res.status(200).json(deleteTask)
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = { newTaskList, getAllTasks, removeTask }
