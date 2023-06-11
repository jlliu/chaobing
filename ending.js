// Make windows draggable

let windows = document.querySelectorAll(".window");

let draggingElement;

let windowStack = [];

let maxZ = 4;

let canvasWidth = 640;
let canvasHeight = 480;
let scaleRatio = 1;

let pixelDensity = 1;

function calculateDate() {
  let fullDate = new Date();
  let month = fullDate.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];

  let date = fullDate.getDate();
  let day = fullDate.getDay();
  let year = fullDate.getFullYear();
  let hours = fullDate.getHours();
  let minutes = fullDate.getMinutes();
  let AM_or_PM = "";
  if (hours == 12) {
    AM_or_PM = "PM";
  } else if (hours > 12) {
    hours = hours % 12;
    AM_or_PM = "PM";
  } else if (hours == 0) {
    hours = 12;
    AM_or_PM = "AM";
  } else {
    AM_or_PM = "AM";
  }
  return `${monthNames[month]} ${date}, ${year} ${hours}:${minutes} ${AM_or_PM}`;
}

let dateSpan = document.getElementById("date");
dateSpan.innerHTML = calculateDate();
// let resizingElement;
// Q: how to make it an ongoing stack where we change the one in front?
// insertNewlineAndFocus();
// function insertNewlineAndFocus() {
//   let textarea = document.querySelector("pre");
//   console.log(textarea);
//   textarea.value = textarea.value + "\n";
//   // textarea.setSelectionRange(textarea.value.length, textarea.value.length);
//   textarea.focus();
// }

let restartButton = document.querySelector("#restartButton");
restartButton.addEventListener("click", function () {
  location.href = "/";
});

windows.forEach(function (windowEl) {
  windowEl.style.zIndex = windowEl.dataset.zindex;
  let windowbar = windowEl.querySelector(".window-bar");
  windowbar.isDragging = false;
  windowbar.dragPositionX = 0;
  windowbar.dragPositionY = 0;
  windowbar.addEventListener("mousedown", function (e) {
    // console.log("mousedown");
    windowbar.isDragging = true;
    draggingElement = windowbar;
    windowbar.dragPositionX = e.offsetX;
    windowbar.dragPositionY = e.offsetY;
  });

  windowEl.addEventListener("mousedown", function (e) {
    let currentZ = windowEl.dataset.zindex;
    windows.forEach(function (el) {
      el.classList.remove("focus");
      if (el.dataset.zindex > currentZ) {
        el.dataset.zindex = parseInt(el.dataset.zindex) - 1;
        el.style.zIndex = el.dataset.zindex;
      }
    });
    windowEl.classList.add("focus");
    windowEl.dataset.zindex = maxZ;
    windowEl.style.zIndex = windowEl.dataset.zindex;
  });

  // Code for resizing... maybe scrap
  // document.addEventListener("mousemove", function (e) {
  //   console.log("mouse over");
  //   if (windowEl.classList.contains("focus")) {
  //     let rect = windowEl.getBoundingClientRect();
  //     let margin = 10;

  //     // Top left corner
  //     if (
  //       e.pageX > rect.left - margin &&
  //       e.pageX < rect.left + margin &&
  //       e.pageY > rect.top - margin &&
  //       e.pageY < rect.top + margin
  //     ) {
  //       // windowEl.resizing = true;
  //       resizingElement = windowEl;
  //       console.log("top left corner");
  //       document.body.style.setProperty("cursor", "nwse-resize");
  //     }
  //     // Top right corner
  //     else if (
  //       e.pageX > rect.left + rect.width - margin &&
  //       e.pageX < rect.left + rect.width + margin &&
  //       e.pageY > rect.top - margin &&
  //       e.pageY < rect.top + margin
  //     ) {
  //       resizingElement = windowEl;
  //       document.body.style.setProperty("cursor", "nesw-resize");
  //     }
  //     //Bottom Right
  //     else if (
  //       e.pageX > rect.left + rect.width - margin &&
  //       e.pageX < rect.left + rect.width + margin &&
  //       e.pageY > rect.top + rect.height - margin &&
  //       e.pageY < rect.top + rect.height + margin
  //     ) {
  //       resizingElement = windowEl;
  //       document.body.style.setProperty("cursor", "nwse-resize");
  //     }
  //     //Bottom Left
  //     else if (
  //       e.pageX > rect.left - margin &&
  //       e.pageX < rect.left + margin &&
  //       e.pageY > rect.top + rect.height - margin &&
  //       e.pageY < rect.top + rect.height + margin
  //     ) {
  //       resizingElement = windowEl;
  //       document.body.style.setProperty("cursor", "nesw-resize");
  //     } else {
  //       resizingElement = null;
  //       document.body.removeAttribute("style");
  //     }
  //     // Then check if we are on the SIDES
  //     // Then check if we are on top/bottom
  //   }
  // });
});

document.addEventListener("mousemove", function (e) {
  if (draggingElement) {
    let windowParent = draggingElement.parentElement;
    let margin = 10;
    if (
      e.pageX - draggingElement.dragPositionX >
        -draggingElement.getBoundingClientRect().width + margin &&
      e.pageX - draggingElement.dragPositionX < window.innerWidth - margin
    ) {
      windowParent.style.left = `${e.pageX - draggingElement.dragPositionX}px`;
    }
    if (
      e.pageY - draggingElement.dragPositionY > 0 &&
      e.pageY - draggingElement.dragPositionY < window.innerHeight - margin
    ) {
      windowParent.style.top = `${e.pageY - draggingElement.dragPositionY}px`;
    }
  }
});

document.addEventListener("mouseup", function (e) {
  if (draggingElement) {
    draggingElement = null;
  }
  // windowbar.isDragging = false;
});

// mouse down... we are resizing
// document.addEventListener("mousedown", function (e) {
//   if (resizingElement) {
//   }
// });
