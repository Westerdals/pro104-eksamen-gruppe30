/*

This JavaScript file contains code which handles the functionality of the layout.

*/

function revealAddTaskSection() {
    var addTaskRevealBtn = document.getElementById("addTaskRevealBtn");
    var addTaskSection = document.getElementById("addTaskSection");
    if (addTaskSection.style.height == "0px" || addTaskSection.style.height == "") {
        addTaskSection.style.height = "250px";
        addTaskSection.style.opacity = "1";
        addTaskRevealBtn.style.backgroundColor = "#7dd1a9";

        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            hideSection(addMemberSection);
        }
        if (membersSection.style.height != "0px" || membersSection.style.height != "") {
            hideSection(membersSection);
        }

    } else {
        hideSection(addTaskSection);
    }
}

function revealAddMemberSection() {
    var addMemberRevealBtn = document.getElementById("addMemberRevealBtn");
    var addMemberSection = document.getElementById("addMemberSection");
    if (addMemberSection.style.height == "0px" || addMemberSection.style.height == "") {
        addMemberSection.style.height = "150px";
        addMemberSection.style.opacity = "1";
        addMemberRevealBtn.style.backgroundColor = "#7dd1a9";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            hideSection(addTaskSection);
        }
        if (membersSection.style.height != "0px" || membersSection.style.height != "") {
            hideSection(membersSection);
        }

    } else {
        hideSection(addMemberSection);
    }
}

function revealMembersSection() {
    var revealMembersBtn = document.getElementById("revealMembersBtn");
    var membersSection = document.getElementById("membersSection");
    if (membersSection.style.height == "0px" || membersSection.style.height == "") {
        membersSection.style.height = "110px";
        membersSection.style.opacity = "1";
        revealMembersBtn.style.backgroundColor = "lightgray";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            hideSection(addTaskSection);
        }
        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            hideSection(addMemberSection);
        }

    } else {
        hideSection(membersSection);
    }
}

function revealArchive() {
    var revealArchiveBtn = document.getElementById("revealArchiveBtn");
    var archive = document.getElementById("archive");
    if (archive.style.height == "0px" || archive.style.height == "") {
        archive.style.height = "630px";
        archive.style.opacity = "1";
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
    var addDescriptionRevealBtn = document.getElementById("addDescriptionRevealBtn");
    var taskDescriptionForm = document.getElementById("taskDescriptionForm");

    if (taskDescriptionForm.style.height == "0px" || taskDescriptionForm.style.height == ""){
        taskDescriptionForm.style.height = "200px";
        taskDescriptionForm.style.opacity = "1";

}
}

function hideSection(section) {
    section.style.height = "0px";
    section.style.opacity = "0";
    if (section == addTaskSection) {
        addTaskRevealBtn.style.backgroundColor = "";
    } else if (section == addMemberSection) {
        addMemberRevealBtn.style.backgroundColor = "";
    } else if (section == membersSection) {
        revealMembersBtn.style.backgroundColor = "";
    } else if (section == archive) {
        revealArchiveBtn.style.backgroundColor = "";
    }
}