import uuidv4 from 'uuid/v4';

let todos = [];

// Create new todo
const createTodo = (text) => {
  todos.push({
    id: uuidv4(),
    text,
    completed: false,
  });

  saveTodos();
};

// Read existing todos from localstorage
const loadTodos = () => {
  const todosJSON = localStorage.getItem('todos');
  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    todos = [];
  }
};

// Expose todos
const getTodos = () => todos;

loadTodos();

// Save Todos
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }

  saveTodos();
};

// Remove a todo from the list
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
  saveTodos();
};

export { createTodo, getTodos, toggleTodo, removeTodo, loadTodos };
