$(document).ready(onReady);

function onReady() {
    console.log('We are ready to crush this weekend assignment!');

    // setup click listeners for buttons
    $('#submitBtn').on('click', addTask);
    $(document).on('click', '.deleteBtn', removeTask);
    $(document).on('check', '.completeBtn', completeTask);

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

// removes a task from DOM and database
function removeTask() {
    console.log('Removed a task');

    let tr = $(this).parents('tr');
    console.log('tr is', tr);
    let id = tr.data('id');
    console.log('id is', id);

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then((res) => {
        console.log('DELETE /tasks', res);
        
        // refresh the data
        refreshTasks();
    }).catch((err) => {
        console.log('DELETE /tasks error', err);
        alert('DELETE /tasks failed!');
    });
} // end removeTask()

// this function runs when the checkbox
// is checked indicated "marked completed"
function completeTask() {
    console.log('Completed a task');
} // end completeTask()



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
            <tr data-id="${task.id}" 
                data-isCompleted="${task.isCompleted}" 
                class="container"
            >
                <td class="taskColumns">
                    ${task.task}
                </td>
                <td>${task.due}</td>
                <td>${completedConversion(task.isCompleted)}</td>
                <td>
                    <input id="completeBtn" type="checkbox">
                    <span class="checkmark"></span>
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