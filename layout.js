function revealAddTaskSection() {
    var addTaskSection = document.getElementById("addTaskSection");
    var addTaskRevealBtn = document.getElementById("addTaskRevealBtn");

    if (addTaskSection.style.height == "0px" || addTaskSection.style.height == "") {
        addTaskSection.style.height = "250px";
        addTaskSection.style.opacity = "1";
        addTaskRevealBtn.style.backgroundColor = "orange";

        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            hideSection(addMemberSection);
        }
        if (membersSection.style.height != "0px" || membersSection.style.height != "") {
            hideSection(membersSection);
        }
        if (settingsSection.style.height != "0px" || settingsSection.style.height != "") {
            hideSection(settingsSection);
        }

    } else {
        hideSection(addTaskSection);
    }
    window.setTimeout(hideAdditionForms, 1000);
}

function revealAddMemberSection() {
    var addMemberSection = document.getElementById("addMemberSection");
    var addMemberRevealBtn = document.getElementById("addMemberRevealBtn");

    if (addMemberSection.style.height == "0px" || addMemberSection.style.height == "") {
        addMemberSection.style.height = "200px";
        addMemberSection.style.opacity = "1";
        addMemberRevealBtn.style.backgroundColor = "orange";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            hideSection(addTaskSection);
        }
        if (membersSection.style.height != "0px" || membersSection.style.height != "") {
            hideSection(membersSection);
        }

        if (settingsSection.style.height != "0px" || settingsSection.style.height != "") {
            hideSection(settingsSection);
        }


    } else {
        hideSection(addMemberSection);
    }
    window.setTimeout(hideAdditionForms, 1000);
}

function revealSettings() {
    var settingsSection = document.getElementById("settingsSection");
    var revealSettingsBtn = document.getElementById("revealSettingsBtn");

    if (settingsSection.style.height == "0px" || settingsSection.style.height == "") {
        settingsSection.style.height = "150px";
        settingsSection.style.opacity = "1";
        revealSettingsBtn.style.color = "orange";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            hideSection(addTaskSection);
        }
        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            hideSection(addMemberSection);
        }
        if (membersSection.style.height != "0px" || membersSection.style.height != "") {
            hideSection(membersSection);
        }

    } else {
        hideSection(settingsSection);
    }
}

function revealMembersSection() {
    var membersSection = document.getElementById("membersSection");
    var revealMembersBtn = document.getElementById("revealMembersBtn");

    if (membersSection.style.height == "0px" || membersSection.style.height == "") {
        membersSection.style.height = "150px";
        membersSection.style.opacity = "1";
        revealMembersBtn.style.backgroundColor = "orange";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            hideSection(addTaskSection);
        }
        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            hideSection(addMemberSection);
        }
        if (settingsSection.style.height != "0px" || settingsSection.style.height != "") {
            hideSection(settingsSection);
        }

    } else {
        hideSection(membersSection);
    }
    window.setTimeout(hideAdditionForms, 1000);
}



function revealArchive() {
    var archive = document.getElementById("archive");
    var revealArchiveBtn = document.getElementById("revealArchiveBtn");
    var revealSettingsBtn = document.getElementById("revealSettingsBtn");

    if (archive.style.height == "0px" || archive.style.height == "") {
        archive.style.height = "630px";
        archive.style.opacity = "1";
        revealSettingsBtn.style.right = "170px";
        revealArchiveBtn.innerHTML = "VIEW TASKS TABLE";

        if (tasksTable.style.height != "0px" || tasksTable.style.height != "") {
            hideSection(tasksTable);
        }

    } else {
        hideSection(archive);
        tasksTable.style.height = "630px";
        tasksTable.style.opacity = "1";
        revealArchiveBtn.innerHTML = "VIEW ARCHIVE";
        revealSettingsBtn.style.right = "130px";
    }
}

function revealAddDescriptionForm(){
    var taskDescriptionForm = document.getElementById("taskDescriptionForm");
    var addDescriptionRevealBtn = document.getElementById("addDescriptionRevealBtn");
    var taskDescription = document.getElementById("taskDescription");
    var counting = document.getElementById("counting");

    if (taskDescriptionForm.style.height == "0px" || taskDescriptionForm.style.height == ""){
        taskDescriptionForm.style.height = "200px";
        taskDescriptionForm.style.opacity = "1";
        addDescriptionRevealBtn.style.backgroundColor = "orange";
        taskDescription.style.display = "inline-block";
        counting.style.display = "inline-block";

        if (taskChecklistForm.style.height != "0px" || taskChecklistForm.style.height != "") {
            hideSection(taskChecklistForm);
            hideAdditionInputs(taskChecklistForm);
        }
        if (taskIconForm.style.height != "0px" || taskIconForm.style.height != "") {
            hideSection(taskIconForm);
            hideAdditionInputs(taskIconForm);
        }

    } else {
        hideSection(taskDescriptionForm);
        hideAdditionInputs(taskDescriptionForm);
    }
}

function revealAddChecklistForm(){
    var taskChecklistForm = document.getElementById("taskChecklistForm");
    var addChecklistRevealBtn = document.getElementById("addChecklistRevealBtn");
    var taskChecklistInput = document.getElementById("taskChecklistInput");
    var createChecklistBtn = document.getElementById("createChecklistBtn");

    if (taskChecklistForm.style.height == "0px" || taskChecklistForm.style.height == ""){
        taskChecklistForm.style.height = "200px";
        taskChecklistForm.style.opacity = "1";
        addChecklistRevealBtn.style.backgroundColor = "orange";
        taskChecklistInput.style.display = "inline-block";
        createChecklistBtn.style.display = "inline-block";

        if (taskDescriptionForm.style.height != "0px" || taskDescriptionForm.style.height != "") {
            hideSection(taskDescriptionForm);
            hideAdditionInputs(taskDescriptionForm);
        }
        if (taskIconForm.style.height != "0px" || taskIconForm.style.height != "") {
            hideSection(taskIconForm);
            hideAdditionInputs(taskIconForm);
        }

    } else {
        hideSection(taskChecklistForm);
        hideAdditionInputs(taskChecklistForm);
    }
}

function revealCheckpoints(){
    var taskChecklist = document.getElementById("taskChecklist");
    taskChecklist.style.width = "250px";
    taskChecklist.style.opacity = "1";
}

function revealAddIconForm(){
    var taskIconForm = document.getElementById("taskIconForm");
    var addIconRevealBtn = document.getElementById("addIconRevealBtn");
    var buttonIcons = document.getElementsByClassName("buttonIcon")

    if (taskIconForm.style.height == "0px" || taskIconForm.style.height == ""){
        taskIconForm.style.height = "200px";
        taskIconForm.style.opacity = "1";

        for(var i = 0; i < buttonIcons.length; i++){
            buttonIcons[i].style.display = "inline-block";
        }

        addIconRevealBtn.style.backgroundColor = "orange";

        if (taskDescriptionForm.style.height != "0px" || taskDescriptionForm.style.height != "") {
            hideSection(taskDescriptionForm);
            hideAdditionInputs(taskDescriptionForm);
        }
        if (taskChecklistForm.style.height != "0px" || taskChecklistForm.style.height != "") {
            hideSection(taskChecklistForm);
            hideAdditionInputs(taskChecklistForm);
        }

    } else {
        hideSection(taskIconForm);
        hideAdditionInputs(taskIconForm);
    }
}

function expandTask(task){
    if (task.parentElement.style.height != "400px") {
        task.parentElement.style.height = "400px";
        task.firstChild.src = "images/shrink.png"
        task.firstChild.src.alt = "shrink task";
    } else {
        task.parentElement.style.height = "200px";
        task.firstChild.src = "images/expand.png"
    }
}

function hideSection(section) {
    section.style.height = "0px";
    section.style.opacity = "0";

    switch(section){
        case addTaskSection:
            addTaskRevealBtn.style.backgroundColor = "";
            break;
        case addMemberSection:
            addMemberRevealBtn.style.backgroundColor = "";
            break;
        case membersSection:
            revealMembersBtn.style.backgroundColor = "";
            break;
        case settingsSection:
            revealSettingsBtn.style.color = "";
            break;
        case archive:
            revealArchiveBtn.style.backgroundColor = "";
            break;
        case taskDescriptionForm:
            addDescriptionRevealBtn.style.backgroundColor = "";
            break;
        case taskChecklistForm:
            addChecklistRevealBtn.style.backgroundColor = "";
            break;
        case taskIconForm:
            addIconRevealBtn.style.backgroundColor = "";
            break;
    }
}

function hideAdditionForms(){
    hideSection(taskDescriptionForm);
    hideSection(taskChecklistForm);
    hideSection(taskIconForm);
    hideAdditionInputs(taskDescriptionForm);
    hideAdditionInputs(taskChecklistForm);
    hideAdditionInputs(taskIconForm);
}

function hideAdditionInputs(form){
 
    switch(form){
        case taskDescriptionForm:
            var taskDescription = document.getElementById("taskDescription");
            var counting = document.getElementById("counting");
            taskDescription.style.display = "none";
            counting.style.display = "none";
            break;

        case taskChecklistForm:
            var taskChecklistInput = document.getElementById("taskChecklistInput");
            var createChecklistBtn = document.getElementById("createChecklistBtn");
            taskChecklistInput.style.display = "none";
            createChecklistBtn.style.display = "none"
            break;

        case taskIconForm:
            var buttonIcons = document.getElementsByClassName("buttonIcon")
            for(var i = 0; i < buttonIcons.length; i++){
                buttonIcons[i].style.display = "none";
            }
            break;
    }
}
