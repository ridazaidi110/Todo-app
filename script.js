const input = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');
const darkToggle = document.querySelector('#dark-toggle');

window.onload = () => {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(todo => addTodo(todo.text, todo.completed));

  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  }
};

// Add new todo
addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
  }
});

// Add todo to DOM
function addTodo(text, completed = false) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);

  if (completed) li.classList.add('completed');

  // Toggle complete
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTodos();
  });

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-btn');
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit your todo:', span.textContent);
    if (newText !== null && newText.trim() !== '') {
      span.textContent = newText.trim();
      saveTodos();
    }
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('delete-btn');
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTodos();
  });

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  todoList.appendChild(li);
  saveTodos();
}

// Save todos to localStorage
function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    todos.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Dark mode toggle
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});