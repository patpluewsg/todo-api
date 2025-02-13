const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

let todos = []; // In-memory storage for now

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTodo = { id: Date.now(), title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todo = todos.find((t) => t.id == id);

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.completed = completed;
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id != id);
  res.json({ message: "Todo deleted" });
});
