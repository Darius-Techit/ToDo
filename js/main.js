let btnAddTask = document.querySelector("span");
let taskName = document.querySelector("#content");

//let tasks = getTaskFromLocalStorage();
//renderTasks(tasks);
//alert(localStorage.getItem('test'))

btnAddTask.addEventListener('click', function () {
    if (!taskName.value) {
        alert('Please Input Task');
        return false;
    };
    let taskID = this.getAttribute('id');
    let tasks = getTaskFromLocalStorage();
    let taskp = { name: taskName.value };
    if (taskID == 0 || taskID) {
        tasks[taskID] = taskp
        this.removeAttribute('id');
    } else {
        tasks.push(taskp)
    };

    taskName.value = '';

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
});

function editTask(id) {
    let tasks = getTaskFromLocalStorage();
    if (tasks.length > 0) {
        taskName.value = tasks[id].name;
        btnAddTask.setAttribute('id', id);
    }


};

function deleteTask(id) {
    if (confirm('Do you want delete')) {
        let tasks = getTaskFromLocalStorage();
        tasks.splice(id, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(getTaskFromLocalStorage());
    };

};

function renderTasks(tasks = []) {
    let content = '<ul id="myUL">';
    tasks.forEach((tasks, index) => {
        content += `<li class="task-item">${tasks.name}
            <span class="task-icons">
                <i class="fas fa-edit" onclick="editTask(${index})"></i>
                <i class="fas fa-trash-alt" onclick="deleteTask(${index})"></i>
            </span>
        </li>`;
    });
    content += '</ul>';
    document.querySelector('#result').innerHTML = content;
};

function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
};