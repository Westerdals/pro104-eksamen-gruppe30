/*

This JavaScript file contains code related to object handling (main functionality).

*/



function createTask(event) {
    event.preventDefault();

    const taskName = document.querySelector("[name='taskName']").value;
    //const taskDescription = document.querySelector("[name='taskDescription']").value;
    //const taskIcon = document.getElementById("pickedIcon").src;
    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    let taskId = taskList.length;
    //const task = { taskName, taskDescription, taskIcon };
    const task = {taskId, taskName}
    
    taskList.push(task);

    window.localStorage.setItem('task', JSON.stringify(taskList));

    event.target.reset();
    hideSection(addTaskSection);
    renderTaskList();
}

function createMember(event) {
    event.preventDefault();

    const memberName = document.querySelector("[name='memberName']").value;
    const memberList = JSON.parse(localStorage.getItem('member')) || [];
    let memberId = memberList.length;

    const member = {memberId, memberName};
    
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

    //<img id="taskIcon" src="${task.taskIcon}">
    //<p>${task.taskDescription}</p>
    //const { taskName, taskDescription, taskIcon } = task;


    for (const task of taskList) {
        const taskElement = document.createElement("div");
        taskElement.className = "taskElement";
        taskElement.id = "taskElement";

        let {taskId, taskName} = task;

        taskElement.innerHTML = `<div id="outputTask${taskId}" class="taskObject" draggable="true" ondragstart="drag(event)" onclick="deleteTask(${taskId})">
                                <div id="taskHeading"><h4>${taskName}</h4></div>
                                <div id="droppedMember" class="droppedMember" 
                                ondragover="allowMoveNames(event)" ondrop="dropNames(event)">Members</div>
                                </div>`;
        unstartedTasks.appendChild(taskElement);
    }

}

function deleteTask(taskId) {
  console.log(taskId);
  var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
for(var i = 0; i < taskList.length; i++){
  if(taskList[i].taskId == taskId){
    taskList.splice(i, 1);
  }
}
window.localStorage.setItem("task", JSON.stringify(taskList));
renderTaskList();
}


function dragStartNames(ev){
    let nameDrag = ev.target.innerText;
    ev.dataTransfer.setData("text", nameDrag);

}

function dropNames(ev){
    ev.preventDefault();

    const draggedMembersList = JSON.parse(localStorage.getItem("draggedMembers")) || [];

    let nameDropped = ev.dataTransfer.getData("text");
    let assignedToTask = ev.target.parentElement.querySelector("h4").innerText;
    
    let nameDiv = document.createElement("div");

    nameDiv.innerHTML = `<div>${nameDropped}</div>`;

    ev.target.appendChild(nameDiv);
    
    let draggedMember = {assignedToTask, nameDropped};
    draggedMembersList.push(draggedMember);
    

    window.localStorage.setItem("draggedMembers", JSON.stringify(draggedMembersList))

}


function allowMoveTasks(ev) {
    ev.preventDefault();
  }
  
  function allowMoveNames(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    let taskInfo = ev.target.id;
    ev.dataTransfer.setData("text", taskInfo);
  }

  /*function dropUnstarted(ev) {
    ev.preventDefault();
    let ongoingTaskName = ev.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(ongoingTaskName));

    document.getElementById(ongoingTaskName).style.border = "2px dashed grey";
    
  }*/


  
  
  function dropOngoing(ev) {
    ev.preventDefault();

    const taskOngoing = JSON.parse(localStorage.getItem("taskOngoing")) || [];
    let ongoingTaskName = ev.dataTransfer.getData("text");
    //event.target.appendChild(document.getElementById(ongoingTaskName));
    let ongoingTask = document.getElementById(ongoingTaskName);
    //document.getElementById(ongoingTaskName).style.border = "2px dashed yellow";

    let ongoingTasks = {ongoingTask};
    taskOngoing.push(ongoingTasks);

    window.localStorage.setItem("taskOngoing", JSON.stringify(taskOngoing));

    function renderOngoingTask(){
    const taskOngoing = JSON.parse(localStorage.getItem("taskOngoing")) || [];

    let ongoingTasks = document.getElementById("ongoingTasks");
    ongoingTasks.innerHTML = "";

    for(const to of taskOngoing){
        let {ongoingTask} = to;
        let ongoingElement = document.createElement("div");
        ongoingElement.innerHTML = `<div id="outputTask" class="taskObject"
                                    draggable="true" ondragstart="drag(event)">
                                    <div id="taskHeading"><h4>${ongoingTask}</h4></div>
                                    </div>`;

        ongoingTasks.appendChild(ongoingElement);
    }

  }
  renderOngoingTask();
  renderTaskList();

    deleteTask(taskId);
    
  }

  /*function dropFinished(ev) {
    ev.preventDefault();

    let ongoingTaskName = ev.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(ongoingTaskName));

    document.getElementById(ongoingTaskName).style.border = "2px dashed green";
    
  }*/


function renderMemberList() {

    const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
    const membersSection = document.getElementById("membersSection");

    membersSection.innerHTML = "";

    for (const member of memberList) {
        const memberElement = document.createElement("div");
        const {memberId, memberName } = member;

        memberElement.innerHTML = `<div id="outputMember${memberId}" class="memberObject" draggable="true" ondragstart="dragStartNames(event)">
                                <h4>${memberName}</h4>
                                </div>`;
        membersSection.appendChild(memberElement);
    }
}

/*function createChecklistPoint() {

    var li = document.createElement("li");
    var checklistInput = document.getElementById("taskChecklistInput").value;
    var node = document.createTextNode(checklistInput);
    li.appendChild(node);

    document.getElementById("taskChecklist").appendChild(li);
    document.getElementById("taskChecklistInput").value = "";
}*/



window.onload = renderTaskList(); 
window.onload = renderMemberList();
//window.onload = renderOngoingTask();


//let makeDiv = document.createElement("div");

    //makeDiv.innerHTML = taskName;

    
    
    /*ongoingTasks = {ongoingTaskName};
    taskOngoing.push(ongoingTasks);

    
    window.localStorage.setItem("taskOngoing", JSON.stringify(taskOngoing));*/

    