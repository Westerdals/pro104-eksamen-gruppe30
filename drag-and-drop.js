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

function moveFromUnstartedToFinished(taskId) {
  var finishedList = JSON.parse(window.localStorage.getItem("fList")) || [];
  var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
for(var i = 0; i < taskList.length; i++){
  if(taskList[i].taskId == taskId){
          finishedList.push(taskList[i]);
          deleteTask(taskId, 'task');
  }
}
  window.localStorage.setItem("fList", JSON.stringify(finishedList));
  renderTaskFinishedList();

}

 function moveFromOngoingToUnstarted(taskId) {
    var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    var ongoinglist = JSON.parse(window.localStorage.getItem("lists")) || [];
  for(var i = 0; i < ongoinglist.length; i++){
    if(ongoinglist[i].taskId == taskId){
            taskList.push(ongoinglist[i]);
            deleteTask(taskId, 'lists');
    }
  }
    window.localStorage.setItem("task", JSON.stringify(taskList));
    renderTaskList();
  
  }


function moveToOngoing(taskId) {
  var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
  var OngoingList = JSON.parse(window.localStorage.getItem("lists")) || [];
for(var i = 0; i < taskList.length; i++){
  if(taskList[i].taskId == taskId){
          OngoingList.push(taskList[i]);
          deleteTask(taskId, 'task');
  }
  }
  window.localStorage.setItem("lists", JSON.stringify(OngoingList));
  renderTaskOngoingList();
}

function moveToFinished(taskId) {
  var finishedList = JSON.parse(window.localStorage.getItem("fList")) || [];
  var ongoingList = JSON.parse(window.localStorage.getItem("lists")) || [];
for(var i = 0; i < ongoingList.length; i++){
  if(ongoingList[i].taskId == taskId){
          finishedList.push(ongoingList[i]);
          deleteTask(taskId, 'lists');
  }
}
  window.localStorage.setItem("fList", JSON.stringify(finishedList));
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