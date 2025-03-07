import Task from "../model/taskSchema.js";

const taskController = {
  createTask: async (req, res) => {
    try {
      const { title, description, createdBy } = req.body;
      console.log({ title, description, createdBy })
      const newTask = new Task({ title, description, createdBy });

      await newTask.save();
      res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find().populate("createdBy", "name email").populate("updatedBy", "name email");
      res.status(200).json({ message: "Tasks fetched successfully", tasks });
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks", error });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id).populate("createdBy", "name email").populate("updatedBy", "name email");

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task fetched successfully", task });
    } catch (error) {
      res.status(500).json({ message: "Error fetching task", error });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { updatedBy, ...updateData } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(id, { ...updateData, updatedBy }, { new: true });

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      res.status(500).json({ message: "Error updating task", error });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  },
  getTasksByUser: async (req, res) => {
    try {
      const { id } = req.user;
      const tasks = await Task.find({ createdBy: id })
        .populate("createdBy", "name email")
        .populate("updatedBy", "name email");

      if (!tasks.length) {
        return res.status(404).json({ message: "No tasks found for this user" });
      }

      res.status(200).json({ message: "Tasks fetched successfully", tasks });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user tasks", error });
    }
  },
};

export default taskController;
