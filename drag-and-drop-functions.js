function deleteTaskUnstarted(taskId) {
    var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
	for(var i = 0; i < taskList.length; i++){
		if(taskList[i].taskId == taskId){
			taskList.splice(i, 1);
		}
	}
	window.localStorage.setItem("task", JSON.stringify(taskList));
	renderTaskList();
}

function deleteTaskOngoing(taskId) {
    var lists = JSON.parse(window.localStorage.getItem("lists")) || [];
	for(var i = 0; i < lists.length; i++){
		if(lists[i].taskId == taskId){
			lists.splice(i, 1);
		}
	}
    window.localStorage.setItem("lists", JSON.stringify(lists));
    renderTaskOngoingList();
}

function deleteTaskFinished(taskId) {
    var finishedList = JSON.parse(window.localStorage.getItem("finishedList")) || [];
	for(var i = 0; i < finishedList.length; i++){
		if(finishedList[i].taskId == taskId){
			finishedList.splice(i, 1);
		}
	}
    window.localStorage.setItem("lists", JSON.stringify(lists));
    renderTaskOngoingList();
}

function moveToOngoing(taskId) {
    var taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    var lists = JSON.parse(window.localStorage.getItem("lists")) || [];
	for(var i = 0; i < taskList.length; i++){
		if(taskList[i].taskId == taskId){
            lists.push(taskList[i]);
            deleteTaskUnstarted(taskId);
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
            deleteTaskUnstarted(taskId);
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