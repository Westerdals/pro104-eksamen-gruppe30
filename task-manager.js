function revealAddTaskSection() {
    var addTaskRevealBtn = document.getElementById("addTaskRevealBtn");
    var addTaskSection = document.getElementById("addTaskSection");
    if (addTaskSection.style.height == "0px" || addTaskSection.style.height == "") {
        addTaskSection.style.height = "250px";
        addTaskSection.style.opacity = "1";
        addTaskRevealBtn.style.backgroundColor = "#7dd1a9";

        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            hideSection(addMemberSection);
        }
        if (membersSection.style.height != "0px" || membersSection.style.height != "") {
            hideSection(membersSection);
        }

    } else {
        hideSection(addTaskSection);
    }
  }

  function revealAddMemberSection() {
    var addMemberRevealBtn = document.getElementById("addMemberRevealBtn");
    var addMemberSection = document.getElementById("addMemberSection");
    if (addMemberSection.style.height == "0px" || addMemberSection.style.height == "") {
        addMemberSection.style.height = "150px";
        addMemberSection.style.opacity = "1";
        addMemberRevealBtn.style.backgroundColor = "#7dd1a9";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            hideSection(addTaskSection);
        }
        if (membersSection.style.height != "0px" || membersSection.style.height != "") {
            hideSection(membersSection);
        }

    } else {
        hideSection(addMemberSection);
    }
  }

  function revealMembersSection() {
    var revealMembersBtn = document.getElementById("revealMembersBtn");
    var membersSection = document.getElementById("membersSection");
    if (membersSection.style.height == "0px" || membersSection.style.height == "") {
        membersSection.style.height = "110px";
        membersSection.style.opacity = "1";
        revealMembersBtn.style.backgroundColor = "lightgray";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            hideSection(addTaskSection);
        }
        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            hideSection(addMemberSection);
        }

    } else {
        hideSection(membersSection);
    }
  }

  function revealArchive(){
    var revealArchiveBtn = document.getElementById("revealArchiveBtn");
    var archive = document.getElementById("archive");
    if (archive.style.height == "0px" || archive.style.height == "") {
        archive.style.height = "630px";
        archive.style.opacity = "1";
        revealArchiveBtn.style.left = "1249px";
        revealArchiveBtn.innerHTML = "VIEW TASKS TABLE";

       if (tasksTable.style.height != "0px" || tasksTable.style.height != "") {
         hideSection(tasksTable);
       }

        } else {
         hideSection(archive);
         tasksTable.style.height = "630px";
         tasksTable.style.opacity = "1";;
         revealArchiveBtn.innerHTML = "VIEW ARCHIVE";
         revealArchiveBtn.style.left = "1280px";
    }
  }

  function hideSection(section){
    section.style.height = "0px";
    section.style.opacity = "0";
    if (section == addTaskSection){
        addTaskRevealBtn.style.backgroundColor = "";
    } else if (section == addMemberSection){
        addMemberRevealBtn.style.backgroundColor = "";
    } else if (section == membersSection){
        revealMembersBtn.style.backgroundColor = "";
    } else if (section == archive){
        revealArchiveBtn.style.backgroundColor = "";
    } 
  }

  function createTask(event) {
    event.preventDefault();

    const taskName = document.querySelector("[name='taskName']").value;
    const taskDescription = document.querySelector("[name='taskDescription']").value;

    const task = {taskName, taskDescription};
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

    const member = {memberName};
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
        const {taskName, taskDescription} = task;

        taskElement.innerHTML = `<div class="taskObject">
                                <h4>${task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}</h4>
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
        const {memberName} = member;

        memberElement.innerHTML = `<div class="memberObject">
                                <h4>${member.memberName}</h4>
                                </div>`;
        membersSection.appendChild(memberElement);
    }
}

function createChecklistPoint(){

    var li = document.createElement("li");
    var checklistInput = document.getElementById("taskChecklistInput").value;
    var node = document.createTextNode(checklistInput);
    li.appendChild(node);

    document.getElementById("taskChecklist").appendChild(li);
    document.getElementById("taskChecklistInput").value = "";
}