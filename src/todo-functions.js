'use strict';

// Read existing todos from localstorage
const getTodos = () => {
  const todosJSON = localStorage.getItem('todos');
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// Remove a todo from the list
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Generate Todo DOM
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const textEl = document.createElement('span');
  const button = document.createElement('button');
  const checkbox = document.createElement('input');

  // Setup todo checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup todo text
  textEl.textContent = todo.text;
  containerEl.appendChild(textEl);

  //Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Setup todo button
  button.textContent = 'remove';
  button.classList.add('button', 'button--text');
  todoEl.appendChild(button);
  button.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Render Todos
const renderTodos = (todos, filters) => {
  const todosEl = document.querySelector('#todos');
  let filterTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompletedTodos = filterTodos.filter((t) => !t.completed);
  todosEl.innerHTML = '';
  document
    .querySelector('#todos')
    .appendChild(generateSummaryDOM(incompletedTodos));

  // filterTodos = filters.hideCompleted ? incompletedTodos : filterTodos;
  if (filterTodos.length > 0) {
    filterTodos.forEach((todo) => {
      const todoEl = generateTodoDOM(todo);
      todosEl.appendChild(todoEl);
    });
  } else {
    const emptyMessageEl = document.createElement('p');
    emptyMessageEl.classList.add('empty-message');
    emptyMessageEl.textContent = `No to-dos to show`;
    todosEl.appendChild(emptyMessageEl);
  }
};

// Save Todos
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const generateSummaryDOM = (incompletedTodos) => {
  const summary = document.createElement('h2');
  summary.classList.add('list-title');
  summary.textContent =
    incompletedTodos.length !== 1
      ? `You have ${incompletedTodos.length} todos left`
      : `You have ${incompletedTodos.length} todo left`;
  return summary;
};
