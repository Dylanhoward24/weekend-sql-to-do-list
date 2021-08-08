$(document).ready(onReady);

function onReady() {
    console.log('We are ready to crush this weekend assignment!');

    // setup click listeners for buttons
    $('#submitBtn').on('click', addTask);
    $(document).on('click', '.deleteBtn', removeTask);

    $(document).on('change', '.completeBox', completeTask);

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
        
        // clear the input fields
        $('#taskName').val('');
        $('#dueDate').val('');

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
    console.log('in completeTask');

    let tr = $(this).parents('tr');
    console.log('tr is', tr);
    let id = tr.data('id');
    console.log('id is', id);
    let isCompleted = tr.data('isCompleted');
    console.log('isCompleted is', isCompleted);
    
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: {
            isCompleted: true
        }
    }).then((res) => {
        console.log('PUT /tasks', res);
        
        // refresh the data
        refreshTasks();
    }).catch((err) => {
        console.log('PUT /tasks error', err);
        alert('PUT /tasks failed!');
    });
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
            <tr data-id="${task.id}" data-isCompleted="${task.isCompleted}">
                <td class="taskColumns">
                    ${task.task}
                </td>
                <td>${task.due}</td>
                <td>${convertComplete(task.isCompleted)}</td>
                <td>
                    <input
                        class="completeBox" 
                        type="checkbox"
                        ${checkIfCompleted(task.isCompleted)}
                    >
                </td>
                <td>
                    <button class="deleteBtn">Delete</button>
                </td>
            </tr>
        `);
    }

    // assign completed tasks rows with a different
    // class to add green background to in style.css
    $(function(){
        $("tr").each(function(){
          let col_val = $(this).find("td:eq(2)").text();
          if (col_val == "Yes"){
            $(this).addClass('complete');
          } else {
            $(this).addClass('incomplete');
          }
        });
      });
} // end renderTasks()

// this function converts the value of
// isCompleted from a boolean to a string
// of either 'Yes' or 'No' for appending
function convertComplete(input) {
    if (input === false) {
        return 'No';
    }else {
        return 'Yes';
    }
} // end completedConversion()

// this function will keep the checkbox
// checked after the page re-renders each
// time a change is made to the datbase
function checkIfCompleted(input) {
    if (input === true) {
        return `checked="checked"`;
    }
} // end checkIfCompleted()