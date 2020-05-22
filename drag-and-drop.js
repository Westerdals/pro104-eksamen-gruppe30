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

    moveFromOngoingToUnstarted(taskId);
    
  }
  
  function dropOngoing(ev) {
    ev.preventDefault();


    let taskId = ev.dataTransfer.getData("text/plain");
  
    moveToOngoing(taskId);
    
    
  }


  function dropFinished(ev) {
    ev.preventDefault();

    let taskId = ev.dataTransfer.getData("text/plain");
    event.target.appendChild(document.getElementById(taskId));

    document.getElementById(taskId).style.border = "2px dashed green";
    moveToFinished(taskId);
    moveFromUnstartedToFinished(taskId);
  }

window.onload = renderTaskList();
window.onload = renderTaskOngoingList();
window.onload = renderTaskFinishedList();
