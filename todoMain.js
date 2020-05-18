//Velgere
const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');
const filterOption = document.querySelector('.filterTodo');

//Eventlyttere
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Funksjoner
function addTodo(event){
    //Gjør at siden ikke refresher
    event.preventDefault();
    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Lake li elementer
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    //Legg til todo til localstorage
    saveLocalTodos(todoInput.value);
    //'Complete' knapp
    const completedButton = document.createElement('button');
    completedButton.innerText = 'COMPLETE';
    completedButton.classList.add('completedButton');
    todoDiv.appendChild(completedButton);
    //'Trash' knapp
    const trashButton = document.createElement('button');
    trashButton.innerText = 'TRASH';
    trashButton.classList.add('trashButton');
    todoDiv.appendChild(trashButton);
            const memberDiv = document.createElement('div');

        memberDiv.classList.add('memberContent');
    todoDiv.appendChild(memberDiv);
    //Append til listen
    todoList.appendChild(todoDiv);
     const addMember = document.createElement('button');
    addMember.innerText = 'ADD MEMBER';
    addMember.classList.add('addMember');
    addMember.setAttribute('onclick','addmember(this)'); 
     todoDiv.appendChild(addMember);
    //Slett todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //Slett
    if(item.classList[0] === 'trashButton'){
        const todo = item.parentElement;
        //Animasjon
        todo.classList.add('drop');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    //Ferdig
    if(item.classList[0] === 'completedButton'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if (todo.classList !== undefined) {
            switch (e.target.value) {
              case "all":
                todo.style.display = "flex";
                break;
              case "completed":
                if (todo.classList.contains('completed')) {
                  todo.style.display = "flex";
                } else {
                  todo.style.display = "none";
                }
                break;
                case "uncompleted":
                    if(!todo.classList.contains('completed')) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                break;
              default:   
                break;
            }
          }
          //return;
        });
}

function saveLocalTodos(todo){
    //sjekk om den er fylt
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    count = 0;
    todos.forEach(function(todo){

    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Lake li elementer
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    //'Complete' knapp
    const completedButton = document.createElement('button');
    completedButton.innerText = 'COMPLETE';
    completedButton.classList.add('completedButton');
     todoDiv.appendChild(completedButton);
     
    //'Trash' knapp
    const trashButton = document.createElement('button');
    trashButton.innerText = 'TRASH';
    trashButton.classList.add('trashButton');
    todoDiv.appendChild(trashButton);
        const memberDiv = document.createElement('div');

    memberDiv.classList.add('memberContent');
    todoDiv.appendChild(memberDiv);
    //Append til listen
    todoList.appendChild(todoDiv);
    const addMember = document.createElement('button');
    addMember.innerText = 'Add Member';
    addMember.classList.add('addMember');
    addMember.setAttribute('onclick','addmember(this)');
    addMember.setAttribute('data-index',count);
    count++;  
     todoDiv.appendChild(addMember);
    })
}
function removeLocalTodos(todo){

    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addmember(el) {
    popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML ="<h4>Select to Add Members</h4>"
    member = document.getElementsByClassName('memberItem');
    popupHtml = '';
    for (i=0; i<member.length; i++){

        popupHtml += "<div class='memberOption'> <input class='opt' type='checkbox' value='"+member[i].innerText+"'><span>"+member[i].innerText+"</span></div>";
    }
    popupHtml += "<div class='bt'><button onclick= 'getmembers(this)'>submit</div>";
    popup.innerHTML += popupHtml;
    el.parentNode.appendChild(popup)

}

function getmembers(el){
    var chk_arr =  document.getElementsByClassName('opt');
var chklength = chk_arr.length;             
html ='';
ind = el.getAttribute('data-index'); 
for(k=0;k< chklength;k++)
{
    if(chk_arr[k].checked){
        html += '<div class="smember">'+chk_arr[k].value+'</div>';
      
    }
} 
  el.parentNode.parentNode.parentNode.getElementsByClassName('memberContent')[0].innerHTML = html;
  selected=['a']
    localStorage.setItem(ind, JSON.stringify(selected));
    el.parentNode.parentNode.remove();
    console.log(localStorage)
}
