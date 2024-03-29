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
        archive.style.height = "100vh";
        archive.style.opacity = "1";
        revealSettingsBtn.style.right = "15%";

        if(revealArchiveBtn.innerHTML === "VIEW ARCHIVE"){
            revealArchiveBtn.innerHTML = "VIEW TASKS TABLE";
        } else {
            revealArchiveBtn.innerHTML = "VIS OPPGAVETAVLE";
        }

        if (tasksTable.style.height != "0px" || tasksTable.style.height != "") {
            hideSection(tasksTable);
        }

    } else {
        hideSection(archive);
        tasksTable.style.height = "100vh";
        tasksTable.style.opacity = "1";
        revealSettingsBtn.style.right = "12%";

        if(revealArchiveBtn.innerHTML === "VIEW TASKS TABLE"){
            revealArchiveBtn.innerHTML = "VIEW ARCHIVE";
        } else {
            revealArchiveBtn.innerHTML = "VIS ARKIV";
        }
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
        if (taskDeadlineForm.style.height != "0px" || taskDeadlineForm.style.height != "") {
            hideSection(taskDeadlineForm);
            hideAdditionInputs(taskDeadlineForm);
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
        if (taskDeadlineForm.style.height != "0px" || taskDeadlineForm.style.height != "") {
            hideSection(taskDeadlineForm);
            hideAdditionInputs(taskDeadlineForm);
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
        if (taskDeadlineForm.style.height != "0px" || taskDeadlineForm.style.height != "") {
            hideSection(taskDeadlineForm);
            hideAdditionInputs(taskDeadlineForm);
        }

    } else {
        hideSection(taskIconForm);
        hideAdditionInputs(taskIconForm);
    }
}

function revealAddDeadlineForm(){
    var taskDeadlineForm = document.getElementById("taskDeadlineForm");
    var addDeadlineRevealBtn = document.getElementById("addDeadlineRevealBtn");
    var taskDeadlineInput = document.getElementById("taskDeadlineInput");

    if (taskDeadlineForm.style.height == "0px" || taskDeadlineForm.style.height == ""){
        taskDeadlineForm.style.height = "200px";
        taskDeadlineForm.style.opacity = "1";
        addDeadlineRevealBtn.style.backgroundColor = "orange";
        taskDeadlineInput.style.display = "inline-block";

        if (taskDescriptionForm.style.height != "0px" || taskDescriptionForm.style.height != "") {
            hideSection(taskDescriptionForm);
            hideAdditionInputs(taskDescriptionForm);
        }
        
        if (taskChecklistForm.style.height != "0px" || taskChecklistForm.style.height != "") {
            hideSection(taskChecklistForm);
            hideAdditionInputs(taskChecklistForm);
        }
        if (taskIconForm.style.height != "0px" || taskIconForm.style.height != "") {
            hideSection(taskIconForm);
            hideAdditionInputs(taskIconForm);
        }

    } else {
        hideSection(taskDeadlineForm);
        hideAdditionInputs(taskDeadlineForm);
    }
}

function expandTask(task){
    if (task.parentElement.style.height != "400px") {
        task.parentElement.style.height = "400px";
        task.firstChild.src = "images/checkpoints-open.png"
        task.firstChild.src.alt = "close checkpoints";
    } else {
        task.parentElement.style.height = "230px";
        task.firstChild.src = "images/checkpoints-closed.png"
        task.firstChild.src.alt = "show checkpoints";
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
        case taskDeadlineForm:
            addDeadlineRevealBtn.style.backgroundColor = "";
            break;
    }
}

function hideAdditionForms(){
    hideSection(taskDescriptionForm);
    hideSection(taskChecklistForm);
    hideSection(taskIconForm);
    hideSection(taskDeadlineForm);
    hideAdditionInputs(taskDescriptionForm);
    hideAdditionInputs(taskChecklistForm);
    hideAdditionInputs(taskIconForm);
    hideAdditionInputs(taskDeadlineForm);
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
            
        case taskDeadlineForm:
            var taskDeadlineInput = document.getElementById("taskDeadlineInput");
            taskDeadlineInput.style.display = "none";
            break;
    }
}