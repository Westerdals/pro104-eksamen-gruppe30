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

    if (taskDescriptionForm.style.height == "0px" || taskDescriptionForm.style.height == ""){
        taskDescriptionForm.style.height = "200px";
        taskDescriptionForm.style.opacity = "1";
        addDescriptionRevealBtn.style.backgroundColor = "orange";
        taskDescription.style.display = "inline-block";

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
        }

    } else {
        hideSection(taskChecklistForm);
        hideAdditionInputs(taskChecklistForm);
    }
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
        }

    } else {
        hideSection(taskIconForm);
        hideAdditionInputs(taskIconForm);
    }
}

function revealAddDeadlineForm(){
    var taskDeadlineForm = document.getElementById("taskDeadlineForm");

    if (taskDeadlineForm.style.height == "0px" || taskDeadlineForm.style.height == ""){
        taskDeadlineForm.style.height = "200px";
        taskDeadlineForm.style.opacity = "1";
        taskDeadlineForm.style.display = "block";
        addDeadlineRevealBtn.style.backgroundColor = "orange";

        if (taskDescriptionForm.style.height != "0px" || taskDescriptionForm.style.height != "") {
            hideSection(taskDescriptionForm);
        }
        if (taskIconForm.style.height != "0px" || taskIconForm.style.height != "") {
            hideSection(taskIconForm);
        }
        if (taskChecklistForm.style.height != "0px" || taskChecklistForm.style.height != "") {
            hideSection(taskChecklistForm);
        }

    } else {
        hideSection(taskDeadlineForm);
    }
}

function expandTask(object){

    if (object.style.height != "400px") {
        object.style.height = "400px";
    } else {
        object.style.height = "200px";
    }
}

function hideSection(section) {
    section.style.height = "0px";
    section.style.opacity = "0";
HEAD
    section.style.display = "none";
    if (section == addTaskSection) {
        addTaskRevealBtn.style.backgroundColor = "";
    } else if (section == addMemberSection) {
        addMemberRevealBtn.style.backgroundColor = "";
    } else if (section == membersSection) {
        revealMembersBtn.style.backgroundColor = "";
    } else if (section == archive) {
        revealArchiveBtn.style.backgroundColor = "";
    } else if (section == taskDescriptionForm){
        addDescriptionRevealBtn.style.backgroundColor = "";
    } else if (section == taskChecklistForm){
        addChecklistRevealBtn.style.backgroundColor = "";
    } else if (section == taskIconForm){
        addIconRevealBtn.style.backgroundColor = "";
    } else if (section == taskDeadlineForm){
        addDeadlineRevealBtn.style.backgroundColor = "";


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
cb026937c233a556e93e40fcea95b0667b9e3ed8
    }
}

function hideAdditionForms(){
    hideSection(taskDescriptionForm);
    hideSection(taskChecklistForm);
    hideSection(taskIconForm);
HEAD
    hideSection(taskDeadlineForm);

    hideAdditionInputs(taskDescriptionForm);
    hideAdditionInputs(taskChecklistForm);
    hideAdditionInputs(taskIconForm);
    hideAdditionInputs(taskDeadlineForm);
cb026937c233a556e93e40fcea95b0667b9e3ed8
}

function hideAdditionInputs(form){
 
    switch(form){
        case taskDescriptionForm:
            var taskDescription = document.getElementById("taskDescription");
            taskDescription.style.display = "none";
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
            var taskDeadline = document.getElementById("taskDeadline");
            taskDeadline.style.display = "none";
            break;
    }
}