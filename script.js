document.getElementById('addTaskBtn').addEventListener('click', addTask);

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    pendingTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.text} <span>${task.date}</span> 
                        <button onclick="markComplete('${task.id}')">Complete</button>
                        <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>`;
        pendingTasksList.appendChild(li);
    });

    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.text} <span>${task.date} (Completed)</span>
                        <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>`;
        completedTasksList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTaskText = taskInput.value;
    if (!newTaskText) return;

    const newTask = {
        id: Date.now().toString(),
        text: newTaskText,
        completed: false,
        date: new Date().toLocaleString()
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
}

function markComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}


renderTasks();
