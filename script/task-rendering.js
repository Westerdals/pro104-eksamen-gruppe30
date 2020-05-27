

function changeHeight(task, taskId, localStorageKey) {
    var taskList = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    var newHeight;

    if (task.parentElement.style.height != "400px") {
        task.parentElement.style.height = "400px";
        task.firstChild.src = "images/checkpoints-open.png"
        task.firstChild.src.alt = "close checkpoints";
        newHeight = "400px";
    } else {
        task.parentElement.style.height = "230px";
        task.firstChild.src = "images/checkpoints-closed.png"
        task.firstChild.src.alt = "show checkpoints";
        newHeight = "230px"
    }
    for(const task of taskList) {
        if(task.taskId === taskId) {
            task.taskHeight = newHeight;
            window.localStorage.setItem(localStorageKey, JSON.stringify(taskList));
        }
    }
}

/*
Function makes the task stay open when user check/unchecks the checkbutton.
*/

function renderExpandImg (task){
    if(task == "400px") {
        return "images/checkpoints-open.png"
    }
    else {return "images/checkpoints-closed.png"}
}

/*
Function is rendering the created task and all the other existing tasks from the localStorage 'task'.
*/

function renderTaskList() {
    document.getElementById("pickedIcon").src="icons/default.png";
    var taskChecklist = document.getElementById("taskChecklist");
    while(taskChecklist.firstChild) taskChecklist.removeChild(taskChecklist.firstChild);
    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const unstartedTasks = document.getElementById("unstartedTasks");
    unstartedTasks.innerHTML = "";

    for (const task of taskList) {
        const taskElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, taskCheckListArray, taskMembers, taskDeadlineInput, taskHeight} = task;
        var taskChecklistDiv = "";
        var taskProgressBarDiv = "";
        var taskMemberDiv = "";
        var taskProgress = 0;
        var finishedCheckpoint = 0;
        var expandTaskBtnDiv = "";
        var taskDeadlineDiv = "";
        if(!taskDeadlineInput == "") {
            taskChecklistDiv = `<div id="taskDeadlineDiv">Due Date: ${taskDeadlineInput}</div>`
        }

        if(taskCheckListArray.length > 0) {
            taskChecklistDiv += `<div id="checkList">`;
            for(var i = 0; i < taskCheckListArray.length; i++) {
                if (taskCheckListArray[i].checked == true) {
                    taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'task'); renderTaskList()" checked>
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'task');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
                    finishedCheckpoint++
                }
                if (taskCheckListArray[i].checked == false) {
                    taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'task'); renderTaskList()" type="checkbox">
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i}, event, 'task');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
                }
            }
            taskChecklistDiv += `</div>`;
            taskProgressBarDiv = ` <div id="progressBarDiv"><div id="progressBar" style="max-width: 100%; width: ${100/taskCheckListArray.length * finishedCheckpoint}%; height: 20px; background-color: lightgreen;"></div></div>`
            expandTaskBtnDiv = `<button id="expandTaskBtn" type="button" onclick="changeHeight(this, ${taskId}, 'task')"><img src="${renderExpandImg(taskHeight)}" style="height:30px;" alt="show checkpoints"></button>`;

        }
        taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;

        for(var i = 0; i < task.taskMembers.length; i++) {
            taskMemberDiv += `<div class="memberIconDiv">${task.taskMembers[i].memberName.charAt(0).toUpperCase()+ task.taskMembers[i].memberName.charAt(1)+ task.taskMembers[i].memberName.charAt(2)}</div>`;
        } 
    taskElement.innerHTML = `<div id="${taskId}" class="taskObject" style="height:${taskHeight}"draggable="true" ondragstart="dragStartNames(event)" ondragover="allowMoveNames(event)" ondrop="dropNames(event, 'task');">
                                    <img id="taskIcon" src="${taskIcon}">
                                    ${expandTaskBtnDiv}
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId},'task')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div id="taskHeading"><h4 contentEditable="true" oninput="changeName(${taskId}, event, 'task');" style="font-size: ${textSizeHeader}" class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    ${taskChecklistDiv}
                                    ${taskProgressBarDiv}
                                    <p style="font-size: ${textSizeDescription};" contentEditable="true" oninput="changeDescription(${taskId}, event, 'task');" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                    <div id="memberIconGrid">${taskMemberDiv}</div>
                                    
                                    ${taskDeadlineDiv}
                                    </div>`;
    unstartedTasks.appendChild(taskElement);

    }
}

/*
Function is using the move(taskId, localStorageKey, newLocalStorageKey) function to render the task
in the ongoingTask div.
*/

function renderTaskOngoingList() {
    document.getElementById("pickedIcon").src="icons/default.png";
    const ongoingList = JSON.parse(window.localStorage.getItem("ongoingTask")) || [];
    const ongoingTasks = document.getElementById("ongoingTasks");

    ongoingTasks.innerHTML = "";

        for(const task of ongoingList) {
            const taskElement = document.createElement("div");
            const { taskId, taskName, taskDescription, taskIcon, memberName, memberId, taskCheckListArray, taskDeadlineInput, taskHeight } = task;
            var taskChecklistDiv = "";
            var taskProgressBarDiv = "";
            var taskProgress = 0
            var finishedCheckpoint = 0;
            var taskMemberDiv = "";
            var expandTaskBtnDiv = "";
            var taskDeadlineDiv = "";
            if(!taskDeadlineInput == "") {
                taskChecklistDiv = `<div id="taskDeadlineDiv">Due Date: ${taskDeadlineInput}</div>`
            }
            if(taskCheckListArray.length > 0) {
                taskChecklistDiv += `<div id="checkList">`;
                for(var i = 0; i < taskCheckListArray.length; i++) {
                    if (taskCheckListArray[i].checked == true) {
                        taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'ongoingTask'); renderTaskOngoingList();" checked>
                        <label  contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'ongoingTask');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
                        finishedCheckpoint++
                    }
                    if (taskCheckListArray[i].checked == false) {
                        taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'ongoingTask'); renderTaskOngoingList()"; type="checkbox">
                        <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i}, event, 'ongoingTask');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
                    }
                }
                taskChecklistDiv += `</div>`;
                taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
                taskProgressBarDiv = ` <div id="progressBarDiv"><div id="progressBar" style="max-width: 100%; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>`
                expandTaskBtnDiv = `<button id="expandTaskBtn" type="button" onclick="changeHeight(this, ${taskId}, 'ongoingTask')"><img src="${renderExpandImg(taskHeight)}" style="height:30px;" alt="show checkpoints"></button>`;
            }
            for(var i = 0; i < task.taskMembers.length; i++) {
                taskMemberDiv += `<div class="memberIconDiv">${task.taskMembers[i].memberName.charAt(0).toUpperCase()+ task.taskMembers[i].memberName.charAt(1)+ task.taskMembers[i].memberName.charAt(2)}</div>`;
            }
            taskElement.innerHTML = `<div id="${taskId}" class="taskObject" style="height:${taskHeight}" ondrop="dropNames(event, 'ongoingTasks');"
                                    draggable="true" ondragstart="dragStartNames(event)" ondragover="allowMoveNames(event)" ondrop="dropNames(event)">
                                    ${expandTaskBtnDiv}
                                    <img id="taskIcon" src="${taskIcon}">
                                    ${expandTaskBtnDiv}
                                    <div id="taskHeading"><h4 contentEditable="true" oninput="changeName(${taskId}, event, 'ongoingTask');" style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    ${taskChecklistDiv}
                                    ${taskProgressBarDiv}
                                    <p style="font-size: ${textSizeDescription};" contentEditable="true" oninput="changeDescription(${taskId}, event, 'ongoingTask');" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId},'ongoingTask')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div id="memberIconGrid">${taskMemberDiv}</div>
                                    ${taskDeadlineDiv}
                                    </div>
                                    </div>`;
            ongoingTasks.appendChild(taskElement);
        }
}

/*
Function is using the move(taskId, localStorageKey, newLocalStorageKey) function to render the task
in the finishedTask div.
*/

function renderTaskFinishedList() {

    document.getElementById("pickedIcon").src="icons/default.png";
    const finishedList = JSON.parse(window.localStorage.getItem("finishedTask")) || [];
    const finishedTasks = document.getElementById("finishedTasks");

    finishedTasks.innerHTML = "";

    for (const task of finishedList) {
        const taskElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, taskCheckListArray, taskMembers, taskDeadlineInput, taskHeight } = task;
        var taskChecklistDiv = "";
        var taskProgressBarDiv = "";
        var taskProgress = 0;
        var expandTaskBtnDiv = "";
        var taskMemberDiv = "";
        var expandTaskBtnDiv = "";
        var finishedCheckpoint = 0;
        var taskDeadlineDiv = "";
        if(!taskDeadlineInput == "") {
            taskChecklistDiv = `<div id="taskDeadlineDiv">Due Date: ${taskDeadlineInput}</div>`
        }
        if(taskCheckListArray.length > 0) {
            taskChecklistDiv += `<div id="checkList">`;
            for(var i = 0; i < taskCheckListArray.length; i++) {
                if (taskCheckListArray[i].checked == true) {
                    taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'finishedTask'); renderTaskFinishedList();" checked>
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'finishedTask');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
                    finishedCheckpoint++
                }
                if (taskCheckListArray[i].checked == false) {
                    taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'finishedTask'); renderTaskFinishedList()"; type="checkbox">
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i}, event, 'finishedTask');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
                }
            }
            taskChecklistDiv += `</div>`;
            taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
            taskProgressBarDiv = ` <div id="progressBarDiv"><div id="progressBar" style="max-width: 100%; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>`
            expandTaskBtnDiv = `<button id="expandTaskBtn" type="button" onclick="changeHeight(this, ${taskId}, 'finishedTask')"><img src="${renderExpandImg(taskHeight)}" style="height:30px;" alt="show checkpoints"></button>`;
        }
        for(var i = 0; i < task.taskMembers.length; i++) {
            taskMemberDiv += `<div class="memberIconDiv">${task.taskMembers[i].memberName.charAt(0).toUpperCase()+ task.taskMembers[i].memberName.charAt(1)+ task.taskMembers[i].memberName.charAt(2)}</div>`;
        }

        taskElement.innerHTML = `<div id="${taskId}" class="taskObject" style="height:${taskHeight}"
                                 draggable="true" ondragstart="dragStartNames(event)" ondragover="allowMoveNames(event)" ondrop="dropNames(event)">
                                <img id="taskIcon" src="${taskIcon}">
                                ${expandTaskBtnDiv}
                                <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; contentEditable="true" oninput="changeName(${taskId}, event, 'finishedTask');" class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                ${taskChecklistDiv}
                                ${taskProgressBarDiv}
                                <p style="font-size: ${textSizeDescription};" contentEditable="true" oninput="changeDescription(${taskId}, event, 'finishedTask');" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                <button id="archiveTaskBtn" type="button" onclick="archiveTask(${taskId})" onmouseover="this.firstChild.src = 'images/filled-archive.png'" onmouseout="this.firstChild.src = 'images/archive.png'"><img src="images/archive.png" id="trashcan" style="height:28px;" alt="delete task"></button>
                                <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId},'finishedTask')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                <div id="memberIconGrid">${taskMemberDiv}</div>
                                ${taskDeadlineDiv}
                                </div>
                                </div>`;
        finishedTasks.appendChild(taskElement);
    }
}

/*
Function is triggered by the archiveTask(taskId) function which moves the taskId's object from finishedTask
localStorage to the archive localStorage.
*/

function renderArchiveList(){
    const archiveList = JSON.parse(localStorage.getItem("archive")) || [];

    let archive = document.getElementById("archive");

    archive.innerHTML = "";

    for(const ar of archiveList){
        let archiveElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, taskCheckListArray, taskMembers, taskDeadlineInput, taskHeight } = ar;
        var taskChecklistDiv = "";
        var taskMemberDiv = "";
        var expandTaskBtnDiv = "";
        var taskProgressBarDiv = "";
        var taskProgress = 0;
        var finishedCheckpoint = 0;
        var taskDeadlineDiv = "";
        if(!taskDeadlineInput == "") {
            taskChecklistDiv = `<div id="taskDeadlineDiv">Due Date: ${taskDeadlineInput}</div>`
        }
        for(var i = 0; i < taskCheckListArray.length; i++) {
            if (taskCheckListArray[i].checked == true) {
                taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" type="checkbox" disabled="disabled" checked>
                <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
                finishedCheckpoint++
            }
            if (taskCheckListArray[i].checked == false) {
                taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" disabled="disabled" type="checkbox">
                <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
            }
            expandTaskBtnDiv = `<button id="expandTaskBtn" type="button" onclick="changeHeight(this, ${taskId}, 'ongoingTask')"><img src="${renderExpandImg(taskHeight)}" style="height:30px;" alt="show checkpoints"></button>`;
            taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
            taskProgressBarDiv = ` <div id="progressBarDiv"><div id="progressBar" style="max-width: 100%; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>`
        }
        
        for(var i = 0; i < ar.taskMembers.length; i++) {
            taskMemberDiv += `<div class="memberIconDiv">${ar.taskMembers[i].memberName.charAt(0).toUpperCase()+ ar.taskMembers[i].memberName.charAt(1)+ ar.taskMembers[i].memberName.charAt(2)}</div>`;
        }

        archiveElement.innerHTML = `<div id="${taskId}" class="taskObject"  style="height:${taskHeight}"
                                    draggable="true" ondragstart="dragStartNames(event)" ondragover="allowMoveNames(event)">
                                    <img id="taskIcon" src="${taskIcon}">
                                    ${expandTaskBtnDiv}
                                    <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    ${taskProgressBarDiv}
                                    <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId}, 'archive'); renderArchiveList();" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div id="memberIconGrid">${taskMemberDiv}</div>
                                    <div id="checkList">${taskChecklistDiv}</div>
                                    </div>
                                    </div>`;

        archive.appendChild(archiveElement);
    }
}