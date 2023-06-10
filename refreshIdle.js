// Reset after 10 minutes
let resetTime = 600;

function setIdle(cb, seconds) {
  var timer;
  var interval = seconds * 1000;
  function refresh() {
    clearInterval(timer);
    timer = setTimeout(cb, interval);
  }
  ["keypress", "click", "mousemove"].forEach((event) =>
    document.addEventListener(event, refresh)
  );
  refresh();
}

setIdle(function () {
  location.href = "/";
}, resetTime);
