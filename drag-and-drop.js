/*
Function takes in the targets id's as parameters, puts the information about these id's and place them into the ongoingList array.
*/

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

function move(taskId, localStorageKey, newLocalStorageKey) {
  var lastTaskList = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
  var taskList = JSON.parse(window.localStorage.getItem(newLocalStorageKey)) || [];
  for(var i = 0; i < lastTaskList.length; i++){
  if(lastTaskList[i].taskId == taskId){
          taskList.push(lastTaskList[i]);
          deleteTask(taskId, localStorageKey);
  }
}
  window.localStorage.setItem(newLocalStorageKey, JSON.stringify(taskList));
  renderTaskList();
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

function dragLeave(ev){
  ev.preventDefault();

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

    //moveFromOngoingToUnstarted(taskId);

    move(taskId, 'lists', 'task');
  }
  
  function dropOngoing(ev) {
    ev.preventDefault();


    let taskId = ev.dataTransfer.getData("text/plain");
  
    //moveToOngoing(taskId);
    move(taskId, 'task', 'lists');
  }


  function dropFinished(ev) {
    ev.preventDefault();

    let taskId = ev.dataTransfer.getData("text/plain");

    move(taskId, 'lists', 'fList');
    move(taskId, 'task', 'fList');
  }