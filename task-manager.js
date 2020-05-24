var textSizeDescription = "";
var textSizeHeader = "";

function loadSettings (){
    if (window.localStorage.length == 0) {
        console.log("Standard settings loaded");
        var savedTextSize = "medium";
        var savedTextSizeHeader = "large" ;
        var textSize = {savedTextSize, savedTextSizeHeader}
        window.localStorage.setItem('settings', JSON.stringify(textSize));
        
    }
    var savedSettings = JSON.parse(localStorage.getItem('settings')) || [];
    textSizeDescription = savedSettings.savedTextSize;
    textSizeHeader = savedSettings.savedTextSizeHeader;
}

function adjustText(header, description) {
    textSizeDescription = description;
    textSizeHeader = header;
    var savedSettings = JSON.parse(localStorage.getItem('settings')) || [];
    var savedTextSize = description;
    var savedTextSizeHeader = header;
    var textSize = {savedTextSize, savedTextSizeHeader};
    window.localStorage.setItem('settings', JSON.stringify(textSize));

    renderTaskList();
    renderTaskOngoingList();
    renderTaskFinishedList();
}

function createTask(event) {
    event.preventDefault();
    document.getElementById("currentCount").innerHTML = "0 ";

    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    const taskName = document.querySelector("[name='taskName']").value;
    const taskDescription = document.querySelector("[name='taskDescription']").value;
    const taskIcon = document.getElementById("pickedIcon").src;

    const taskChecklistUl = document.getElementsByClassName("checkListLi");
    var taskCheckListArray = [];

    for(var i = 0; i < taskChecklistUl.length; i++) {
        var taskChecklist = {
            checkPointName : taskChecklistUl[i].innerHTML,
            checked : false
        };
        taskCheckListArray.push(taskChecklist);

    }
    console.log(taskChecklistUl)
    
    let taskId = Math.floor(Math.random() * 1000);


    const task = { taskId, taskName, taskDescription, taskIcon, taskCheckListArray };
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

    let memberId = Math.floor(Math.random() * 1000);

    const member = {memberId, memberName };
    
    memberList.push(member);

    window.localStorage.setItem('member', JSON.stringify(memberList));

    event.target.reset();
    revealMembersSection();
    renderMemberList();
}

function checklistStatus (taskId, indexCheckbox, status, tasklistKey) {
    const taskList = JSON.parse(window.localStorage.getItem(tasklistKey)) || [];
    for(var i = 0; i < taskList.length; i++){
        if(taskList[i].taskId == taskId) {
            taskList[i].taskCheckListArray[indexCheckbox].checked = status;
        }
    }
    window.localStorage.setItem(tasklistKey, JSON.stringify(taskList));
}

function renderTaskList() {

    document.getElementById("pickedIcon").src="icons/default.png";

    var taskChecklist = document.getElementById("taskChecklist");
    while(taskChecklist.firstChild) taskChecklist.removeChild(taskChecklist.firstChild);
    
    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const unstartedTasks = document.getElementById("unstartedTasks");
    unstartedTasks.innerHTML = "";

    for (const task of taskList) {
        const taskElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, memberName, taskCheckListArray } = task;
        var taskChecklistDiv = "";
        var taskProgress = 0
        var finishedCheckpoint = 0;
        for(var i = 0; i < taskCheckListArray.length; i++) {
            if (taskCheckListArray[i].checked == true) {
                taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'task'); renderTaskList();" checked>
                <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'task');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                finishedCheckpoint++
            }
            if (taskCheckListArray[i].checked == false) {
                taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'task'); move(${taskId}, 'task', 'lists'); renderTaskList(); " type="checkbox">
                <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i}, event, 'task');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
            }
            taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
        }

        taskElement.innerHTML = `<div id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)" ondrop="dropNames(event)" ondragleave="dragLeave(event)">
                                <img id="taskIcon" src="${taskIcon}">
                                <div id="taskHeading"><h4 contentEditable="true" oninput="changeName(${taskId}, event, 'task');" style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                <div id="progressBarDiv"style="width: 379px; height: 20px; border: 1px solid lightgray;">
                                <div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>
                                <div id="checkList">${taskChecklistDiv}</div>
                                <p style="font-size: ${textSizeDescription};" contentEditable="true" oninput="changeDescription(${taskId}, event, 'task');" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId}, 'task')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                <div>${memberName}</div>
                                </div>
                                </div>`;
        unstartedTasks.appendChild(taskElement);
    }
}

function changeName(taskId, event, localStorageKey) {
    var taskList = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    for(const task of taskList) {
        if(task.taskId === taskId) {
            task.taskName = event.target.innerText;
            window.localStorage.setItem(localStorageKey, JSON.stringify(taskList));
        }
    }
}

function changeDescription(taskId, event, localStorageKey) {
    var taskList = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    for(const task of taskList) {
        if(task.taskId === taskId) {
            task.taskDescription = event.target.innerText;
            window.localStorage.setItem(localStorageKey, JSON.stringify(taskList));
        }
    }

}

function changeCheckpoint(taskId, checkPointIndex, event, localStorageKey) {
    var taskList = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    for(const task of taskList) {
        if(task.taskId === taskId) {
            task.taskCheckListArray[checkPointIndex].checkPointName = event.target.innerText;
            window.localStorage.setItem(localStorageKey, JSON.stringify(taskList));
        }
    }
}

function deleteTask(taskId, localStorageKey) {
    var taskList = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
	for(var i = 0; i < taskList.length; i++){
		if(taskList[i].taskId == taskId){
			taskList.splice(i, 1);
		}
	}
	window.localStorage.setItem(localStorageKey, JSON.stringify(taskList));
    renderTaskList();
    renderTaskOngoingList();
    renderArchiveList();
}

function renderTaskOngoingList() {


    document.getElementById("pickedIcon").src="icons/default.png";
    const ongoingList = JSON.parse(window.localStorage.getItem("ongoingTask")) || [];
    const ongoingTasks = document.getElementById("ongoingTasks");


    ongoingTasks.innerHTML = "";

        for(const task of ongoingList) {
            const taskElement = document.createElement("div");
            const { taskId, taskName, taskDescription, taskIcon, memberName, memberId, taskCheckListArray } = task;
            var taskChecklistDiv = "";
            var taskProgress = 0
            var finishedCheckpoint = 0;
            for(var i = 0; i < taskCheckListArray.length; i++) {
                if (taskCheckListArray[i].checked == true) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'lists'); renderTaskOngoingList();" checked>
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'lists');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                    finishedCheckpoint++
                }
                if (taskCheckListArray[i].checked == false) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'lists'); renderTaskOngoingList(); " type="checkbox">
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'lists');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                }
                taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
            }

            taskElement.innerHTML = `<div style="border: 2px dashed yellow" id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                    draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)" ondragleave="dragLeave(event)">
                                    <img id="taskIcon" src="${taskIcon}">
                                    <div id="taskHeading"><h4 contentEditable="true" oninput="changeName(${taskId}, event, 'lists');" style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    <div id="progressBarDiv"style="width: 379px; height: 20px; border: 1px solid lightgray;">
                                    <div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>
                                    <div id="checkList">${taskChecklistDiv}</div>
<<<<<<< HEAD
                                    <p style="font-size: ${textSizeDescription};" class="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId},'ongoingTask')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
=======
                                    <p style="font-size: ${textSizeDescription};" contentEditable="true" oninput="changeDescription(${taskId}, event, 'lists');" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId},'lists')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
>>>>>>> afe99f6a814facf161922e801acb20f4df5b72cf
                                    <div>${memberName}</div>
                                    </div>
                                    </div>`;
            ongoingTasks.appendChild(taskElement);
        }

}

function renderTaskFinishedList() {

    document.getElementById("pickedIcon").src="icons/default.png";
    const finishedList = JSON.parse(window.localStorage.getItem("finishedTask")) || [];
    const finishedTasks = document.getElementById("finishedTasks");

    finishedTasks.innerHTML = "";

    for (const task of finishedList) {
        const taskElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, memberName, memberId, taskCheckListArray } = task;
        var taskChecklistDiv = "";
            var taskProgress = 0
            var finishedCheckpoint = 0;
            for(var i = 0; i < taskCheckListArray.length; i++) {
                if (taskCheckListArray[i].checked == true) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'fList'); renderTaskFinishedList();" checked>
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'fList');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                    finishedCheckpoint++
                }
                if (taskCheckListArray[i].checked == false) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'fList'); renderTaskFinishedList(); " type="checkbox">
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'fList');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                }
                taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
            }

        taskElement.innerHTML = `<div style="border: 2px dashed green" id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                 ondragover="allowMoveNames(event)">
                                <img id="taskIcon" src="${taskIcon}">
                                <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; contentEditable="true" oninput="changeName(${taskId}, event, 'fList');" class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                <div id="progressBarDiv"style="width: 379px; height: 20px; border: 1px solid lightgray;">
                                <div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>
                                <div id="checkList">${taskChecklistDiv}</div>
                                <p style="font-size: ${textSizeDescription};" contentEditable="true" oninput="changeDescription(${taskId}, event, 'fList');" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                <button id="deleteTaskBtn" type="button" onclick="archiveTask(${taskId})" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                <div>${memberName}</div>
                                </div>
                                </div>`;
        finishedTasks.appendChild(taskElement);
    }
}

function renderArchiveList(){
    const archiveList = JSON.parse(localStorage.getItem("archive")) || [];

    let archive = document.getElementById("archive");

    archive.innerHTML = "";

    for(const ar of archiveList){
        let archiveElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, memberName, memberId, taskCheckListArray } = ar;
        var taskChecklistDiv = "";
        for(var i = 0; i < taskCheckListArray.length; i++) {
            if (taskCheckListArray[i].checked == true) {
                taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" disabled="disabled" checked>
                <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
            }
            if (taskCheckListArray[i].checked == false) {
                taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" disabled="disabled" type="checkbox">
                <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
            }
        }

        archiveElement.innerHTML = `<div id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                    draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)">
                                    <img id="taskIcon" src="${taskIcon}">
                                    <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    <div id="checkList">${taskChecklistDiv}</div>
                                    <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId}, 'archive'); renderArchiveList();" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div>${memberName}</div>
                                    </div>
                                    </div>`;
        archive.appendChild(archiveElement);
    }
}

function archiveTask(taskId) {
    const archiveList = JSON.parse(localStorage.getItem("archive")) || [];
    var fList = JSON.parse(window.localStorage.getItem("finishedTask")) || [];
	for(var i = 0; i < fList.length; i++){
		if(fList[i].taskId == taskId){
			archiveList.push(fList[i]);
            deleteTask(taskId, "finishedTask");
		}
	}
	window.localStorage.setItem("archive", JSON.stringify(archiveList));
    renderArchiveList();
    renderTaskFinishedList();
}

function deleteMember(memberId) {
    const memberSlots = document.getElementsByClassName("memberSlot");

    var memberList = JSON.parse(window.localStorage.getItem("member")) || [];
    console.log(memberList);
    for(var i = 0; i < memberList.length; i++) {
        if(memberList[i].memberId == memberId) {
            memberList.splice(i,1);
        }
    }
    window.localStorage.setItem("member", JSON.stringify(memberList));
    createMemberSlots()

}

function renderMemberList() {

    const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
    const memberSlots = document.getElementsByClassName("memberSlot");
    var counter = -1;

    for (var i = 0; i < memberSlots.length; i++){ 
        memberSlots[i].innerHTML = "";
    }
        for (const member of memberList) {

            const memberElement = document.createElement("div");
            const {memberId, memberName } = member;
            counter++;
            memberElement.innerHTML = `<div class="memberObject" id="${memberId}" 
                                      draggable="true" ondragstart="dragStartNames(event)" ondragleave="dragLeave(event)">
                                      <button id="deleteMemberBtn" type="button" onclick="deleteMember('${memberId}')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:20px;" alt="delete task"></button>
                                      <img id="memberImg" src="images/member.png" alt="member" width="45" height="45">
                                      <h4 id="memberNameHeading">${memberName}</h4>
                                      </div>`; 
            memberSlots[counter].appendChild(memberElement);
            memberSlots[counter].style.border = "1px solid gray";
            memberSlots[counter].style.backgroundColor = "#f7fafa";
    }
}

function createChecklistPoint() {

    var li = document.createElement("li");
    li.setAttribute("class", "checkListLi");
    var checklistInput = document.getElementById("taskChecklistInput").value;

    var node = document.createTextNode(checklistInput);
    li.appendChild(node);

    document.getElementById("taskChecklist").appendChild(li);
    document.getElementById("taskChecklistInput").value = "";

    revealCheckpoints();
}

function createMemberSlots(){
    membersSection.innerHTML = "";

    for(var i = 0; i < 11; i++){
        var memberSlot = document.createElement("div");
        memberSlot.setAttribute('class', 'memberSlot');
        membersSection.appendChild(memberSlot);
    }
    renderMemberList();
}

function createIconButtons(){
    var icons = ["airplane", "android", "bag", "bbq", "bike", "book", "brush", "building", "cake", "camera", "car", "clock", "cloud",
     "color-palette", "comment", "cutlery", "desktop-computer", "diagram", "drink", "earth", "envelope", "exclamation-mark", "film",
     "fitness", "flower", "game-controller", "health", "heart", "house", "laptop", "large-brush", "light-bulb", "mic", "moon", "motorcycle", "mug",
     "music-note", "paper-clip", "pet", "phone", "run", "school", "shopping-cart", "smartphone", "star", "store", "swim",
     "trophy", "truck", "wrench"];

    for(var i = 0; i < icons.length; i++){
        let button = document.createElement("button");
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'buttonIcon');
        button.setAttribute('id', `${icons[i]}Btn`);
        button.setAttribute('onclick', `document.getElementById("pickedIcon").src = "icons/${icons[i]}.png"`);
        let img = document.createElement("img");
        img.setAttribute('src', `icons/${icons[i]}.png`);
        img.setAttribute('class', 'imageIcon');
        img.setAttribute('alt', `${icons[i]}`);
        button.appendChild(img)
        taskIconForm.appendChild(button);
    }
}

function countCharacters(){
    document.getElementById("currentCount").innerHTML = taskDescription.value.length;
}