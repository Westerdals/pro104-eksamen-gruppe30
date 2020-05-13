/**
 * Legge til flere teammedlem på en oppgave.
 * 
 * Når man opretter en oppgave ønsker vi å kunne legge til flere medlemmer på samme oppgave.
 * 
 */

function revealAddTaskSection() {
    var addTaskRevealBtn = document.getElementById("addTaskRevealBtn");
    var addTaskSection = document.getElementById("addTaskSection");
    if (addTaskSection.style.height == "0px" || addTaskSection.style.height == "") {
        addTaskSection.style.height = "250px";
        addTaskSection.style.opacity = "1";
        addTaskRevealBtn.style.backgroundColor = "lightgray";

        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            resetSection(addMemberSection);
        }
    } else {
        addTaskSection.style.height = "0px";
        addTaskSection.style.opacity = "0";
        addTaskRevealBtn.style.backgroundColor = "";
    }
  }


  function revealAddMemberSection() {
    var addMemberRevealBtn = document.getElementById("addMemberRevealBtn");
    var addMemberSection = document.getElementById("addMemberSection");
    if (addMemberSection.style.height == "0px" || addMemberSection.style.height == "") {
        addMemberSection.style.height = "150px";
        addMemberSection.style.opacity = "1";
        addMemberRevealBtn.style.backgroundColor = "lightgray";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            resetSection(addTaskSection);
        }
        
    } else {
        addMemberSection.style.height = "0px";
        addMemberSection.style.opacity = "0";
        addMemberRevealBtn.style.backgroundColor = "";
    }
  }




function createTask(event){
    event.preventDefault();

        //const memberInput = document.querySelector("#memberInput").value;
        const taskName = document.querySelector("#taskName").value;
        const taskDescription = document.querySelector("#taskDescription").value;

        
        const taskList = JSON.parse(localStorage.getItem('task')) || [];
        const task = {taskName, taskDescription};
        taskList.push(task);

        window.localStorage.setItem('task', JSON.stringify(taskList));
    
    event.target.reset();
    renderTaskList();

}

function createMember(event){
    event.preventDefault();

    const teamMember = document.querySelector("#teamMember").value;

    const memberList = JSON.parse(localStorage.getItem('member')) || [];

    const member = {teamMember};
    
    memberList.push(member);

    window.localStorage.setItem('member', JSON.stringify(memberList));

    event.target.reset();
    //renderMemberList();

}


function renderTaskList() {

    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const unstartedTasks = document.getElementById("unstartedTasks");

    unstartedTasks.innerHTML = "";

    for (const task of taskList) {
        const taskElement = document.createElement("div");
        const {taskName, taskDescription} = task;

        taskElement.innerHTML = `<div class="taskObject">
                                <h4>${task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}</h4>
                                <div>${task.taskDescription}</div>
                                <div>Teammedlem:</div>
                                </div>`;
        unstartedTasks.appendChild(taskElement);
    }
}

function renderMemberList() {

    const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
    const dropTxt = document.getElementById("droptxt");

    dropTxt.innerHTML = "";

    for (const member of memberList) {
        dropTxt.innerHTML += `
                            <p>${member.teamMember}<p>
                            `;
    }

}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


function filterFunction() {
    renderMemberList();
    var input, filter, p, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    p = div.getElementsByTagName("p");
    for (i = 0; i < p.length; i++) {
      txtValue = p[i].textContent || p[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        p[i].style.display = "";
      } else {
        p[i].style.display = "none";
      }
    }
  }

  window.onload = filterFunction;



