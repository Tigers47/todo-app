let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false, createdAt: new Date(), completedAt: null });
    input.value = '';
    renderTasks();
  }
}

function renderTasks() {
  const pending = document.getElementById('pendingTasks');
  const completed = document.getElementById('completedTasks');
  pending.innerHTML = '';
  completed.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    const timeStamp = document.createElement('div');
    taskText.textContent = task.text;
    timeStamp.textContent = `${task.completed ? 'Completed' : 'Created'}: ${task.completed ? task.completedAt : task.createdAt}`;
    timeStamp.className = 'timestamp';

    if (task.completed) {
      taskText.className = 'completed';
    }

    const actions = document.createElement('div');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTask(index);

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
    toggleBtn.onclick = () => toggleTask(index);

    actions.appendChild(toggleBtn);
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    const leftDiv = document.createElement('div');
    leftDiv.appendChild(taskText);
    leftDiv.appendChild(timeStamp);

    li.appendChild(leftDiv);
    li.appendChild(actions);

    if (task.completed) {
      completed.appendChild(li);
    } else {
      pending.appendChild(li);
    }
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  tasks[index].completedAt = tasks[index].completed ? new Date() : null;
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}
