var textSizeDescription = "";
var textSizeHeader = "";
var memberCounter = 0;

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
    var textSize = {savedTextSize, savedTextSizeHeader}
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
    
    var taskId = 0;
    if (taskList.length != 0){
        taskId=taskList[taskList.length-1].taskId + 1;
    }

    const task = { taskId, taskName, taskDescription, taskIcon };
    taskList.push(task);

    window.localStorage.setItem('task', JSON.stringify(taskList));

    event.target.reset();
    hideSection(addTaskSection);
    renderTaskList();
}

function createMember(event) {
    event.preventDefault();
    memberCounter++;

    const memberName = document.querySelector("[name='memberName']").value;

    const member = { memberName };
    const memberList = JSON.parse(localStorage.getItem('member')) || [];
    memberList.push(member);

    window.localStorage.setItem('member', JSON.stringify(memberList));

    if(memberCounter >= 11){
        var memberSlot = document.createElement("div");
        memberSlot.setAttribute('class', 'memberSlot');
        memberSlot.setAttribute('id', `memberSlot${memberCounter}`);
        membersSection.appendChild(memberSlot);

        const addedMemberSlots = JSON.parse(localStorage.getItem('memberSlot')) || [];
        addedMemberSlots.push("memberSlot");
        window.localStorage.setItem('memberSlot', JSON.stringify(addedMemberSlots));
        renderAddedMemberSlots();
    }

    event.target.reset();
    revealMembersSection();
    renderMemberList();
}

function renderAddedMemberSlots(){
    const addedMemberSlots = JSON.parse(window.localStorage.getItem("memberSlot")) || [];
    const membersSection = document.getElementById("membersSection");

    for (const memberSlot of addedMemberSlots){
        const { memberSlot } = memberSlot;
        membersSection.appendChild(memberSlot);
    }
}

function renderTaskList() {

    document.getElementById("pickedIcon").src="icons/default.png";
    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const unstartedTasks = document.getElementById("unstartedTasks");

    unstartedTasks.innerHTML = "";

    for (const task of taskList) {
        const taskElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon } = task;

        taskElement.innerHTML = `<div class="taskObject" onclick="expandTask(this)">
                                <img id="taskIcon" src="${task.taskIcon}">
                                <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}</h4></div>
                                <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="adjustText">${task.taskDescription}</p>
                                <button id="deleteTaskBtn" type="button" onclick="deleteTask(${task.taskId})"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
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

function renderMemberList() {

    const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
    const memberSlots = document.getElementsByClassName("memberSlot");
    var counter = -1;

    for (var i = 0; i < memberSlots.length; i++){ 
        memberSlots[i].innerHTML = "";
    }
        for (const member of memberList) {
            const memberElement = document.createElement("div");
            const { memberName } = member;
            counter++;
            memberElement.innerHTML = `<div class="memberObject">
                                      <img src="images/member.png" alt="member" width="45" height="45">
                                      <h4>${member.memberName}</h4>
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
