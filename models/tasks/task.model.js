const mongoose = require("mongoose")

const checklistItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
})

const taskSchema = mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["backlog", "todo", "inProgress", "done"],
      default: "todo",
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["HIGH", "LOW", "MODERATE"],
      default: "MODERATE",
    },

    checkList: {
      type: [checklistItemSchema],
      default: [],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
