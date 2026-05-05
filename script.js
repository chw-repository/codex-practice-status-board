const form = document.getElementById('status-form');
const taskInput = document.getElementById('task-input');
const statusList = document.getElementById('status-list');

const tasks = [];

function renderTasks() {
  statusList.innerHTML = '';

  tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.className = `status-item${task.done ? ' done' : ''}`;

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.title;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.textContent = task.done ? '미완료' : '완료';
    toggleButton.addEventListener('click', () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    actions.append(toggleButton, deleteButton);
    item.append(text, actions);
    statusList.appendChild(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();
  if (!title) return;

  tasks.unshift({ title, done: false });
  taskInput.value = '';
  taskInput.focus();
  renderTasks();
});
