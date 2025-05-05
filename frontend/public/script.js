async function fetchTodos() {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
        ${todo.task}
        <button onclick="deleteTodo(${todo.id})">X</button>
      `;
        list.appendChild(li);
    });
}

async function addTodo() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim();
    if (!task) return;
    await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });
    input.value = '';
    fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
}

fetchTodos();