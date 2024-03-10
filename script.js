document.addEventListener('DOMContentLoaded', function () {
    let todoItemsContainer = document.querySelector(".task-container");
    let addTodoButton = document.querySelector(".button");
    let saveTodoButton = document.querySelector(".save");

    function getTodoListFromLocalStorage() {
        let stringifiedTodoList = localStorage.getItem("todoList");
        let parsedTodoList = JSON.parse(stringifiedTodoList);
        if (parsedTodoList === null) {
            return []; 
        } else {
            return parsedTodoList;
        }
    }

    let todoList = getTodoListFromLocalStorage();
    let todosCount = todoList.length;
    let selectedTasks = []; 

    saveTodoButton.onclick = function () {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    function onAddTodo() {
        let userInputElement = document.querySelector(".user-input");
        let userInputValue = userInputElement.value;

        if (userInputValue === "") {
            alert("Enter Valid Text");
            return;
        }

        todosCount = todosCount + 1;

        let newTodo = {
            text: userInputValue,
            uniqueNo: todosCount,
            isChecked: false
        };
        todoList.push(newTodo);
        createAndAppendTodo(newTodo);
        userInputElement.value = "";
    }

    addTodoButton.onclick = function () {
        onAddTodo();
    };

    function onTodoStatusChange(checkboxId, labelId, todoId) {
        let checkboxElement = document.getElementById(checkboxId);
        let labelElement = document.getElementById(labelId);
        labelElement.classList.toggle("checked");

        let todoObjectIndex = todoList.findIndex(function (eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;

            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });

        let todoObject = todoList[todoObjectIndex];

        if (todoObject.isChecked === true) {
            todoObject.isChecked = false;
            selectedTasks = selectedTasks.filter(taskId => taskId !== todoId); 
        } else {
            todoObject.isChecked = true;
            selectedTasks.push(todoId); 
        }
    }

    function onDeleteTodo(todoId) {
        let todoElement = document.getElementById(todoId);
        todoItemsContainer.removeChild(todoElement);

        let deleteElementIndex = todoList.findIndex(function (eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });

        todoList.splice(deleteElementIndex, 1);
        selectedTasks = selectedTasks.filter(taskId => taskId !== todoId);
    }

    function createAndAppendTodo(todo) {
        let todoId = "todo" + todo.uniqueNo;
        let checkboxId = "checkbox" + todo.uniqueNo;
        let labelId = "label" + todo.uniqueNo;

        let todoElement = document.createElement("li");
        todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
        todoElement.id = todoId;
        todoItemsContainer.appendChild(todoElement);

        let labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container", "d-flex", "flex-row");
        todoElement.appendChild(labelContainer);

        let inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.id = checkboxId;
        inputElement.checked = todo.isChecked;
        inputElement.classList.add("checkbox-input");
        labelContainer.appendChild(inputElement);

        let taskBox = document.createElement("div"); 
        taskBox.classList.add("task-box"); 
        labelContainer.appendChild(taskBox);

        let labelElement = document.createElement("div");
        labelElement.setAttribute("for", checkboxId);
        labelElement.id = labelId;
        labelElement.classList.add("task-name");
        labelElement.textContent = todo.text;
        if (todo.isChecked === true) {
            labelElement.classList.add("checked");
        }
        taskBox.appendChild(labelElement); 

        let deleteIconContainer = document.createElement("div");
        deleteIconContainer.classList.add("delete-icon-container");
        labelContainer.appendChild(deleteIconContainer);

        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

        deleteIcon.onclick = function () {
            onDeleteTodo(todoId);
        };

        deleteIconContainer.appendChild(deleteIcon);
    }

    for (let todo of todoList) {
        createAndAppendTodo(todo);
    }

    deleteSelectedButton.onclick = function () {
        for (let taskId of selectedTasks) {
            onDeleteTodo(taskId);
        }
        selectedTasks = []; 
    };
});


