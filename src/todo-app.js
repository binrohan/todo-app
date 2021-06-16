'use strict';

// Variables
const todos = getTodos();
const body = document.querySelector('body');
const filters = {
  searchText: '',
  hideCompleted: false,
};

renderTodos(todos, filters);

// Event Listeners
document.querySelector('#todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = e.target.elements.newTodo.value.trim();
  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });

    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.newTodo.value = '';
  }
});

document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector('#hide-completed').addEventListener('change', (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
