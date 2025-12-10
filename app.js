import express from "express";

const app = express();
app.use(express.json());

// In-memory task storage
let tasks = [
  { id: 1, title: "Learn CI/CD", completed: false },
  { id: 2, title: "Dockerize App", completed: false }
];

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "CI/CD Demo Working!" });
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get single task
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// Create task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.title = req.body.title || task.title;
  task.completed = req.body.completed ?? task.completed;
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

export default app;
