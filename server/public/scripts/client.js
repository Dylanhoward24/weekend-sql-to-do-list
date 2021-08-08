$(document).ready(onReady);

function onReady() {
    console.log('We are ready to crush this weekend assignment!');

    // setup click listeners for buttons
    $('#submitBtn').on('click', addTask);
    $(document).on('click', '.deleteBtn', removeTask);

    // calling this function on page load will
    // cause the tasks to be rendered to the DOM
    refreshTasks();
} // end onReady()

function addTask() {
    console.log('Added a new task');

    // create new object with properties from
    // the input fields on DOM to package and
    // send to the tasks.route.js file via 'POST'
    let newTask = {
        task: $('#taskName').val(),
        due: $('#dueDate').val(),
    }

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask,
    }).then((res) => {
        console.log('POST /tasks', res);
        
        // refresh the data since we added new task
        refreshTasks();
    }).catch((err) => {
        console.log('POST /tasks error', err);
        alert('Unable to add a task. Error message:', err);
    });
} // end addTask()

function removeTask() {
    console.log('Removed a task');
} // end removeTask()

// refreshes the tasks
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
} // end refreshTasks()

// renders the tasks to the DOM
function renderTasks(tasks) {
    console.log('Rendering all of the tasks, all of the time');

    // empty the current tasks list
    $('#taskList').empty();

    for (let task of tasks) {

        // for each task, append a new row to our table
        $('#taskList').append(`
            <tr>
                <td class="taskColumns">
                    ${task.task}
                </td>
                <td>${task.due}</td>
                <td>${completedConversion(task.isCompleted)}</td>
                <td>
                    <button class="completeBtn">Complete</button>
                </td>
                <td>
                    <button class="deleteBtn">Delete</button>
                </td>
            </tr>
        `);
    }
} // end renderTasks()

// this function converts the value of
// isCompleted from a boolean to a string
// of either 'Yes' or 'No' for appending
function completedConversion(input) {
    if (input === false) {
        return 'No';
    }else {
        return 'Yes';
    }
}