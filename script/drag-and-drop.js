/*
Function takes in the targets id's and localStorageKey as parameters, 
puts the information about the memberId and puts it in a new object. The object is then pushed into the 
targeted taskId.
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

/*
dragstart handler for the member.
*/

function dragStartNames(ev){
    let nameDrag = ev.target.id;
    ev.dataTransfer.setData("text/plain", nameDrag);
}

/*
drop handler for the member.
*/

function dropNames(event, localStorageKey){
    event.preventDefault();

    let memberId = event.dataTransfer.getData("text/plain");

    let taskId = event.target.parentElement.id;
    console.log(localStorageKey);

    moveMembersToTask(memberId, taskId, localStorageKey);
    
}

/*
dragover handler for the member.
*/

function allowMoveNames(ev) {
  ev.preventDefault();
}


/*
dragover handler for the task.
*/

function allowMoveTasks(ev) {
    ev.preventDefault();

}
  
/*
dragstart handler for the task.
*/

function dragStartTasks(ev) {
    taskId = ev.target.id;
    
    ev.dataTransfer.setData("text/plain", taskId);
}



/*
drop handlers for the unstartedTasks, ongoingTasks and finishedTasks divs.
*/

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