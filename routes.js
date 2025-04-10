const express = require('express');
const bcrypt = require('bcryptjs');
const { User, Task } = require('./model');

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Server error during registration" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({ msg: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
});

// Get all tasks (currently returns all tasks, not user-specific yet)
router.get("/tasks", async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ msg: "userId is required" });
  }

  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    console.error("Fetch tasks error:", err);
    res.status(500).json({ msg: "Failed to fetch tasks" });
  }
});

// Add new task
router.post("/tasks", async (req, res) => {
  try {
    const { task, userId } = req.body;

    if (!task || !userId) {
      return res.status(400).json({ msg: "Task and userId are required" });
    }

    const newTask = new Task({ task, completed: false, userId: userId }); 
    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Add task error:", err);
    res.status(500).json({ msg: "Failed to add task" });
  }
});

// Update task
router.put("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Task updated" });
  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({ msg: "Failed to update task" });
  }
});

// Delete task
router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ msg: "Failed to delete task" });
  }
});

module.exports = router;



































// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const authMiddleware = require('./middleware');
// const { User, Task } = require('./models');

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//     console.log("🔥 Register endpoint hit");

//     const { username, email, password } = req.body;
//     console.log("📦 Request body:", req.body);

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log("🔐 Password hashed");

//         const user = new User({ username, email, password: hashedPassword });
//         console.log("📄 New user created, saving to DB...");

//         await user.save();
//         console.log("✅ User saved to DB");

//         res.json({ msg: "User registered successfully" });
//     } catch (err) {
//         console.error("❌ Registration error:", err.message);
//         res.status(500).json({ msg: "Server error during registration" });
//     }
// });


// // Login
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token });
// });

// // Get Tasks
// router.get("/tasks", authMiddleware, async (req, res) => {
//     const tasks = await Task.find({ userId: req.user.id });
//     res.json(tasks);
// });

// // Add Task
// router.post("/tasks", authMiddleware, async (req, res) => {
//     const task = new Task({ userId: req.user.id, task: req.body.task, completed: false });
//     await task.save();
//     res.json(task);
// });

// // Update Task
// router.put("/tasks/:id", authMiddleware, async (req, res) => {
//     await Task.findByIdAndUpdate(req.params.id, req.body);
//     res.json({ msg: "Task updated" });
// });

// // Delete Task
// router.delete("/tasks/:id", authMiddleware, async (req, res) => {
//     await Task.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Task deleted" });
// });

// module.exports = router;
