// Sketch Two
var sketch2 = function (p) {
  var x = 100.0;
  var y = 100;
  var speed = 2.5;
  p.setup = function () {
    p.createCanvas(400, 200);
  };

  p.draw = function () {
    p.background("pink");
  };
};
new p5(sketch2, "canvas2");
