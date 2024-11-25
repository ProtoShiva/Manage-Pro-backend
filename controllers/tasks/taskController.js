const Task = require("../../models/tasks/task.model")

const newTaskList = async (req, res) => {
  const { title, priority, checkList, dueDate } = req.body

  try {
    const newTask = new Task({
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

module.exports = newTaskList
