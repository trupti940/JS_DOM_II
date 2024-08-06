document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const statusInput = document.getElementById('status');
    const taskList = document.getElementById('taskList');
    const filterSelect = document.getElementById('filter');

    let tasks = [];

    const renderTasks = (filter = 'All') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.status === 'Completed' ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <div>
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <small>Status: ${task.status}</small>
                </div>
                <div>
                    <button onclick="toggleComplete('${task.id}')">${task.status === 'Completed' ? 'Undo' : 'Complete'}</button>
                    <button onclick="editTask('${task.id}')">Edit</button>
                    <button onclick="deleteTask('${task.id}')">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    window.toggleComplete = (id) => {
        tasks = tasks.map(task => task.id === id ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } : task);
        renderTasks(filterSelect.value);
    };

    window.editTask = (id) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            titleInput.value = task.title;
            descriptionInput.value = task.description;
            statusInput.value = task.status;
            taskForm.removeEventListener('submit', addTask);
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                updateTask(id);
            });
        }
    };

    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks(filterSelect.value);
    };

    const addTask = (e) => {
        e.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        const status = statusInput.value;
        tasks.push({ id: Date.now().toString(), title, description, status });
        titleInput.value = '';
        descriptionInput.value = '';
        statusInput.value = 'Pending';
        renderTasks(filterSelect.value);
    };

    const updateTask = (id) => {
        const title = titleInput.value;
        const description = descriptionInput.value;
        const status = statusInput.value;
        tasks = tasks.map(task => task.id === id ? { ...task, title, description, status } : task);
        taskForm.removeEventListener('submit', updateTask);
        taskForm.addEventListener('submit', addTask);
        titleInput.value = '';
        descriptionInput.value = '';
        statusInput.value = 'Pending';
        renderTasks(filterSelect.value);
    };

    filterSelect.addEventListener('change', () => {
        renderTasks(filterSelect.value);
    });

    taskForm.addEventListener('submit', addTask);
});
