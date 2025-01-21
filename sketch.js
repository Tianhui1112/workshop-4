let isKeyPressed = false;
let circleX, circleY;
let points = []; // Stores the points of the mouse trail
let pointStartTimes = []; // Stores the starting time for each star
let currentColor; // Color of the trail
let circleColor; // Color of the circle
let isCircleFollowing = false; // Controls whether the circle should follow the mouse
let isTrailActive = false; // Controls whether the trail should follow the mouse
let starColors = []; // Stores the color for each star

function setup() {
  createCanvas(400, 400);
  background(220);
  
  // Initialize colors
  circleColor = color(0, 255, 0); // Initial circle color
  currentColor = color(0, 0, 255); // Initial trail color
}

function draw() {
  // Check if the spacebar is pressed, and clear the canvas
  if (keyIsPressed && key === ' ') {
    points = [];
    pointStartTimes = [];
    starColors = [];
    background(220);
  }

  // Clear the canvas and redraw the prompt
  if (!isKeyPressed) {
    background(220);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Please press any key to start", width / 2, height / 2);
  } else {
    // If a key is pressed, show a circle
    background(220);
    fill(circleColor);
    ellipse(circleX, circleY, 50, 50);
  }

  // If the trail is active, draw small stars as the trail
  if (isTrailActive) {
    for (let i = 0; i < points.length; i++) {
      // Draw stars based on the stored color
      let alpha = map(frameCount - pointStartTimes[i], 0, 60, 0, 255); // Gradually brighten over 60 frames
      starColors[i].setAlpha(alpha); // Set the transparency of the trail color
      drawStar(points[i].x, points[i].y, 5, 10, 5, starColors[i]); // Draw a small star on the trail
    }
  }

  // If the circle needs to follow the mouse
  if (isCircleFollowing) {
    circleX = mouseX;
    circleY = mouseY;

    // Automatically draw the trail behind the circle
    points.push(createVector(circleX, circleY)); // Record the points as the circle moves
    pointStartTimes.push(frameCount); // Record the starting time of each point
    starColors.push(currentColor); // Store the current trail color
  }

  // Prompt information to press the spacebar to clear the canvas
  fill(0);
  textSize(14);
  textAlign(RIGHT, BOTTOM);
  text("Press space to clear the canvas", width - 10, height - 10);
}

// Function to draw a star
function drawStar(x, y, radius1, radius2, npoints, starColor) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  fill(starColor); // Use the passed-in color
  noStroke();
  beginShape();
  for (let a = -PI / 4; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// When any key is pressed
function keyPressed() {
  isKeyPressed = true;
  circleX = random(width);
  circleY = random(height);
}

// Each time the canvas is clicked, change the circle color or trail color, and toggle whether the circle follows the mouse
function mouseClicked() {
  // Randomly choose to change the circle's color or the trail's color
  let randomChoice = floor(random(2)); // 0 or 1, randomly choose
  if (randomChoice === 0) {
    circleColor = color(random(255), random(255), random(255)); // Randomly change the circle's color
  } else {
    currentColor = color(random(255), random(255), random(255)); // Randomly change the trail's color
  }

  // If the circle has been clicked, start following the mouse
  isCircleFollowing = !isCircleFollowing;

  // Activate the trail
  if (!isTrailActive) {
    isTrailActive = true; // Activate trail drawing
  } else {
    isTrailActive = false; // Deactivate trail drawing
  }
}

// Update the trail when the mouse is dragged
function mouseDragged() {
  if (isTrailActive) {
    points.push(createVector(mouseX, mouseY)); // Record the trail's points as the mouse moves
    pointStartTimes.push(frameCount); // Record the starting time of each point
    starColors.push(currentColor); // Store the current trail color
  }
}

// When the mouse is released, stop drawing the trail
function mouseReleased() {
  // Do nothing
}