const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let todos = [];

app.use(express.json());

// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Get all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Add new todo
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        task: req.body.task
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});