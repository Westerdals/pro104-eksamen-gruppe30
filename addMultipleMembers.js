

function createTask(event) {
    event.preventDefault();


    let task = document.querySelector("[name='task']").value;
    task = task.toLowerCase();
    const taskList = JSON.parse(localStorage.getItem('task')) || [];

    if (task === "") {
        document.getElementById("task-value-check").innerHTML = "PLEASE ENTER A TASK";
    } else {
        document.getElementById("task-value-check").innerHTML = "";
        document.getElementById("member-value-check").innerHTML = "";


        const tasks = { task};
        taskList.push(tasks);


        window.localStorage.setItem('task', JSON.stringify(taskList));


        event.target.reset();


        renderTaskList();
    }
}


function createMember(event) {
    event.preventDefault();


    let member = document.querySelector("[name='teamMember']").value;
    member = member.toLowerCase();


    if (member === "") {
        document.getElementById("member-value-check").innerHTML = "PLEASE ENTER A TEAM MEMBER";
    } else {
        document.getElementById("member-value-check").innerHTML = "";
        document.getElementById("task-value-check").innerHTML = "";


        const members = { member };
        const memberList = JSON.parse(localStorage.getItem('member')) || [];
        memberList.push(members);


        window.localStorage.setItem('member', JSON.stringify(memberList));


        event.target.reset();


        renderMemberList();
    }
}


function assignToMember(event) {

    event.preventDefault();
    

    const taskList = JSON.parse(localStorage.getItem('task')) || {};

    let nameTask = document.getElementById('check-task').value;
    let valueCheck = document.getElementById('assign-value-check');


        if (nameTask === "") {
            valueCheck.innerHTML = "PLEASE ENTER A TASK AND A TEAM MEMBER";
        } else if (nameTask === "") {
            valueCheck.innerHTML = "PLEASE ENTER A TASK";
        } else {
            valueCheck.innerHTML = "";
    
            nameTask = nameTask.toLowerCase();
    
    
            const assignMemberList = JSON.parse(localStorage.getItem('assignment')) || [];
            let task;
            if (nameTask != '') {
                for (const a of taskList) {
                    if (a.task === nameTask) {
                        task = a.task;
                        
                    }
                }

        if (task != undefined) {
            let assignToMember = {task};
            assignMemberList.push(assignToMember);

            window.localStorage.setItem('assignment', JSON.stringify(assignMemberList));
        } else {
                valueCheck.innerHTML = "PLEASE ENTER AN EXISTING TASK AND/OR TEAM MEMBER";
        }
            renderUpdatedTaskList();
        }

        event.target.reset();
    }

}


function renderTaskList() {


    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const taskListOutput = document.getElementById("tasks-rendering");


    taskListOutput.innerHTML = "";


    for (const a of taskList) {
        let taskElement = document.createElement("div");
        taskElement.innerHTML = `<div class="object-render">
                                <h4>${a.task.charAt(0).toUpperCase() + a.task.slice(1)}</h4>
                                </div>`;
        taskListOutput.appendChild(taskElement);
    }
}

function renderMemberList() {


    const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
    const memberListOutput = document.getElementById("members-rendering");

    memberListOutput.innerHTML = "";


    for (const m of memberList) {
        let memberElement = document.createElement("div");
        memberElement.innerHTML = `<div class="object-render" draggable="true" ondragstart="drag(event)">
                                  <h4 id="drag1">${m.member.charAt(0).toUpperCase() + m.member.slice(1)}</h4>
                                  </div>`;
        memberListOutput.appendChild(memberElement);
    }
}


function renderUpdatedTaskList(){
    const assignMemberList = JSON.parse(localStorage.getItem('assignment')) || [];

    const assignmentListOutput = document.getElementById('assignments-rendering');

    

    assignmentListOutput.innerHTML = "";
    

    for (const a of assignMemberList) {
        let assignmentElement = document.createElement("div");
        assignmentElement.innerHTML = `<div id="assignment-object-render" class="object-render-assignments"
                    class="containers" ondragover="allowdrop(event)">
                    <h1>${a.task.charAt(0).toUpperCase() + a.task.slice(1)}</h1>
                    <br>
                    <p>medlemmer</p>
                    <div class="membersDiv" onload="drop(ev)" ondragover="allowdrop(event)" ondrop="drop(event)"></div>
                    </div>`;
 
        assignmentListOutput.appendChild(assignmentElement);
        
    }

}


function allowdrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    let memberInfo = ev.target.innerText;
    ev.dataTransfer.setData("text/plain", memberInfo);
  }
  
  
  function drop(ev) {
    ev.preventDefault();

    const taskAndMember = JSON.parse(localStorage.getItem("taskAndMember")) || [];
    let memberInfo = ev.dataTransfer.getData("text/plain");
    

    task = ev.target.parentElement.querySelector("h1").innerText;

    const makeDiv = document.createElement("div");

    makeDiv.innerHTML = `<div>${memberInfo}<br></div>`;

    ev.target.append(makeDiv);
    
    memberAndTask = {task, memberInfo};
    taskAndMember.push(memberAndTask);

    
    window.localStorage.setItem("taskAndMember", JSON.stringify(taskAndMember));

    
  }

  window.onload = renderMemberList();
  window.onload = renderTaskList();
  window.onload = renderUpdatedTaskList();
