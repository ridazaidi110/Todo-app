// Selectors
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load existing todos from localStorage
window.onload = () => {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(todo => addTodo(todo.text, todo.completed));
};

// Add button click
addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
  }
});
// Function to create and add todo
function addTodo(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  // Toggle complete
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTodos();
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTodos();
  });

  li.appendChild(delBtn);
  todoList.appendChild(li);
  saveTodos();
}

// Save todos to localStorage
function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    todos.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
