/*

This JavaScript file contains code related to object handling (main functionality).

*/



function createTask(event) {
    event.preventDefault();

    const taskName = document.querySelector("[name='taskName']").value;
    //const taskDescription = document.querySelector("[name='taskDescription']").value;
    //const taskIcon = document.getElementById("pickedIcon").src;

    //const task = { taskName, taskDescription, taskIcon };
    const task = { taskName}
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

    //<img id="taskIcon" src="${task.taskIcon}">
    //<p>${task.taskDescription}</p>
    //const { taskName, taskDescription, taskIcon } = task;


    for (const task of taskList) {
        const taskElement = document.createElement("div");
        taskElement.className = "taskElement";
        taskElement.id = "taskElement";

        taskElement.draggable = true;
        taskElement.ondragstart = drag(event);

        let {taskName} = task;

        taskElement.innerHTML = `<div id="outputTask" class="taskObject">
                                <div id="taskHeading"><h4>${taskName}</h4></div>
                                </div>`;
        unstartedTasks.appendChild(taskElement);
    }
}


function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    let taskInfo = ev.target.innerHTML;
    ev.dataTransfer.setData("text", taskInfo);
  }
  
  
  function drop(ev) {
    ev.preventDefault();

    const taskOngoing = JSON.parse(localStorage.getItem("taskOngoing")) || [];
    let taskInfo = ev.dataTransfer.getData("text");
    

    //const makeDiv = document.createElement("div");

    //makeDiv.innerHTML = `${taskInfo}`;

    ev.target.appendChild(taskInfo);
    
    ongoingTasks = {taskInfo};
    taskOngoing.push(ongoingTasks);

    
    window.localStorage.setItem("taskOngoing", JSON.stringify(taskOngoing));

    
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