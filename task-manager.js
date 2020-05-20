function revealAddTaskSection() {
    var addTaskRevealBtn = document.getElementById("addTaskRevealBtn");
    var addTaskSection = document.getElementById("addTaskSection");
    if (addTaskSection.style.height == "0px" || addTaskSection.style.height == "") {
        addTaskSection.style.height = "300px";
        addTaskSection.style.opacity = "1";
        addTaskRevealBtn.style.backgroundColor = "lightgray";

        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            resetSection(addMemberSection);
        }
    } else {
        addTaskSection.style.height = "0px";
        addTaskSection.style.opacity = "0";
        addTaskRevealBtn.style.backgroundColor = "";
    }
  }

  function revealAddMemberSection() {
    var addMemberRevealBtn = document.getElementById("addMemberRevealBtn");
    var addMemberSection = document.getElementById("addMemberSection");
    if (addMemberSection.style.height == "0px" || addMemberSection.style.height == "") {
        addMemberSection.style.height = "150px";
        addMemberSection.style.opacity = "1";
        addMemberRevealBtn.style.backgroundColor = "lightgray";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            resetSection(addTaskSection);
        }
        
    } else {
        addMemberSection.style.height = "0px";
        addMemberSection.style.opacity = "0";
        addMemberRevealBtn.style.backgroundColor = "";
    }
  }

  function resetSection(section){
    section.style.height = "0px";
    section.style.opacity = "0";
    if (section == addTaskSection){
        addTaskRevealBtn.style.backgroundColor = "";
    } else {
        addMemberRevealBtn.style.backgroundColor = "";
    }
}

function createTask(event) {
    event.preventDefault();

    const taskName = document.querySelector("[name='taskName']").value;
    const taskDescription = document.querySelector("[name='taskDescription']").value;
    const taskIcon = document.getElementById("pickedIcon").src;
    const taskProgress = 40;

    const task = {taskName, taskDescription, taskIcon, taskProgress};
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
    console.log(taskList);
    const unstartedTasks = document.getElementById("unstartedTasks");

    unstartedTasks.innerHTML = "";

    for (const task of taskList) {
        const taskElement = document.createElement("div");
        const {taskName, taskDescription, taskIcon, taskProgress} = task;

        taskElement.innerHTML = `<div class="taskObject">
                                <img id="taskIcon" src="${task.taskIcon}">
                                <h4>${task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}</h4>
                                <div>${task.taskDescription}</div>
                                <div id="progressBarDiv"style="width: 379px; height: 20px; border: 1px solid lightgray;">
                                <div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div>
                                </div>`
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

function createChecklistPoint() {

    var li = document.createElement("li");
    var checklistInput = document.getElementById("taskChecklistInput").value;
    var node = document.createTextNode(checklistInput);
    li.appendChild(node);

    document.getElementById("taskChecklist").appendChild(li);
    document.getElementById("taskChecklistInput").value = "";
}