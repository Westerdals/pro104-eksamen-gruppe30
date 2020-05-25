/*

This JavaScript file contains code related to object handling (main functionality).

*/

function createTask(event) {
    event.preventDefault();

    const taskName = document.querySelector("[name='taskName']").value;
    const taskDescription = document.querySelector("[name='taskDescription']").value;
    const taskIcon = document.getElementById("pickedIcon").src;

    const task = { taskName, taskDescription, taskIcon };
    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    taskList.push(task);

    window.localStorage.setItem('task', JSON.stringify(taskList));

    event.target.reset();
    hideSection(addTaskSection);
    renderTaskList();
}

function createMember(event) {
    event.preventDefault();

    const memberName = document.querySelector("[name='memberName']").value;

    const member = { memberName };
    const memberList = JSON.parse(localStorage.getItem('member')) || [];
    memberList.push(member);

    window.localStorage.setItem('member', JSON.stringify(memberList));

    event.target.reset();
    revealMembersSection();
    renderMemberList();
}

function renderTaskList() {

    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const unstartedTasks = document.getElementById("unstartedTasks");

    unstartedTasks.innerHTML = "";

    for (const task of taskList) {
        const taskElement = document.createElement("div");
        const { taskName, taskDescription, taskIcon } = task;

        taskElement.innerHTML = `<div class="taskObject">
                                <img id="taskIcon" src="${task.taskIcon}">
                                <div id="taskHeading"><h4>${task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}</h4></div>
                                <p>${task.taskDescription}</p>
                                </div>`;
        unstartedTasks.appendChild(taskElement);
    }
}

function renderMemberList() {

    const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
    const membersSection = document.getElementById("membersSection");

    membersSection.innerHTML = "";

    for (const member of memberList) {
        const memberElement = document.createElement("div");
        const { memberName } = member;

        memberElement.innerHTML = `<div class="memberObject">
                                <h4>${member.memberName}</h4>
                                </div>`;
        membersSection.appendChild(memberElement);
    }
}
//Dette er det markus gjorde
/*function createChecklistPoint() {

    var li = document.createElement("li");
    var checklistInput = document.getElementById("taskChecklistInput").value;
    var node = document.createTextNode(checklistInput);
    li.appendChild(node);

    document.getElementById("taskChecklist").appendChild(li);
    document.getElementById("taskChecklistInput").value = "";}*/
    
    // Create a "close" button and append it to each list item
    var myNodeList = document.getElementsByTagName("li");
    var i;
    for(i = 0; i < myNodeList.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodeList[i].appendChild(span);
    }

    // Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for(i = 0; i < close.length; i++){
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    // Add a "checked" symbol when clicking on a list item
    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev){
        if(ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);

    // Create a new list item when clicking on the "Add" button
    function createChecklistPoint() {
        var li = document.createElement("li");
        var inputValue = document.getElementById("taskChecklistInput").value;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        if(inputValue === ''){
            alert("You must write something!");
        }else {
            document.getElementById("taskChecklist").appendChild(li);
        }
        document.getElementById("taskChecklistInput").value = "";
        
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        
        for(i=0; i < close.length; i++) {
            close[i].onclick = function(){
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
    }
    
    //Add item in localStorage
    const addItem = function(){
        let val = input.value;
        if (val) {
            let li = document.createElement('li');
            let inner = '<h1 class="text">' + val + '</h1>';
            inner += '<button class="close">Close</button>';
            inner += '<button class = "checked">Checked</button>';
            li.innerHTML = inner;
            container.appendChild(li);
            input.value = '';
            currentItem = li.firstChild;
            
            //save the bellow list
            items = document.querySelectorAll('li');
            for(let item of items){
                //this return empty objects
                localStorage.setItem('list', JSON.stringify(item) );
                console.log(localStorage)
            }
            for(let del of document.querySelectorAll('.close')){
                del.addEventListener('click', closeItem);
            }
            for(let edit of document.querySelectorAll('.checked')){
                edit.addEventListener('click', checkedItem);
            }
        }else {
            alert('please add some text');
            return;
        }
    }

    //Se på denne
    document.getElementById("background").onchange = function() {
    localStorage.setItem('background', document.getElementById("background").value);
    if (localStorage.getItem('background') == 0){
        document.body.style.backgroundImage = "url(images/Bluesky.jpg)";
    }
    if (localStorage.getItem('background') == 1){
        document.body.style.backgroundImage = "url(images/.jpg)";
    }
    if (localStorage.getItem('background') == 2){
        document.body.style.backgroundImage = "url(images/.jpg)";
    }
    if (localStorage.getItem('background') == 3){
        document.body.style.backgroundImage = "url(images/.jpg)";
    }
 
}
if (localStorage.getItem('background')) {
    document.getElementById("background").options[localStorage.getItem('background')].selected = true;
    if (localStorage.getItem('background') == 0){
        document.body.style.backgroundImage = "url(images/Bluesky.jpg)";
    }
    if (localStorage.getItem('background') == 1){
        document.body.style.backgroundImage = "url(images/.jpg)";
    }
    if (localStorage.getItem('background') == 2){
        document.body.style.backgroundImage = "url(images/.jpg)";
    }
    if (localStorage.getItem('background') == 3){
        document.body.style.backgroundImage = "url(images/.jpg)";
    }
   
}
    
    
    
    

