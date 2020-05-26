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
    renderArchiveList();
}

function createTask(event) {
    event.preventDefault();
    document.getElementById("currentCount").innerHTML = "0 ";
    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    const taskName = document.querySelector("[name='taskName']").value;
    const taskDescription = document.querySelector("[name='taskDescription']").value;
    const taskIcon = document.getElementById("pickedIcon").src;
    const taskDeadlineInput = document.querySelector("[name='taskDeadlineInput']").value;
    const taskMembers = [];
    const taskChecklistUl = document.getElementsByClassName("checkListLi");
    var taskCheckListArray = [];
    const taskHeight = "230px";

    if(taskName == "") {
        console.log("missing taskname");
        document.getElementById("missingInputName").style.visibility = "visible";
        setTimeout("document.getElementById('missingInputName').style.visibility = 'hidden'", 5000);
        return false;
    }

    for(var i = 0; i < taskChecklistUl.length; i++) {
        var taskChecklist = {
            checkPointName : taskChecklistUl[i].innerHTML,
            checked : false
        };
        taskCheckListArray.push(taskChecklist);

    }
    console.log(taskChecklistUl)
    
    let taskId = Math.floor(Math.random() * 1000);
    const task = { taskId, taskName, taskDescription, taskIcon, taskCheckListArray, taskMembers, taskDeadlineInput, taskHeight};
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
    renderTaskFinishedList();
}

function archiveTask(taskId) {
    const archiveList = JSON.parse(localStorage.getItem("archive")) || [];
    var finishedList = JSON.parse(window.localStorage.getItem("finishedTask")) || [];
	for(var i = 0; i < finishedList.length; i++){
		if(finishedList[i].taskId == taskId){
			archiveList.push(finishedList[i]);
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
            memberElement.innerHTML = `<div class="memberObject" id="${memberId}" class="grabbable"
                                      draggable="true" ondragstart="dragStartNames(event)">
                                      <button id="deleteMemberBtn" type="button" onclick="deleteMember('${memberId}')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:20px;" alt="delete task"></button>
                                      <img id="memberImg" src="images/member.png" alt="member" width="45" height="45">
                                      <h4 id="memberNameHeading">${memberName}</h4>
                                      </div>`; 
            memberSlots[counter].appendChild(memberElement);
            memberSlots[counter].style.border = "1px solid gray";
            memberSlots[counter].style.backgroundColor = "#f0f0f0";
    }
}

function createChecklistPoint() {

    if (document.getElementById("taskChecklistInput").value != ""){
        console.log(document.getElementById("taskChecklistInput").value);
        var li = document.createElement("li");
        li.setAttribute("class", "checkListLi");
        var checklistInput = document.getElementById("taskChecklistInput").value;
    
        var node = document.createTextNode(checklistInput);
        li.appendChild(node);
    
        document.getElementById("taskChecklist").appendChild(li);
        document.getElementById("taskChecklistInput").value = "";
    
        revealCheckpoints();
    }
    else {
        document.getElementById("missingInputCheckpoint").style.visibility = "visible";
        setTimeout("document.getElementById('missingInputCheckpoint').style.visibility = 'hidden'", 5000);
    }
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