//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

//Functions
function addTodo(event){
    event.preventDefault();
    // console.log('hello');

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    //Save to local - do this last
    //Save to local
    saveLocalTodos(todoInput.value);
    //
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Complete button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"> </i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    //Trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"> </i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear input value
    todoInput.value = '';


}

function deleteCheck (e) {
    const item = e.target;
    //Delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })

    }

    //Check Here
    if(item.classList[0] ===  'complete-btn'){
        const todo= item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo (e) {
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "remaining":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

//LOCAL STORAGE
function saveLocalTodos(todo){
    //Check for local storage
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Add todo to local storage
   

    //Complete button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"> </i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    //Trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"> </i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    //Append to list
    todoList.appendChild(todoDiv);

    })

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}




