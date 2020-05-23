function moveMembersToTask(memberId, taskId){
  const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
  const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
  let ongoingList = JSON.parse(window.localStorage.getItem("lists")) || [];
  for(let i = 0; i < memberList.length; i++){
      for(let j = 0; j < taskList.length; j++){
        if(memberList[i].memberId == memberId && taskList[j].taskId == taskId){
          let assignedTask = Object.assign({},memberList[i], taskList[j]);
          ongoingList.push(assignedTask);
          deleteTask(taskId, 'task');
        }
      }
  }
  window.localStorage.setItem("lists", JSON.stringify(ongoingList));
  renderTaskOngoingList();
}


function moveToOngoing(taskId) {
  var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
  var lists = JSON.parse(window.localStorage.getItem("lists")) || [];
for(var i = 0; i < taskList.length; i++){
  if(taskList[i].taskId == taskId){
          lists.push(taskList[i]);
          deleteTask(taskId, 'task');
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
          deleteTask(taskId, 'lists');
  }
}
  window.localStorage.setItem("fList", JSON.stringify(fList));
  renderTaskOngoingList();
  renderTaskFinishedList();
}

function dragStartNames(ev){
    let nameDrag = ev.target.id;
    ev.dataTransfer.setData("text/plain", nameDrag);
}

function dropNames(ev){
    ev.preventDefault();

    let memberId = ev.dataTransfer.getData("text/plain");

    let taskId = ev.target.parentElement.id;

    moveMembersToTask(memberId, taskId);


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

  }