//header
const $ = document;
const dateTime = $.getElementById("time");

window.onload = setInterval(function () {
  let date = new Date();
  let time = date.toLocaleTimeString();
  dateTime.innerHTML = time;
}, 1000);
//header-END

// console.log(window.screen.height);

const addTaskInput = $.getElementById("add-task-input");
const tasksContainer = $.querySelector(".tasks-container");
const tasksReverse = $.querySelector(".tasks-reverse");
const error = $.querySelector(".error");
const addTaskBtn = $.getElementById("add-task-btn");
const checkSong = $.querySelector("audio");
const intro = $.getElementById("intro");
const fixedHeader = $.getElementById("fixedArea")

$.addEventListener("scroll",function(){
  if(window.scrollY > 100){
    fixedHeader.classList.add("fixed")
  }else{
    fixedHeader.classList.remove("fixed")
  }
})

let tasksData = [];
function addTask() {
  if (tasksData.length < 1) {
    intro.style.display = "block";
  } else {
    intro.style.display = "none";
  }

  if (addTaskInput.value.trim()) {
    let taskObject = {
      id: tasksData.length + 1,
      content: addTaskInput.value.trim(),
      isComplete: false,
    };
    tasksData.push(taskObject);
    setLocalStorage(tasksData);
    createTaskToDOM(tasksData);
    addTaskInput.focus();
    addTaskInput.value = "";
    addTaskBtn.style.display = "none";
    error.style.display = "none";
  } else {
    error.style.display = "flex";
    error.innerHTML = "Please Write Task";
  }
}

function setLocalStorage(tasklist) {
  localStorage.setItem("tasklist", JSON.stringify(tasklist));
}

function getLocalStorage() {
  let getTasks = JSON.parse(localStorage.getItem("tasklist"));

  if (getTasks) {
    tasksData = getTasks;
  } else {
    tasksData = [];
  }

  if (tasksData.length < 1) {
    intro.style.display = "block";
  } else {
    intro.style.display = "none";
  }

  createTaskToDOM(tasksData);
}

window.addEventListener("load", getLocalStorage);

function createTaskToDOM(tasklist) {
  if (tasksData.length < 1) {
    intro.style.display = "block";
  } else {
    intro.style.display = "none";
  }

  tasksReverse.innerHTML = "";
  let taskCard,
    cardLeft,
    checkContainer,
    inputCheck,
    taskContentContainer,
    taskContent,
    cardRight,
    removeTask;

  tasklist.forEach(function (task) {
    taskCard = $.createElement("div");
    taskCard.className = "task-card";

    cardLeft = $.createElement("div");
    cardLeft.className = "card-left";

    checkContainer = $.createElement("div");
    checkContainer.className = "check-container";

    inputCheck = $.createElement("input");
    inputCheck.setAttribute("id", "input-check");
    inputCheck.setAttribute("type", "checkbox");
    inputCheck.setAttribute("onchange", "updateTask(" + task.id + ")");
    taskContentContainer = $.createElement("div");
    taskContentContainer.className = "task-content-container";

    taskContent = $.createElement("p");
    taskContent.className = "task-content";
    taskContent.innerHTML = task.content;

    cardRight = $.createElement("div");
    cardRight.className = "card-right";

    removeTask = $.createElement("i");
    removeTask.className = "fa fa-close";
    removeTask.setAttribute("id", "remove-task");
    removeTask.setAttribute("onclick", "removeTask(" + task.id + ")");

    checkContainer.append(inputCheck);
    taskContentContainer.append(taskContent);
    cardLeft.append(checkContainer, taskContentContainer);
    cardRight.append(removeTask);

    taskCard.append(cardLeft, cardRight);

    tasksReverse.append(taskCard);
    tasksContainer.append(tasksReverse);
    tasksReverse.style.flexDirection = "column-reverse";
    if (task.isComplete === true) {
      inputCheck.setAttribute("checked", true);
      taskContent.classList.add("is-complete-task");
      taskCard.style.opacity = "0.7";
      removeTask.style.opacity = "0.7";
    } else {
      taskContent.classList.remove("is-complete-task");
      inputCheck.removeAttribute("checked");
    }
  });
}

function removeTask(taskId) {
  let getTasks = JSON.parse(localStorage.getItem("tasklist"));
  tasksData = getTasks;
  let findTask = tasksData.findIndex(function (task) {
    return task.id === taskId;
  });
  tasksData.splice(findTask, 1);
  setLocalStorage(tasksData);
  createTaskToDOM(tasksData);
}

function updateTask(taskId) {
  let getTasks = JSON.parse(localStorage.getItem("tasklist"));
  tasksData = getTasks;
  tasksData.forEach(function (task) {
    if (task.id === taskId) {
      task.isComplete = !task.isComplete;
      checkSong.play();
      checkSong.currentTime = 0;
      if (!task.isComplete) {
        checkSong.pause();
      }
    }
  });

  setLocalStorage(tasksData);
  createTaskToDOM(tasksData);
}

addTaskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
addTaskInput.addEventListener("keyup", function (event) {
  if (event.target.value.trim().length > 0) {
    addTaskBtn.style.display = "block";
    addTaskBtn.addEventListener("click", addTask);
  } else {
    addTaskBtn.style.display = "none";
  }
});

//switch-theme

const switchtheme = $.getElementById("switch-theme");

let isDark = false;
switchtheme.addEventListener("click", function () {
  if (isDark) {
    switchtheme.classList.replace("fa-sun", "fa-moon");
    switchtheme.style.color = "#fff";
    $.body.classList.remove("dark");
    isDark = false;

    localStorage.setItem("theme", "light");
  } else {
    switchtheme.classList.replace("fa-moon", "fa-sun");
    switchtheme.style.color = "#F49D1A";
    $.body.classList.add("dark");
    isDark = true;
    localStorage.setItem("theme", "dark");
  }
});

window.onload = function () {
  addTaskInput.focus();
  let checkTheme = localStorage.getItem("theme");
  if (checkTheme === "dark") {
    switchtheme.classList.replace("fa-moon", "fa-sun");
    switchtheme.style.color = "#F49D1A";
    $.body.classList.add("dark");
    isDark = true;
  } else {
    switchtheme.classList.replace("fa-sun", "fa-moon");
    switchtheme.style.color = "#fff";
    $.body.classList.remove("dark");
    isDark = false;
  }
};
