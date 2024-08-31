let btn = document.getElementById('Add');
let container = document.querySelector('.list');

function start() {
    let todo = document.getElementById('TODO').value;
    if (todo === "") {
        alert("You must add a text");
    } else {
        addTodoItem(todo);

        // Save the updated list to localStorage
        saveTodoList();
        
        // Clear the input field
        document.getElementById('TODO').value = '';
    }
}

function addTodoItem(todo) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    let paragraph = document.createElement('p');
    paragraph.textContent = todo;

    let deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';

    let wrapper = document.createElement('div');
    wrapper.style.display = 'flex'; 
    wrapper.style.alignItems = 'center'; 

    wrapper.appendChild(checkbox);
    wrapper.appendChild(paragraph);
    wrapper.appendChild(deletebtn);

    deletebtn.addEventListener('click', function() {
        container.removeChild(wrapper);
        saveTodoList(); // Save the updated list to localStorage
    });

    container.appendChild(wrapper);
}

function saveTodoList() {
    let todos = [];
    let paragraphs = container.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
        todos.push(paragraph.textContent);
    });
    localStorage.setItem('todoList', JSON.stringify(todos));
}

function loadTodoList() {
    let savedTodos = JSON.parse(localStorage.getItem('todoList'));
    if (savedTodos) {
        savedTodos.forEach(todo => {
            addTodoItem(todo);
        });
    }
}

window.onload = function() {
    loadTodoList();
}