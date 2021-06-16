import { getFilters } from './filters';
import { getTodos, removeTodo, toggleTodo } from './todo';

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
    renderTodos();
  });

  // Setup todo text
  textEl.textContent = todo.text;
  containerEl.appendChild(textEl);

  // Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Setup todo button
  button.textContent = 'remove';
  button.classList.add('button', 'button--text');
  todoEl.appendChild(button);
  button.addEventListener('click', () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

// Render Todos
const renderTodos = () => {
  const { searchText, hideCompleted } = getFilters();
  const todosEl = document.querySelector('#todos');
  let filterTodos = getTodos().filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;

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

const generateSummaryDOM = (incompletedTodos) => {
  const summary = document.createElement('h2');
  summary.classList.add('list-title');
  summary.textContent =
    incompletedTodos.length !== 1
      ? `You have ${incompletedTodos.length} todos left`
      : `You have ${incompletedTodos.length} todo left`;
  return summary;
};

export { generateTodoDOM, generateSummaryDOM, renderTodos };
