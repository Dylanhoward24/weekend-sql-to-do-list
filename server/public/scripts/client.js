$(document).ready(onReady);

function onReady() {
    console.log('We are ready to crush this weekend assignment!');

    // setup click listeners for buttons
    $('#submitBtn').on('click', addTask);
    $(document).on('click', '.deleteBtn', removeTask);

    // append current database info to DOM on page load
    refreshTasks();
}

function refreshTasks() {
    console.log('Ready to display some tasks!');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((res) => {
        console.log(res);
        renderTasks(res);
    }).catch((err) => {
        console.log('error in GET /tasks', err);
    });
}

function renderTasks(tasks) {
    console.log('Rendering all of the tasks, all of the time');

    // empty the current tasks list
    $('#taskList').empty();

    for (let task of tasks) {

        // for each task, append a new row to our table
        $('#taskList').append(`
            <td class="taskColumns">
                ${task.task}
            </td>
            <td>${task.due}</td>
            <td>${task.isCompleted}</td>
            <td>
                <button class="completeBtn">Complete</button>
            </td>
            <td>
                <button class="deleteBtn">Delete</button>
            </td>
        `);
    }
}

function addTask() {
    console.log('Added a new task');
}

function removeTask() {
    console.log('Removed a task');
}