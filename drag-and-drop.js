function dragStartNames(ev){
    let nameDrag = ev.target.id;
    ev.dataTransfer.setData("text/plain", nameDrag);
}

function dropNames(ev){
    ev.preventDefault();

    //const draggedMembersList = JSON.parse(localStorage.getItem("draggedMembers")) || [];

    let nameDropped = ev.dataTransfer.getData("text/plain");
    //let assignedToTask = ev.target.parentElement.querySelector("h4").innerText;
    
    //let nameDiv = document.createElement("div");

    let nameDiv = document.getElementById(nameDropped).innerText;

    ev.target.appendChild(nameDiv);
    
    //let draggedMember = {assignedToTask, nameDropped};
    //draggedMembersList.push(draggedMember);
    

   //window.localStorage.setItem("draggedMembers", JSON.stringify(draggedMembersList))

}


function allowMoveTasks(ev) {
    ev.preventDefault();
  }
  
  function allowMoveNames(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    taskId = ev.target.id;
    
    ev.dataTransfer.setData("text/plain", taskId);
  }

  function dropUnstarted(ev) {
    ev.preventDefault();    

    let taskId = ev.dataTransfer.getData("text/plain");
    
    event.target.appendChild(document.getElementById(taskId));

    document.getElementById(taskId).style.border = "2px dashed grey";

    moveFromOngoingToUnstarted(taskId);
    
  }
  
  function dropOngoing(ev) {
    ev.preventDefault();

    //const list = JSON.parse(localStorage.getItem("list")) || [];

    let taskId = ev.dataTransfer.getData("text/plain");
    event.target.appendChild(document.getElementById(taskId));
    //let task = {taskId};
    //list.push(task);

    //window.localStorage.setItem("list", JSON.stringify(list));

    document.getElementById(taskId).style.border = "2px dashed yellow";
    moveToOngoing(taskId);
    
    //renderTaskOngoing();  
    
  }


  function dropFinished(ev) {
    ev.preventDefault();

    let taskId = ev.dataTransfer.getData("text/plain");
    event.target.appendChild(document.getElementById(taskId));

    document.getElementById(taskId).style.border = "2px dashed green";
    moveToFinished(taskId);
    deleteTaskOngoing(taskId);

  }

/*function renderTaskOngoing(){
      let list = JSON.parse(localStorage.getItem("list")) || [];
      let taskList = JSON.parse(localStorage.getItem("task")) || [];

      let ongoingTasks = document.getElementById("ongoingTasks");

      ongoingTasks.innerHTML = "";
      
      for(let taskIds in list){
          let ongoingElement = document.createElement("div");
          let task = taskList.find(t=>t.taskId == taskIds);
          let {taskId, taskIcon, textSizeHeader, taskName, textSizeDescription, taskDescription} = task;
          
          
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
  */

  /*function deleteTaskFromUnstarted(taskId) {
    var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
	for(var i = 0; i < taskList.length; i++){
		if(taskList[i].taskId == taskId){
			taskList.style.visibility = "hidden";
		}
	}
	window.localStorage.setItem("task", JSON.stringify(taskList));
	renderTaskList();
}*/

//window.onload = renderTaskOngoing();
//window.onload = renderTaskList();
window.onload = renderTaskList();
window.onload = renderTaskOngoingList();
window.onload = renderTaskFinishedList();
