// Array to hold tasks
let tasksList = [];
let taskCount = 1;

// Get elements
let taskForm = document.getElementById('taskForm');
let taskManager = document.getElementById('taskmanager');

// Function to add event listeners to task actions
taskForm.addEventListener('submit', function(event) {
    // prevent form submission
    event.preventDefault(); 

    // Get elements values
    let taskInput = document.getElementById('taskInput').value.trim(); 
    let taskPriority = document.getElementById('taskPriority').value;
    let isImportant = document.getElementById('isImportant').checked;
    let taskDate = new Date().toLocaleDateString();

    // Check if task input is empty
    if (taskInput === '') {
        alert("Please fill out this field");
        return;
    }

    // Create a new task object
    let task = {
        id: taskCount++,
        name: taskInput,
        priority: taskPriority,
        isImportant: isImportant,
        isCompleted: false, // default to not completed
        date:  taskDate
    };

    // Add task to tasksList and display it
    tasksList.push(task);
    displayTasks();

    // Reset the form
    taskForm.reset(); 

    // Log the tasks to console
    console.log(JSON.stringify(tasksList, null, 2)); 

})

// Function to display tasks in the task manager
function displayTasks() {
    // Clear previous tasks
    taskManager.innerHTML = ''; 

    // Loop through tasksList and create task elements
    tasksList.forEach(task => {
        let taskContainer = document.createElement('div');
        
        // Add a base class to the task container for styling
        taskContainer.classList.add('task-container');

        // Add a class based on the task's priority for styling
        
        if(task.priority === "high") {
            taskContainer.classList.add('high-priority');

        } else if (task.priority === "medium") {
            taskContainer.classList.add('medium-priority');

        } else if (task.priority === "low") {
            taskContainer.classList.add('low-priority');
        }
        
        // red background for important tasks
        if (task.isImportant) {
            taskContainer.style.backgroundColor = "red"; 
        }

        // strike through for completed tasks
        if(task.isCompleted) {
            taskContainer.style.textDecoration= "line-through"; 
        }

        
        // Set taskContainer and inner HTML
        taskContainer.innerHTML = `
            <span class="taskName"><strong>${task.name}</strong> </span>
            <span>Priority: ${task.priority}</span>
            <span class="taskDate">${task.date}</span>
            <div class="task-actions">
            <label><input type="checkbox" class="completeCheckbox" data-id="${task.id}" ${task.isCompleted ? "checked" : ""} >Done</label>
            <button data-id="${task.id}" class="deleteButton">Delete</button>
            </div>
        `;
            
        // Append taskContainer to taskManager
        taskManager.appendChild(taskContainer);
            
    })

    addTaskEventListeners();
    
}

// Function to add event listeners for task actions
// This function adds event listeners to the checkboxes and delete buttons
function addTaskEventListeners() {
    // Add event listeners to checkboxes 
    document.querySelectorAll(".completeCheckbox").forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            let taskId = parseInt(this.getAttribute("data-id"));
            let task = tasksList.find(taskItem => taskItem.id === taskId);
            if (task) {
                task.isCompleted = this.checked; 
                displayTasks(); 

                // log updated tasks to console
                console.log(JSON.stringify(tasksList, null, 2)); 
            }
        })
    })

    // Add event listeners to delete buttons
    document.querySelectorAll(".deleteButton").forEach(button => {
        button.addEventListener("click", function() {
            let taskId = parseInt(this.getAttribute("data-id"));
            tasksList = tasksList.filter(task => task.id !== taskId);
            displayTasks();

            // log updated tasks to console
            console.log(JSON.stringify(tasksList, null, 2)); 
        })
    })
}
