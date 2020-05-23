
function moveMembersToTask(memberId){
  const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
  const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
  for(var i = 0; i < memberList.length; i++){
    if(memberList[i].memberId == memberId){
            taskList.push(memberList[i]);
  }
  }
  window.localStorage.setItem("task", JSON.stringify(taskList));
  renderUpdateTaskList();
}


function moveToOngoing(taskId) {
  var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
  var lists = JSON.parse(window.localStorage.getItem("lists")) || [];
for(var i = 0; i < taskList.length; i++){
  if(taskList[i].taskId == taskId){
          lists.push(taskList[i]);
          deleteTask(taskId);
  }
  }
  window.localStorage.setItem("lists", JSON.stringify(lists));

}

function moveToFinished(taskId) {
  var fList = JSON.parse(window.localStorage.getItem("fList")) || [];
  var lists = JSON.parse(window.localStorage.getItem("lists")) || [];
for(var i = 0; i < lists.length; i++){
  if(lists[i].taskId == taskId){
          fList.push(lists[i]);
          deleteTaskOngoing(taskId);
  }
}
window.localStorage.setItem("fList", JSON.stringify(fList));
  renderTaskFinishedList();
}

function moveFromUnstartedToFinished(taskId) {
  var fList = JSON.parse(window.localStorage.getItem("fList")) || [];
  var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
for(var i = 0; i < taskList.length; i++){
  if(taskList[i].taskId == taskId){
          fList.push(taskList[i]);
          deleteTask(taskId);
  }
}
  window.localStorage.setItem("fList", JSON.stringify(fList));
  renderTaskFinishedList();

}

function moveFromOngoingToUnstarted(taskId) {
  var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
  var lists = JSON.parse(window.localStorage.getItem("lists")) || [];
for(var i = 0; i < lists.length; i++){
  if(lists[i].taskId == taskId){
          taskList.push(lists[i]);
          deleteTaskOngoing(taskId);
  }
}
  window.localStorage.setItem("task", JSON.stringify(taskList));
  renderTaskList();

}

function dragStartNames(ev){
    let nameDrag = ev.target.id;
    ev.dataTransfer.setData("text/plain", nameDrag);
}

function dropNames(ev){
    ev.preventDefault();

    //const draggedMembersList = JSON.parse(localStorage.getItem("draggedMembers")) || [];

    let memberId = ev.dataTransfer.getData("text/plain");

    moveMembersToTask(memberId);
    //let assignedToTask = ev.target.parentElement.querySelector("h4").innerText;
    
    //let nameDiv = document.createElement("div");

    //let nameDiv = document.getElementById(nameDropped).innerText;

    //ev.target.appendChild(nameDiv);
    
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
    
    moveToFinished(taskId);
    moveFromUnstartedToFinished(taskId);
  }