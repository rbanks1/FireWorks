// FIREWORKS. Copyright 2020. Richard Banks
// Random fireworks. Done as part of a family art project on the New Year.

//#region GLOBAL VARIABLES
var arrayFireworks = [];
var arrayStems = [];
var thisTimer = setInterval(() => {
  var itemStem = new stem();
  append(arrayStems, itemStem);
}, 150);

var Y_AXIS = 1;
var X_AXIS = 2;
//#endregion

// *** SETUP ***
// -------------------------------

function setup() {
  // put setup code here
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
}

// *** DRAW ***
// -------------------------------------

function draw() {
  // put drawing code here

  background("black");
  fill(color(0));
  textSize(16);
  textAlign(CENTER);
  text("happy new year", windowWidth / 2, windowHeight / 2);
  //setGradient(0, height-200, width, 00, color(0), color(100,0,0), Y_AXIS);

  /******DRAW ANY STEMS ****/
  arrayStems.forEach((element) => {
    element.drawStem();
  });

  /******DRAW ANY FIREWORKS ****/
  arrayFireworks.forEach((element) => {
    element.drawFirework();
  });
}

// *** EVENTS ***
// ---------------------------------------

// EVENT windowResized
function windowResized(event) {
  resizeCanvas(windowWidth, windowHeight);
}

// EVENT mouseClicked
function mouseClicked(event) {
  var x = event.layerX;
  var y = event.layerY;
}

// *** CLASSES ***
// --------------------------------

// CLASS firework
// sets up and manages the exploding circle of the firework
class firework {
  constructor(x, y, colorFirework) {
    this.x = x;
    this.y = y;
    this.fireworkMaxDiameter = random(50, 300);
    this.numberOfParticles = Math.ceil(random(5, 16));
    this.colorFirework = colorFirework;
    this.diameter = 1;
    this.stroke = random(1, 7);
  }

  drawFirework() {
    if (this.diameter < this.fireworkMaxDiameter) {
      this.diameter = this.diameter + 10;
      for (let i = 0; i < this.numberOfParticles; i++) {
        stroke(this.colorFirework);
        strokeWeight(this.stroke);
        point(
          this.x +
            this.diameter *
              Math.cos(radians((i * 360) / this.numberOfParticles)),
          this.y +
            this.diameter *
              Math.sin(radians((i * 360) / this.numberOfParticles))
        );
      }
    }
  }
}

// CLASS stem
// sets up and draws the stem of the firework
class stem {
  constructor() {
    this.originX = random(windowWidth);
    this.originY = windowHeight;
    this.jumpX = random(1, 20);
    this.jumpY = random(windowHeight / 6, windowHeight / 4);
    this.currentX = this.originX;
    this.currentY = this.originY;
    this.stroke = random(8, 12);
    this.colorStem = color(random(255), random(255), random(255));
    this.velocityX = 0.9;
    this.velocityY = 0.8;
    this.firedFirework = false;
  }

  drawStem() {
    if (this.jumpX > 1) {
      this.jumpX = this.jumpX * this.velocityX;
      this.jumpY = this.jumpY * this.velocityY;
      this.currentX = this.currentX + this.jumpX;
      this.currentY = this.currentY - this.jumpY;
      stroke(this.colorStem);
      strokeWeight(this.stroke);
      point(this.currentX, this.currentY);
    } else if (!this.firedFirework) {
      var itemFirework = new firework(
        this.currentX,
        this.currentY,
        this.colorStem
      );
      append(arrayFireworks, itemFirework);
      this.firedFirework = true;
    }
  }
}

// *** UTILITY ***
// -----------------------------

// Create a gradient between two colours in the region specified
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis == Y_AXIS) {
    // Top to bottom gradient
    for (i = y; i <= y + h; i++) {
      inter = map(i, y, y + h, 0, 1);
      c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == X_AXIS) {
    // Left to right gradient
    for (i = x; i <= x + w; i++) {
      inter = map(i, x, x + w, 0, 1);
      c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
