/*
Function takes in the targets id's as parameters, puts the information about these id's and place them into the ongoingList array.
*/
/*
function moveMembersToTask(memberId, taskId){
  const memberList = JSON.parse(window.localStorage.getItem("member")) || [];
  const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
  const taskStorageList = JSON.parse(window.localStorage.getItem('taskStorage')) || [];
  const ongoingList = JSON.parse(window.localStorage.getItem("ongoingTask")) || [];
  for(let i = 0; i < memberList.length; i++){
      for(let j = 0; j < taskList.length; j++){
        for(let t = 0; t < taskStorageList.length; t ++){
          if(memberList[i].memberId == memberId && taskList[j].taskId == taskId && taskStorageList[t].taskId == taskId){
            taskList.splice(j, 1);
            let assignedTask = Object.assign({},memberList[i], taskStorageList[t]);
            taskList.push(assignedTask);
            deleteTask(taskId, 'taskStorage');
          }
        }
      }
  }
  window.localStorage.setItem("task", JSON.stringify(taskList));
  renderTaskList();
}

*/

function moveMembersToTask(memberId, taskId, localStorageKey) {
  console.log(localStorageKey);
  var taskList = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
  console.log(taskList);
  var memberList = JSON.parse(window.localStorage.getItem("member")) || [];
  for(var i = 0; i < memberList.length; i++) {
    if(memberList[i].memberId == memberId) {
      for(var l = 0; l < taskList.length; l++) {
        if(taskList[l].taskId == taskId) {
          const assignedMember = {
            memberName : memberList[i].memberName,
            memberId : memberList[i].memberId
            }
          taskList[l].taskMembers.push(assignedMember);
          window.localStorage.setItem(localStorageKey, JSON.stringify(taskList));     
      }
    }
  }
}
}





/*
Function takes in three parameters, taskId, localstoragekey from the localstorage you want to retrieve information from,
and newlocalstoragekey from the localstorage you want to put the information in.
*/

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

function dropNames(event, localStorageKey){
    event.preventDefault();

    let memberId = event.dataTransfer.getData("text/plain");

    let taskId = event.target.parentElement.id;
    console.log(localStorageKey);

    moveMembersToTask(memberId, taskId, localStorageKey);
    
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

    move(taskId, 'ongoingTask', 'task');
    move(taskId, 'finishedTask', 'task');
  }
  
  function dropOngoing(ev) {
    ev.preventDefault();


    let taskId = ev.dataTransfer.getData("text/plain");
  
    move(taskId, 'task', 'ongoingTask');
    move(taskId, 'finishedTask', 'ongoingTask');
  }


  function dropFinished(ev) {
    ev.preventDefault();

    let taskId = ev.dataTransfer.getData("text/plain");

    move(taskId, 'ongoingTask', 'finishedTask');
    move(taskId, 'task', 'finishedTask');
  }