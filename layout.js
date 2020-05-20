/*

This JavaScript file contains code which handles the functionality of the layout.

*/

function revealAddTaskSection() {
    var addTaskRevealBtn = document.getElementById("addTaskRevealBtn");
    var addTaskSection = document.getElementById("addTaskSection");
    if (addTaskSection.style.height == "0px" || addTaskSection.style.height == "") {
        addTaskSection.style.height = "250px";
        addTaskSection.style.opacity = "1";
        addTaskSection.style.display = "block";
        addTaskRevealBtn.style.backgroundColor = "orange";

        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            hideSection(addMemberSection);
        }
        if (membersSection.style.height != "0px" || membersSection.style.height != "") {
            hideSection(membersSection);
        }

    } else {
        hideSection(addTaskSection);
    }
    window.setTimeout(hideAdditionForms, 1000);
}

function revealAddMemberSection() {
    var addMemberRevealBtn = document.getElementById("addMemberRevealBtn");
    var addMemberSection = document.getElementById("addMemberSection");
    if (addMemberSection.style.height == "0px" || addMemberSection.style.height == "") {
        addMemberSection.style.height = "200px";
        addMemberSection.style.opacity = "1";
        addMemberSection.style.display = "block";
        addMemberRevealBtn.style.backgroundColor = "orange";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            hideSection(addTaskSection);
        }
        if (membersSection.style.height != "0px" || membersSection.style.height != "") {
            hideSection(membersSection);
        }

    } else {
        hideSection(addMemberSection);
    }
    window.setTimeout(hideAdditionForms, 1000);
}

function revealMembersSection() {
    var revealMembersBtn = document.getElementById("revealMembersBtn");
    var membersSection = document.getElementById("membersSection");
    if (membersSection.style.height == "0px" || membersSection.style.height == "") {
        membersSection.style.height = "150px";
        membersSection.style.opacity = "1";
        membersSection.style.display = "";
        revealMembersBtn.style.backgroundColor = "orange";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            hideSection(addTaskSection);
        }
        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            hideSection(addMemberSection);
        }

    } else {
        hideSection(membersSection);
    }
    window.setTimeout(hideAdditionForms, 1000);
}

function revealArchive() {
    var revealArchiveBtn = document.getElementById("revealArchiveBtn");
    var archive = document.getElementById("archive");
    if (archive.style.height == "0px" || archive.style.height == "") {
        archive.style.height = "630px";
        archive.style.opacity = "1";
        archive.style.display = "block";
        revealArchiveBtn.style.left = "1249px";
        revealArchiveBtn.innerHTML = "VIEW TASKS TABLE";

        if (tasksTable.style.height != "0px" || tasksTable.style.height != "") {
            hideSection(tasksTable);
        }

    } else {
        hideSection(archive);
        tasksTable.style.height = "630px";
        tasksTable.style.opacity = "1";;
        revealArchiveBtn.innerHTML = "VIEW ARCHIVE";
        revealArchiveBtn.style.left = "1280px";
    }
}

function revealAddDescriptionForm(){
    var taskDescriptionForm = document.getElementById("taskDescriptionForm");
    var addDescriptionRevealBtn = document.getElementById("addDescriptionRevealBtn");

    if (taskDescriptionForm.style.height == "0px" || taskDescriptionForm.style.height == ""){
        taskDescriptionForm.style.height = "200px";
        taskDescriptionForm.style.opacity = "1";
        taskDescriptionForm.style.display = "block";
        addDescriptionRevealBtn.style.backgroundColor = "orange";

        if (taskChecklistForm.style.height != "0px" || taskChecklistForm.style.height != "") {
            hideSection(taskChecklistForm);
        }
        if (taskIconForm.style.height != "0px" || taskIconForm.style.height != "") {
            hideSection(taskIconForm);
        }

    } else {
        hideSection(taskDescriptionForm);
    }
}

function revealAddChecklistForm(){
    var taskChecklistForm = document.getElementById("taskChecklistForm");

    if (taskChecklistForm.style.height == "0px" || taskChecklistForm.style.height == ""){
        taskChecklistForm.style.height = "200px";
        taskChecklistForm.style.opacity = "1";
        taskChecklistForm.style.display = "block";
        addChecklistRevealBtn.style.backgroundColor = "orange";

        if (taskDescriptionForm.style.height != "0px" || taskDescriptionForm.style.height != "") {
            hideSection(taskDescriptionForm);
        }
        if (taskIconForm.style.height != "0px" || taskIconForm.style.height != "") {
            hideSection(taskIconForm);
        }

    } else {
        hideSection(taskChecklistForm);
    }
}

function revealAddIconForm(){
    var taskIconForm = document.getElementById("taskIconForm");

    if (taskIconForm.style.height == "0px" || taskIconForm.style.height == ""){
        taskIconForm.style.height = "200px";
        taskIconForm.style.opacity = "1";
        taskIconForm.style.display = "block";
        addIconRevealBtn.style.backgroundColor = "orange";

        if (taskDescriptionForm.style.height != "0px" || taskDescriptionForm.style.height != "") {
            hideSection(taskDescriptionForm);
        }
        if (taskChecklistForm.style.height != "0px" || taskChecklistForm.style.height != "") {
            hideSection(taskChecklistForm);
        }

    } else {
        hideSection(taskIconForm);
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
    }
}

function hideAdditionForms(){
    hideSection(taskDescriptionForm);
    hideSection(taskChecklistForm);
    hideSection(taskIconForm);
}
