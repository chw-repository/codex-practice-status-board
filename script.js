const form = document.getElementById('status-form');
const taskInput = document.getElementById('task-input');
const statusList = document.getElementById('status-list');

const TASKS_STORAGE_KEY = 'mini-status-board.tasks';

const STORAGE_KEY = 'mini-status-board.tasks';
const tasks = loadTasks();

function loadTasks() {
  try {
    const saved = localStorage.getItem(TASKS_STORAGE_KEY);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((task) => task && typeof task.title === 'string' && typeof task.done === 'boolean')
      .map((task) => ({ title: task.title.trim(), done: task.done }))
      .map((task) => ({
        title: task.title.trim(),
        done: task.done,
      }))
      .filter((task) => task.title.length > 0);
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // 저장 공간 제한 또는 브라우저 정책으로 인해 저장이 실패할 수 있음
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  statusList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'status-item empty';
    emptyItem.textContent = '아직 등록된 작업이 없습니다. 새 작업을 추가해보세요.';
    emptyItem.className = 'empty-message';
    emptyItem.textContent = '아직 등록된 작업이 없습니다.';
    statusList.appendChild(emptyItem);
    return;
  }

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
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
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
  saveTasks();
  taskInput.value = '';
  taskInput.focus();
  renderTasks();
});

renderTasks();
