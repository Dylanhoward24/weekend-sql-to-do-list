$(document).ready(onReady);

function onReady() {
    console.log('We are ready to crush this weekend assignment!');

    // setup click listeners for buttons
    $('#submitBtn').on('click', addTask);
    $(document).on('click', '.deleteBtn', removeTask);

    // append current database info to DOM on page load
    displayTasks();
}

function displayTasks() {
    console.log('Ready to display some tasks!');
}

function addTask() {
    console.log('Added a new task');
}

function removeTask() {
    console.log('Removed a task');
}