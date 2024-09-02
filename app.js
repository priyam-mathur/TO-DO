document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
    document.getElementById('task-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        const task = taskInput.value.trim();
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.style.display = 'none';
        editInput.value = task;
        editInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                taskText.textContent = editInput.value;
                editInput.style.display = 'none';
                taskText.style.display = 'inline';
                saveTask(taskText.textContent, task);
            }
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.onclick = function() {
            editInput.style.display = 'inline';
            taskText.style.display = 'none';
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            taskList.removeChild(li);
            removeTask(task);
        };

        const buttonContainer = document.createElement('div');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(editInput);
        li.appendChild(buttonContainer);
        taskList.appendChild(li);

        saveTask(task);
        taskInput.value = '';
    }
}

function saveTask(task, oldTask = null) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (oldTask !== null) {
        tasks = tasks.filter(t => t !== oldTask);
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.style.display = 'none';
        editInput.value = task;
        editInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                taskText.textContent = editInput.value;
                editInput.style.display = 'none';
                taskText.style.display = 'inline';
                saveTask(taskText.textContent, task);
            }
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.onclick = function() {
            editInput.style.display = 'inline';
            taskText.style.display = 'none';
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            taskList.removeChild(li);
            removeTask(task);
        };

        const buttonContainer = document.createElement('div');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(editInput);
        li.appendChild(buttonContainer);
        taskList.appendChild(li);
    });
}
