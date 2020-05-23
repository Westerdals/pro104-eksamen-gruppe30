var textSizeDescription = "";
var textSizeHeader = "";
// var memberCounter = 0;

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
<<<<<<< HEAD
    const taskChecklist = document.getElementById("taskChecklist").getElementsByTagName("li");
    const taskChecklistPoints = [];

    for (var i = 0; i < taskChecklist.length; i++){
        taskChecklistPoints.push(taskChecklist[i].innerHTML);
    }
=======

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
>>>>>>> master
    
    let taskId = 0;
    if (taskList.length != 0){
        taskId=taskList[taskList.length-1].taskId + 1;
    }


<<<<<<< HEAD
    const task = { taskId, taskName, taskDescription, taskChecklistPoints, taskIcon };
=======
    const task = { taskId, taskName, taskDescription, taskIcon, taskCheckListArray };
>>>>>>> master
    taskList.push(task);

    window.localStorage.setItem('task', JSON.stringify(taskList));

    event.target.reset();
    hideSection(addTaskSection);
    renderTaskList();
}

function createMember(event) {
    event.preventDefault();
 //   memberCounter++;

    const memberName = document.querySelector("[name='memberName']").value;
    const memberList = JSON.parse(localStorage.getItem('member')) || [];

    let memberId = 0;
    if (memberList.length != 0){
        memberId=memberList[memberList.length-1].memberId + 1;
    }

    const member = {memberId, memberName };
    
    memberList.push(member);

    window.localStorage.setItem('member', JSON.stringify(memberList));

  //  if(memberCounter >= 11){
  //      var memberSlot = document.createElement("div");
  //      memberSlot.setAttribute('class', 'memberSlot');
 //       memberSlot.setAttribute('id', `memberSlot${memberCounter}`);
 //      membersSection.appendChild(memberSlot);

 //       const addedMemberSlots = JSON.parse(localStorage.getItem('memberSlot')) || [];
 //       addedMemberSlots.push("memberSlot");
 //       window.localStorage.setItem('memberSlot', JSON.stringify(addedMemberSlots));
//       renderAddedMemberSlots();
//    }

    event.target.reset();
    revealMembersSection();
    renderMemberList();
}

<<<<<<< HEAD
//function renderAddedMemberSlots(){
  //  const addedMemberSlots = JSON.parse(window.localStorage.getItem("memberSlot")) || [];
  //  const membersSection = document.getElementById("membersSection");

  //  for (const memberSlot of addedMemberSlots){
  //      const { memberSlot } = memberSlot;
  //      membersSection.appendChild(memberSlot);
   // }
//}
=======
function checklistStatus (taskId, indexCheckbox, status, tasklistKey) {
    const taskList = JSON.parse(window.localStorage.getItem(tasklistKey)) || [];
    for(var i = 0; i < taskList.length; i++){
        if(taskList[i].taskId == taskId) {
            taskList[i].taskCheckListArray[indexCheckbox].checked = status;
        }
    }
    window.localStorage.setItem(tasklistKey, JSON.stringify(taskList));
}
>>>>>>> master

function renderTaskList() {

    document.getElementById("pickedIcon").src="icons/default.png";
    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const unstartedTasks = document.getElementById("unstartedTasks");
    unstartedTasks.innerHTML = "";

    const taskChecklistPoints = taskList.taskChecklistPoints;
    const taskChecklist = document.createElement("ul");

    for(var i = 0; i < taskChecklistPoints.length; i++){
        var taskChecklistPoint = document.createElement("li");
        taskChecklistPoint.innerHTML = taskChecklistPoints[i];
        taskChecklist.appendChild(taskChecklistPoint);
    }

    console.log(taskChecklist);

    for (const task of taskList) {
        const taskElement = document.createElement("div");
<<<<<<< HEAD
        const { taskId, taskName, taskDescription, taskChecklistPoints, taskIcon } = task;

        taskElement.innerHTML = `<div class="taskObject" onclick="expandTask(this)">
                                <img id="taskIcon" src="${task.taskIcon}">
                                <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}</h4></div>
                                <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="adjustText">${task.taskDescription}</p>
                                ${taskChecklist}
                                <button id="deleteTaskBtn" type="button" onclick="deleteTask(${task.taskId})"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
=======
        const { taskId, taskName, taskDescription, taskIcon, taskCheckListArray } = task;
        var taskChecklistDiv = "";
        var taskProgress = 0
        var finishedCheckpoint = 0;
        for(var i = 0; i < taskCheckListArray.length; i++) {
            if (taskCheckListArray[i].checked == true) {
                taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'task'); renderTaskList();" checked>
                <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                finishedCheckpoint++
            }
            if (taskCheckListArray[i].checked == false) {
                taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'task'); renderTaskList(); " type="checkbox">
                <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
            }
            taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
        }

        taskElement.innerHTML = `<div id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)" ondrop="dropNames(event)">
                                <img id="taskIcon" src="${taskIcon}">
                                <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                <div id="progressBarDiv"style="width: 379px; height: 20px; border: 1px solid lightgray;">
                                <div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>
                                <div id="checkList">${taskChecklistDiv}</div>
                                <p style="font-size: ${textSizeDescription};" class="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId}, 'task')"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                <div>Members</div>
                                </div>
>>>>>>> master
                                </div>`;
        unstartedTasks.appendChild(taskElement);
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
}

function renderTaskOngoingList() {


    document.getElementById("pickedIcon").src="icons/default.png";
    const lists = JSON.parse(window.localStorage.getItem("lists")) || [];
    const ongoingTasks = document.getElementById("ongoingTasks");


    ongoingTasks.innerHTML = "";

        for(const task of lists) {
            const taskElement = document.createElement("div");
            const { taskId, taskName, taskDescription, taskIcon, memberName, memberId, taskCheckListArray } = task;
            var taskChecklistDiv = "";
            var taskProgress = 0
            var finishedCheckpoint = 0;
            for(var i = 0; i < taskCheckListArray.length; i++) {
                if (taskCheckListArray[i].checked == true) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'lists'); renderTaskOngoingList();" checked>
                    <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                    finishedCheckpoint++
                }
                if (taskCheckListArray[i].checked == false) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'lists'); renderTaskOngoingList(); " type="checkbox">
                    <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                }
                taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
            }

            taskElement.innerHTML = `<div style="border: 2px dashed yellow" id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                    draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)">
                                    <img id="taskIcon" src="${taskIcon}">
                                    <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    <div id="progressBarDiv"style="width: 379px; height: 20px; border: 1px solid lightgray;">
                                    <div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>
                                    <div id="checkList">${taskChecklistDiv}</div>
                                    <p style="font-size: ${textSizeDescription};" class="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId},'lists')"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div>${memberName}</div>
                                    </div>
                                    </div>`;
            ongoingTasks.appendChild(taskElement);
        }

}

function renderTaskFinishedList() {

    document.getElementById("pickedIcon").src="icons/default.png";
    const fList = JSON.parse(window.localStorage.getItem("fList")) || [];
    const finishedTasks = document.getElementById("finishedTasks");

    finishedTasks.innerHTML = "";

    for (const task of fList) {
        const taskElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, memberName, memberId, taskCheckListArray } = task;
        var taskChecklistDiv = "";
            var taskProgress = 0
            var finishedCheckpoint = 0;
            for(var i = 0; i < taskCheckListArray.length; i++) {
                if (taskCheckListArray[i].checked == true) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'fList'); renderTaskFinishedList();" checked>
                    <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                    finishedCheckpoint++
                }
                if (taskCheckListArray[i].checked == false) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'fList'); renderTaskFinishedList(); " type="checkbox">
                    <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                }
                taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
            }

        taskElement.innerHTML = `<div style="border: 2px dashed green" id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)">
                                <img id="taskIcon" src="${taskIcon}">
                                <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                <div id="progressBarDiv"style="width: 379px; height: 20px; border: 1px solid lightgray;">
                                    <div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>
                                <div id="checkList">${taskChecklistDiv}</div>
                                <p style="font-size: ${textSizeDescription};" class="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                <button id="deleteTaskBtn" type="button" onclick="archiveTask(${taskId})"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                <div>${memberName}</div>
                                </div>
                                </div>`;
        finishedTasks.appendChild(taskElement);
    }
}

/*function deleteTaskFinished(taskId) {
    var fList = JSON.parse(window.localStorage.getItem("fList")) || [];
  for(var i = 0; i < fList.length; i++){
    if(fList[i].taskId == taskId){
      fList.splice(i, 1);
    }
  }
    window.localStorage.setItem("fList", JSON.stringify(fList));
    renderTaskFinishedList();
  }*/

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
                                    <p style="font-size: ${textSizeDescription};" class="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId}, 'archive'); renderArchiveList();"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div>${memberName}</div>
                                    </div>
                                    </div>`;
        archive.appendChild(archiveElement);
    }
}

function archiveTask(taskId) {
    const archiveList = JSON.parse(localStorage.getItem("archive")) || [];
    var fList = JSON.parse(window.localStorage.getItem("fList")) || [];
	for(var i = 0; i < fList.length; i++){
		if(fList[i].taskId == taskId){
			archiveList.push(fList[i]);
            deleteTask(taskId, "fList");
		}
	}
	window.localStorage.setItem("archive", JSON.stringify(archiveList));
	renderArchiveList();
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
                                      draggable="true" ondragstart="dragStartNames(event)">
                                      <button id="deleteMemberBtn" type="button" onclick="deleteMember('${memberId}')"><img src="images/trashcan.png" id="trashcan" style="height:20px;" alt="delete task"></button>
                                      <img src="images/member.png" alt="member" width="45" height="45">
                                      <h4>${memberName}</h4>
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