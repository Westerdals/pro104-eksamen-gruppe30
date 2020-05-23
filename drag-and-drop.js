
function moveMembersToTask(memberId, taskId){
  const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
  const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
  let lists = JSON.parse(window.localStorage.getItem("lists")) || [];
  for(let i = 0; i < memberList.length; i++){
      for(let j = 0; j < taskList.length; j++){
        if(memberList[i].memberId == memberId && taskList[j].taskId == taskId){
          let assignedTask= Object.assign({},memberList[i], taskList[j]);
          assignedTask[taskList.taskId]++;
          lists.push(assignedTask);
          deleteTask(taskId);
        }
      }
  }
  window.localStorage.setItem("lists", JSON.stringify(lists));
  renderTaskOngoingList();

}

/*function moveMembersToTask(memberId, taskId){
  const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
  const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
  const assignedList = JSON.parse(window.localStorage.getItem("assigned")) || [];
  for(let i = 0; i < memberList.length; i++){
        if(memberList[i].memberId == memberId){
          assignedList.push(memberList[i]);
        }
      
  }
  for(let j = 0; j < taskList.length; j++){
    if(taskList[j].taskId == taskId){
      assignedList.taskList[j];
    }
  }
  window.localStorage.setItem("assign", JSON.stringify(assignedList));
}*/


function moveToOngoing(taskId) {
  var assignedList = JSON.parse(window.localStorage.getItem("assign")) || [];
  var lists = JSON.parse(window.localStorage.getItem("lists")) || [];
for(var i = 0; i < assignedList.length; i++){
  if(assignedList[i].taskId == taskId){
          lists.push(assignedList[i]);
          deleteTask(taskId);
  }
  }
  window.localStorage.setItem("lists", JSON.stringify(lists));
  renderTaskOngoingList();
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
    let memberId = ev.target.id;
    ev.dataTransfer.setData("text/plain", memberId);
}

function dropNames(ev){
    ev.preventDefault();

    //const draggedMembersList = JSON.parse(localStorage.getItem("draggedMembers")) || [];

    let memberId = ev.dataTransfer.getData("text/plain");

    let taskId = ev.target.parentElement.id;
    console.log(taskId);
    console.log(memberId);

    moveMembersToTask(memberId, taskId);
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