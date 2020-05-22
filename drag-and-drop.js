function dragStartNames(ev){
    let nameDrag = ev.target.innerText;
    ev.dataTransfer.setData("text", nameDrag);
}

function dropNames(ev){
    ev.preventDefault();

    const draggedMembersList = JSON.parse(localStorage.getItem("draggedMembers")) || [];

    let nameDropped = ev.dataTransfer.getData("text");
    let assignedToTask = ev.target.parentElement.querySelector("h4").innerText;
    
    let nameDiv = document.createElement("div");

    nameDiv.innerHTML = `<div>${nameDropped}</div>`;

    ev.target.appendChild(nameDiv);
    
    let draggedMember = {assignedToTask, nameDropped};
    draggedMembersList.push(draggedMember);
    

    window.localStorage.setItem("draggedMembers", JSON.stringify(draggedMembersList))

}


function allowMoveTasks(ev) {
    ev.preventDefault();
  }
  
  function allowMoveNames(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    taskId = ev.target.id;
    ev.dataTransfer.setData("text", taskId);
  }

  function dropUnstarted(ev) {
    ev.preventDefault();    

    let ongoingTaskName = ev.dataTransfer.getData("text");
    
    event.target.appendChild(document.getElementById(ongoingTaskName));

    document.getElementById(ongoingTaskName).style.border = "2px dashed grey";
    
  }
  
  function dropOngoing(ev) {
    ev.preventDefault();
    //const ongoingTaskList = JSON.parse(localStorage.getItem("ongoingTask")) || [];

    let taskId = ev.dataTransfer.getData("text");
    //taskOngoing = {ongoingTaskName};
    //ongoingTaskList.push(taskOngoing);
    //event.target.appendChild(document.getElementById(ongoingTaskName));

    //document.getElementById(ongoingTaskName).style.border = "2px dashed yellow";
    //window.localStorage.setItem("ongoingTask", JSON.stringify(ongoingTaskList));

    renderTaskOngoing();
    
  }

  function dropFinished(ev) {
    ev.preventDefault();

    let ongoingTaskName = ev.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(ongoingTaskName));

    document.getElementById(ongoingTaskName).style.border = "2px dashed green";
    
  }

function renderTaskOngoing(){
      const ongoingTaskList = JSON.parse(localStorage.getItem("ongoingTask")) || [];
      const taskList = JSON.parse(localStorage.getItem("ongoingTask")) || [];

      let ongoingTasks = document.getElementById("ongoingTasks");
      ongoingTasks.innerHTML = "";
      for(const taskId in ongoingTaskList){
          let task = taskList.find(p=>p.taskId == taskId);
          let {taskId, taskIcon, textSizeHeader, taskName, textSizeDescription, taskDescription} = task
          let ongoingElement = document.createElement("div");
          ongoingElement.innerHTML = `<div id="outputTask${taskId}" class="taskObject" onclick="expandTask(this)"
                                        draggable="true" ondragstart="drag(event)" ondragover="allowMoveNames(event)">
                                        <img id="taskIcon" src="${taskIcon}">
                                        <div id="taskHeading"><h4 style="font-size: ${textSizeHeader}; class="adjustHeader">${taskName.charAt(0).toUpperCase() + taskName.slice(1)}</h4></div>
                                        <p style="font-size: ${textSizeDescription};" id="taskDescriptionPara" class="adjustText">${taskDescription}</p>
                                        <button id="deleteTaskBtn" type="button" onclick="deleteTask(${taskId})"><img src="images/trashcan.png" id="trashcan" style="height:30px;" alt="delete task"></button>
                                        <div id="droppedMember" class="droppedMember" 
                                        ondrop="dropNames(event)">Members</div>
                                        </div>
                                        </div>`;
            ongoingTasks.appendChild(ongoingElement);
      }
  }