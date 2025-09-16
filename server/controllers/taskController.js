import Task from "../models/Task.js";

// Add task
export const addTask = async (req, res) => {
  try {
    const { title, description, status, order } = req.body;
    const task = new Task({ title, description, status, order });
    await task.save();

    // Emit real-time event
    req.io.emit("taskAdded", task);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ order: 1 });
  res.json(tasks);
};

// Get single task
export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

// Update task
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  req.io.emit("taskUpdated", task);
  res.json(task);
};

// Delete task
export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  req.io.emit("taskDeleted", req.params.id);
  res.json({ success: true });
};

// Update status only
export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  req.io.emit("statusUpdated", task);
  res.json(task);
};
