function revealAddTaskSection() {
    var addTaskRevealBtn = document.getElementById("addTaskRevealBtn");
    var addTaskSection = document.getElementById("addTaskSection");
    if (addTaskSection.style.height == "0px" || addTaskSection.style.height == "") {
        addTaskSection.style.height = "250px";
        addTaskSection.style.opacity = "1";
        addTaskRevealBtn.style.backgroundColor = "lightgray";

        if (addMemberSection.style.height != "0px" || addMemberSection.style.height != "") {
            resetSection(addMemberSection);
        }
    } else {
        addTaskSection.style.height = "0px";
        addTaskSection.style.opacity = "0";
        addTaskRevealBtn.style.backgroundColor = "";
    }
  }

  function revealAddMemberSection() {
    var addMemberRevealBtn = document.getElementById("addMemberRevealBtn");
    var addMemberSection = document.getElementById("addMemberSection");
    if (addMemberSection.style.height == "0px" || addMemberSection.style.height == "") {
        addMemberSection.style.height = "150px";
        addMemberSection.style.opacity = "1";
        addMemberRevealBtn.style.backgroundColor = "lightgray";

        if (addTaskSection.style.height != "0px" || addTaskSection.style.height != "") {
            resetSection(addTaskSection);
        }
        
    } else {
        addMemberSection.style.height = "0px";
        addMemberSection.style.opacity = "0";
        addMemberRevealBtn.style.backgroundColor = "";
    }
  }

  function resetSection(section){
    section.style.height = "0px";
    section.style.opacity = "0";
    if (section == addTaskSection){
        addTaskRevealBtn.style.backgroundColor = "";
    } else {
        addMemberRevealBtn.style.backgroundColor = "";
    }
  }

  function createTask(event) {
    event.preventDefault();

    const taskName = document.querySelector("[name='taskName']").value;
    const taskDescription = document.querySelector("[name='taskDescription']").value;

    const task = {taskName, taskDescription};
    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    taskList.push(task);

    window.localStorage.setItem('task', JSON.stringify(taskList));

    event.target.reset();
    resetSection(addTaskSection);
    renderTaskList();
}

function renderTaskList() {

    const taskList = JSON.parse(window.localStorage.getItem("task")) || [];
    const unstartedTasks = document.getElementById("unstartedTasks");

    unstartedTasks.innerHTML = "";

    for (const task of taskList) {
        const taskElement = document.createElement("div");
        const {taskName, taskDescription} = task;

        taskElement.innerHTML = `<div class="taskObject">
                                <h4>${task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}</h4>
                                <div>${task.taskDescription}</div>
                                </div>`;
        unstartedTasks.appendChild(taskElement);
    }}




    var clock = document.querySelector('#utility-clock')
utilityClock(clock)
autoResize(clock, 295 + 32)

choose(clock, [
  ['hour', ['text', 'text-quarters', 'pill']],
  ['hour-text', ['large', 'small']],
  ['hour-display', ['all', 'quarters', 'none']],
  ['minute', ['line', 'dot']],
  ['minute-display', ['fine', 'fine-2', 'coarse', 'major', 'none']],
  ['minute-text', ['inside', 'outside', 'none']],
  ['hand', ['normal', 'hollow']]
])

function utilityClock(container) {
  
  var dynamic = container.querySelector('.dynamic')
  var hourElement = container.querySelector('.hour')
  var minuteElement = container.querySelector('.minute')
  var secondElement = container.querySelector('.second')
  
  var div = function(className, innerHTML) {
    var element = document.createElement('div')
    element.className = className
    element.innerHTML = innerHTML || ''
    return element
  }

  var append = function(element) {
    return {
      to: function(parent) {
        parent.appendChild(element)
        return append(parent)
      }
    }
  }

  var anchor = function(element, rotation) {
    var anchor = div('anchor')
    rotate(anchor, rotation)
    append(element).to(anchor).to(dynamic)
  }
  
  var minute = function(n) {
    var klass = n % 5 == 0 ? 'major' : n % 1 == 0 ? 'whole' : 'part'
    var line = div('element minute-line ' + klass)
    anchor(line, n)
    if (n % 5 == 0) {
      var text = div('anchor minute-text ' + klass)
      var content = div('expand content', (n < 10 ? '0' : '') + n)
      append(content).to(text)
      rotate(text, -n)
      anchor(text, n)
    }
  }

  var hour = function(n) {
    var klass = 'hour-item hour-' + n
    var line = div('element hour-pill ' + klass)
    anchor(line, n * 5)
    var text = div('anchor hour-text ' + klass)
    var content = div('expand content', n)
    append(content).to(text)
    rotate(text, -n * 5)
    anchor(text, n * 5)
    return
  }

  var position = function(element, phase, r) {
    var theta = phase * 2 * Math.PI
    element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
    element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
  }

  var rotate = function(element, second) {
    element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)'
  }

  var animate = function() {
    var now = new Date()
    var time = now.getHours() * 3600 +
                now.getMinutes() * 60 +
                now.getSeconds() * 1 +
                now.getMilliseconds() / 1000
    rotate(secondElement, time)
    rotate(minuteElement, time / 60)
    rotate(hourElement, time / 60 / 12)
    requestAnimationFrame(animate)
  }

  for (var i = 1 / 4; i <= 60; i += 1 / 4) minute(i)
  for (var i = 1; i <= 12; i ++) hour(i)

  animate()

}

function autoResize(element, nativeSize) {
  var update = function() {
    var parent = element.offsetParent
    var scale = Math.min(parent.offsetWidth, parent.offsetHeight) / nativeSize
    element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'
  }
  update()
  window.addEventListener('resize', update)
}

fu