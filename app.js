// Initialize checkbox
$('.ui.radio.checkbox').checkbox();

class Task {
    constructor(name, priority) {
        this.name = name;
        this.priority = priority;
    }
}

class UI {
    addTask(task) {
        const taskList = document.getElementById('task-list');
        const newTaskElement = document.createElement('div');
        newTaskElement.className = 'column';
        newTaskElement.innerHTML = `
            <div class="ui fluid card">
                <a class="ui red right corner label" name="delete">
                    <i class="trash icon"></i>
                </a>
                <div class="content">
                    <div class="center aligned header">${task.name}</div>
                    <div class="center aligned description">
                        ${task.priority}
                    </div>
                </div>
            </div>
        `;
        taskList.appendChild(newTaskElement);
    }

    resetForm() {
        document.getElementById('task-form').reset();
    }

    deleteTask(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
        } else if (element.className === 'trash icon') {
            element.parentElement.parentElement.parentElement.remove();
        }
    }

    showMessage(message, className, icon) {
        const notification = document.createElement('div');
        notification.className = `ui icon message ${className}`;
        notification.innerHTML = `
            <i class="${icon} icon"></i>
            <div class="content">
            <div class="header">${message}</div>
        `;
        const content = document.querySelector('#content');
        const app = document.querySelector('#app');
        content.insertBefore(notification, app);

        setTimeout(() => {
            document.querySelector('.message').remove();
        }, 3500);
    }
}

// DOM Events
document.getElementById('task-form')
    .addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const priority = document.querySelector('input[name="priority"]:checked').value;

        const task = new Task(name, priority);

        const ui = new UI();

        // Input validation
        if (name === '' || priority === '') {
            ui.showMessage('Please complete the fields', 'red', 'info');
        } else {
            ui.addTask(task);
            ui.resetForm();
            ui.showMessage('Task has been added successfully.', 'green', 'check');
        }
    });

document.getElementById('task-list').addEventListener('click', e => {
    const ui = new UI();
    ui.deleteTask(e.target);
    ui.showMessage('Task has been removed successfully.', 'green', 'check');
});
