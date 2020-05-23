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
}

function createTask(event) {
    event.preventDefault();
    document.getElementById("currentCount").innerHTML = "0 ";

    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    const taskName = document.querySelector("[name='taskName']").value;
    const taskDescription = document.querySelector("[name='taskDescription']").value;
    const taskIcon = document.getElementById("pickedIcon").src;


    let taskId = taskList.length;

    const task = { taskId, taskName, taskDescription, taskIcon };
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

    const member = {memberId, memberName };
    
    memberList.push(member);

    window.localStorage.setItem('member', JSON.stringify(memberList));

    event.target.reset();
    revealMembersSection();
    renderMemberList();
}


function renderTaskList() {

    document.getElementById("pickedIcon").src="icons/default.png";
    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    //const assignedList = JSON.parse(window.localStorage.getItem("assign")) || [];
    const unstartedTasks = document.getElementById("unstartedTasks");

    unstartedTasks.innerHTML = "";

    for (const task of taskList) {

        const taskElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, memberName } = task;

        taskElement.innerHTML = `<div id="${taskId}" class="taskObject" onclick="expandTask(this)" ondrop="dropNames(event)"
                                draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)">
                                <img id="taskIcon" src="${taskIcon}">
                                <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId})"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                <div>${memberName}</div>
                                </div>
                                </div>`;
        unstartedTasks.appendChild(taskElement);
    }
}

function deleteTask(taskId) {
    var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
	for(var i = 0; i < taskList.length; i++){
		if(taskList[i].taskId == taskId){
			taskList.splice(i, 1);
		}
	}
	window.localStorage.setItem("task", JSON.stringify(taskList));
    renderTaskList();
}

function renderTaskOngoingList() {


    document.getElementById("pickedIcon").src="icons/default.png";
    const lists = JSON.parse(window.localStorage.getItem("lists")) || [];
    const ongoingTasks = document.getElementById("ongoingTasks");


    ongoingTasks.innerHTML = "";

        for(const task of lists) {
            const taskElement = document.createElement("div");
            const { taskId, taskName, taskDescription, taskIcon, memberName } = task;

            taskElement.innerHTML = `<div style="border: 4px dashed yellow" id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                    draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)" ondrop="dropNames(event)">
                                    <img id="taskIcon" src="${taskIcon}">
                                    <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTaskOngoing(${taskId})"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div>${memberName}</div>
                                    </div>
                                    </div>`;
            ongoingTasks.appendChild(taskElement);
        }

}

function deleteTaskOngoing(taskId) {
    var lists = JSON.parse(window.localStorage.getItem("lists")) || [];
  for(var i = 0; i < lists.length; i++){
    if(lists[i].taskId == taskId){
      lists.splice(i, 1);
    }
  }
    window.localStorage.setItem("lists", JSON.stringify(lists));
    renderTaskOngoingList();
  }

function renderTaskFinishedList() {

    document.getElementById("pickedIcon").src="icons/default.png";
    const fList = JSON.parse(window.localStorage.getItem("fList")) || [];
    const finishedTasks = document.getElementById("finishedTasks");

    finishedTasks.innerHTML = "";

    for (const task of fList) {
        const taskElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, memberName } = task;

        taskElement.innerHTML = `<div style="border: 4px dashed green" id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)" ondrop="dropNames(event)">
                                <img id="taskIcon" src="${taskIcon}">
                                <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                <button id="deleteTaskBtn" type="button" onclick="archiveTask(${taskId})"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                <div id="droppedMember" class="droppedMember" 
                                 ondrop="dropNames(event)">${memberName}</div>
                                </div>
                                </div>`;
        finishedTasks.appendChild(taskElement);
    }
}



function deleteTaskFinished(taskId) {
    var fList = JSON.parse(window.localStorage.getItem("fList")) || [];
  for(var i = 0; i < fList.length; i++){
    if(fList[i].taskId == taskId){
      fList.splice(i, 1);
    }
  }
    window.localStorage.setItem("fList", JSON.stringify(fList));
    renderTaskFinishedList();
  }

function renderArchiveList(){
    const archiveList = JSON.parse(localStorage.getItem("archive")) || [];

    let archive = document.getElementById("archive");

    archive.innerHTML = "";

    for(const ar of archiveList){
        let archiveElement = document.createElement("div");
        
        const { taskId, taskName, taskDescription, taskIcon, memberName } = ar;

        archiveElement.innerHTML = `<div id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                    draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)">
                                    <img id="taskIcon" src="${taskIcon}">
                                    <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTaskFromArchive(${taskId})"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div id="droppedMember" class="droppedMember" 
                                    ondrop="dropNames(event)">${memberName}</div>
                                    </div>
                                    </div>`;
        archive.appendChild(archiveElement);
    }
}

function deleteTaskFromArchive(taskId){
    const archiveList = JSON.parse(window.localStorage.getItem("archive")) || [];
  for(var i = 0; i < archiveList.length; i++){
    if(archiveList[i].taskId == taskId){
      archiveList.splice(i, 1);
    }
  }
    window.localStorage.setItem("archive", JSON.stringify(archiveList));
    renderArchiveList();
}

function archiveTask(taskId) {
    const archiveList = JSON.parse(localStorage.getItem("archive")) || [];
    var fList = JSON.parse(window.localStorage.getItem("fList")) || [];
	for(var i = 0; i < fList.length; i++){
		if(fList[i].taskId == taskId){
			archiveList.push(fList[i]);
            deleteTaskFinished(taskId);
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