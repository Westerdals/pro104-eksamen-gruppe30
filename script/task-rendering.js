function renderTaskList() {
    document.getElementById("pickedIcon").src="icons/default.png";
    var taskChecklist = document.getElementById("taskChecklist");
    while(taskChecklist.firstChild) taskChecklist.removeChild(taskChecklist.firstChild);
    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const unstartedTasks = document.getElementById("unstartedTasks");
    unstartedTasks.innerHTML = "";

    for (const task of taskList) {
        const taskElement = document.createElement("div");
        const { taskId, taskName, taskDescription, taskIcon, taskCheckListArray, taskMembers, taskDeadlineInput} = task;
        var taskChecklistDiv = "";
        var taskProgressBarDiv = "";
        var taskMemberDiv = "";
        var taskProgress = 0;
        var finishedCheckpoint = 0;
        var expandTaskBtnDiv = "";

        if(taskCheckListArray.length > 0) {
            taskChecklistDiv += `<div id="checkList">`;
            for(var i = 0; i < taskCheckListArray.length; i++) {
                if (taskCheckListArray[i].checked == true) {
                    taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'task'); renderTaskList();" checked>
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'task');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
                    finishedCheckpoint++
                }
                if (taskCheckListArray[i].checked == false) {
                    taskChecklistDiv += `<div id="fullCheckpoint"><input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'task');"; type="checkbox">
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i}, event, 'task');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label></div>`
                }
            }
            taskChecklistDiv += `</div>`;
            taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
            taskProgressBarDiv = ` <div id="progressBarDiv"><div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>`
            expandTaskBtnDiv = `<button id="expandTaskBtn" type="button" onclick="expandTask(this)"><img src="images/expand.png" style="height:30px;" alt="expand task"></button>`;

        }

        for(var i = 0; i < task.taskMembers.length; i++) {
            taskMemberDiv += `<div class="memberIconDiv">${task.taskMembers[i].memberName.charAt(0)}</div>`;
        } 
    taskElement.innerHTML = `<div id="${taskId}" class="taskObject" draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)" ondragleave="dragLeave(event)" ondrop="dropNames(event, 'task');">
                                    <img id="taskIcon" src="${taskIcon}">
                                    ${expandTaskBtnDiv}
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId},'task')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div id="taskHeading"><h4 contentEditable="true" oninput="changeName(${taskId}, event, 'task');" style="font-size: ${textSizeHeader}" class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    ${taskChecklistDiv}
                                    ${taskProgressBarDiv}
                                    <p style="font-size: ${textSizeDescription};" contentEditable="true" oninput="changeDescription(${taskId}, event, 'task');" class="taskDescriptionPara adjustText" ondrop="dropNames(event, 'task');">${taskDescription}</p>
                                    <div id="memberIconFlex">${taskMemberDiv}</div>
                                    <div id="taskDeadlineDiv">Due Date: ${taskDeadlineInput}</div>
                                    </div>`;
    unstartedTasks.appendChild(taskElement);

    }
}

function renderTaskOngoingList() {
    document.getElementById("pickedIcon").src="icons/default.png";
    const ongoingList = JSON.parse(window.localStorage.getItem("ongoingTask")) || [];
    const ongoingTasks = document.getElementById("ongoingTasks");

    ongoingTasks.innerHTML = "";

        for(const task of ongoingList) {
            const taskElement = document.createElement("div");
            const { taskId, taskName, taskDescription, taskIcon, memberName, memberId, taskCheckListArray, taskDeadlineInput } = task;
            var taskChecklistDiv = "";
            var taskProgressBarDiv = "";
            var taskProgress = 0
            var finishedCheckpoint = 0;
            var taskMemberDiv = "";
            var expandTaskBtnDiv = "";
            if(taskCheckListArray.length > 0) {
                taskChecklistDiv += `<div id="checkList">`;
                for(var i = 0; i < taskCheckListArray.length; i++) {
                    if (taskCheckListArray[i].checked == true) {
                        taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'ongoingTask'); renderTaskOngoingList();" checked>
                        <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'ongoingTask');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                        finishedCheckpoint++
                    }
                    if (taskCheckListArray[i].checked == false) {
                        taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'ongoingTask'); renderTaskOngoingList()"; type="checkbox">
                        <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i}, event, 'ongoingTask');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                    }
                }
                taskChecklistDiv += `</div>`;
                taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
                taskProgressBarDiv = ` <div id="progressBarDiv"><div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>`
                expandTaskBtnDiv = `<button id="expandTaskBtn" type="button" onclick="expandTask(this)"><img src="images/expand.png" style="height:30px;" alt="expand task"></button>`;
            }
            for(var i = 0; i < task.taskMembers.length; i++) {
                taskMemberDiv += `<div class="memberIconDiv">${task.taskMembers[i].memberName.charAt(0)}</div>`;
            }
            taskElement.innerHTML = `<div id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                    draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)" ondragleave="dragLeave(event)" ondrop="dropNames(event)">
                                    ${expandTaskBtnDiv}
                                    <img id="taskIcon" src="${taskIcon}">
                                    ${expandTaskBtnDiv}
                                    <div id="taskHeading"><h4 contentEditable="true" oninput="changeName(${taskId}, event, 'ongoingTask');" style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    ${taskChecklistDiv}
                                    ${taskProgressBarDiv}
                                    <p style="font-size: ${textSizeDescription};" contentEditable="true" oninput="changeDescription(${taskId}, event, 'ongoingTask');" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId},'ongoingTask')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div id="memberIconFlex">${taskMemberDiv}</div>
                                    <div id="taskDeadlineDiv">Due Date: ${taskDeadlineInput}</div>
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
        const { taskId, taskName, taskDescription, taskIcon, taskCheckListArray, taskMembers, taskDeadlineInput } = task;
        var taskChecklistDiv = "";
        var taskProgressBarDiv = "";
        var taskProgress = 0;
        var expandTaskBtnDiv = "";
        var taskMemberDiv = "";
        var expandTaskBtnDiv = "";
        var finishedCheckpoint = 0;
        if(taskCheckListArray.length > 0) {
            taskChecklistDiv += `<div id="checkList">`;
            for(var i = 0; i < taskCheckListArray.length; i++) {
                if (taskCheckListArray[i].checked == true) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" onclick="checklistStatus(${taskId}, ${i}, false, 'finishedTask'); renderTaskFinishedList();" checked>
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i} ,event, 'finishedTask');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                    finishedCheckpoint++
                }
                if (taskCheckListArray[i].checked == false) {
                    taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" onclick="checklistStatus(${taskId}, ${i}, true, 'finishedTask'); renderTaskFinishedList()"; type="checkbox">
                    <label contentEditable="true" oninput="changeCheckpoint(${taskId}, ${i}, event, 'finishedTask');" for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
                }
            }
            taskChecklistDiv += `</div>`;
            taskProgress = 100/taskCheckListArray.length * finishedCheckpoint;
            taskProgressBarDiv = ` <div id="progressBarDiv"><div id="progressBar" style="max-width: 380px; width: ${taskProgress}%; height: 20px; background-color: lightgreen;"></div></div>`
            expandTaskBtnDiv = `<button id="expandTaskBtn" type="button" onclick="expandTask(this)"><img src="images/expand.png" style="height:30px;" alt="expand task"></button>`;
        }
        for(var i = 0; i < task.taskMembers.length; i++) {
            taskMemberDiv += `<div class="memberIconDiv">${task.taskMembers[i].memberName.charAt(0)}</div>`;
        }

        taskElement.innerHTML = `<div id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                 draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)" ondrop="dropNames(event)">
                                <img id="taskIcon" src="${taskIcon}">
                                ${expandTaskBtnDiv}
                                <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; contentEditable="true" oninput="changeName(${taskId}, event, 'finishedTask');" class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                ${taskChecklistDiv}
                                ${taskProgressBarDiv}
                                <p style="font-size: ${textSizeDescription};" contentEditable="true" oninput="changeDescription(${taskId}, event, 'finishedTask');" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                <button id="archiveTaskBtn" type="button" onclick="archiveTask(${taskId})" onmouseover="this.firstChild.src = 'images/filled-archive.png'" onmouseout="this.firstChild.src = 'images/archive.png'"><img src="images/archive.png" id="trashcan" style="height:28px;" alt="delete task"></button>
                                <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId},'finishedTask')" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                <div id="memberIconFlex">${taskMemberDiv}</div>
                                <div id="taskDeadlineDiv">Due Date: ${taskDeadlineInput}</div>
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
        const { taskId, taskName, taskDescription, taskIcon, taskCheckListArray, taskMembers, taskDeadlineInput } = ar;
        var taskChecklistDiv = "";
        var taskMemberDiv = "";
        var expandTaskBtnDiv = "";
        for(var i = 0; i < taskCheckListArray.length; i++) {
            if (taskCheckListArray[i].checked == true) {
                taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" type="checkbox" disabled="disabled" checked>
                <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
            }
            if (taskCheckListArray[i].checked == false) {
                taskChecklistDiv += `<input name="${taskCheckListArray[i].checkPointName}" disabled="disabled" type="checkbox">
                <label for="${taskCheckListArray[i].checkPointName}"> ${taskCheckListArray[i].checkPointName}</label>`
            }
            expandTaskBtnDiv = `<button id="expandTaskBtn" type="button" onclick="expandTask(this)"><img src="images/expand.png" style="height:30px;" alt="expand task"></button>`;
        }
        for(var i = 0; i < ar.taskMembers.length; i++) {
            taskMemberDiv += `<div class="memberIconDiv">${ar.taskMembers[i].memberName.charAt(0)}</div>`;
        }

        archiveElement.innerHTML = `<div id="${taskId}" class="taskObject" onclick="expandTask(this)"
                                    draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)">
                                    <img id="taskIcon" src="${taskIcon}">
                                    ${expandTaskBtnDiv}
                                    <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                    <div id="checkList">${taskChecklistDiv}</div>
                                    <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="taskDescriptionPara adjustText">${taskDescription}</p>
                                    <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId}, 'archive'); renderArchiveList();" onmouseover="this.firstChild.src = 'images/filled-trashcan.png'" onmouseout="this.firstChild.src = 'images/trashcan.png'"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                    <div id="memberIconFlex">${taskMemberDiv}</div>
                                    <div id="taskDeadlineDiv">Due Date: ${taskDeadlineInput}</div>
                                    </div>
                                    </div>`;
        archive.appendChild(archiveElement);
    }
}