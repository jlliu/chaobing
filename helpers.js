// Make it so when we press next button, we go to the next scene

function timedAnimation(timeInfo) {
  // should trigger audio.. when i have it.
  currentlyAnimating = true;
  timeInfo.forEach(function (value, index) {
    setTimeout(function () {
      timedAnimationIndex = (index + 1) % timeInfo.length;
      timedAnimationIndex == 0
        ? (currentlyAnimating = false)
        : (currentlyAnimating = true);
    }, value);
  });
}

function drawImageToScale(img, x, y) {
  image(
    img,
    x * scaleRatio,
    y * scaleRatio,
    img.width * scaleRatio,
    img.height * scaleRatio
  );
}

function calculateCanvasDimensions() {
  if (windowWidth / windowHeight > canvasRatio) {
    canvasWidth = windowHeight * canvasRatio;
    canvasHeight = windowHeight;
  } else {
    canvasWidth = windowWidth;
    canvasHeight = windowWidth / canvasRatio;
  }
  scaleRatio = canvasWidth / 640;
}

function windowResized() {
  calculateCanvasDimensions();
  resizeCanvas(canvasWidth, canvasHeight);
}
