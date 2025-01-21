# workshop_4:

You can view the generated effect by visiting the following link:

[View Workshop 4 Effect]( https://tianhui1112.github.io/workshop-4/)


## Key Functionalities

1. **Key Press Detection**  
   When the webpage detects any key press on the keyboard, a circle appears at a random position on the canvas.

2. **Circle Color Change**  
   Clicking on the circle changes its color.

3. **Circle Follows Mouse**  
   After clicking the circle, it begins to follow the mouse movement and generates a series of trails.

4. **Canvas Clearing**  
   Pressing the spacebar clears the canvas.



## Project workflow


1.1: Key Press Detection

```javascript

// When any key is pressed
function keyPressed() {
  isKeyPressed = true;
  circleX = random(width); // Generate a random x-coordinate for the circle
  circleY = random(height); // Generate a random y-coordinate for the circle
}
```

A flag variable (`isKeyPressed`) is set to `true`, indicating that a key press event has occurred.



1.2: Circle Color Change & ircle Follows Mouse

```javascript
function mouseClicked() {
  // Randomly decide to change either the circle's color or the trail's color
  let randomChoice = floor(random(2)); // Randomly choose 0 or 1
  if (randomChoice === 0) {
    circleColor = color(random(255), random(255), random(255)); // Change the circle's color randomly
  } else {
    currentColor = color(random(255), random(255), random(255)); // Change the trail's color randomly
  }

  // Toggle whether the circle follows the mouse
  isCircleFollowing = !isCircleFollowing;

  // Activate or deactivate the trail
  if (!isTrailActive) {
    isTrailActive = true; // Enable trail drawing
  } else {
    isTrailActive = false; // Disable trail drawing
  }
}

// Update the trail whenever the mouse is dragged
function mouseDragged() {
  if (isTrailActive) {
    points.push(createVector(mouseX, mouseY)); // Record the trail's points as the mouse moves
    pointStartTimes.push(frameCount); // Record the starting time of each point
    starColors.push(currentColor); // Store the current trail color
  }
}

// Stop drawing the trail when the mouse is released
function mouseReleased() {
  // Do nothing
}

```
1.2.1: We use `mouseClicked()` to detect if the user clicks on the circle in the image. The `floor(random(2))` is used to generate a random number that is either 0 or 1. If the number is 0, the circle's color is changed; if the number is 1, the trail's color is changed.

1.2.2: We use `isCircleFollowing = !isCircleFollowing` to toggle whether the circle should follow the mouse. `isCircleFollowing` is a boolean variable that indicates whether the circle should follow the mouse movement.

1.2.3: We use the built-in function `mouseDragged()` to determine whether the mouse follows the movement. 



1.3: Canvas Clearing
```javascript
if (keyIsPressed && key === ' ') {
  points = [];
  pointStartTimes = [];
  starColors = [];
  background(220);
}
```

We use the `keyIsPressed` function to detect when the spacebar is pressed. When this happens, we reset all initial variables to their original settings and update the canvas, thus clearing all information from the image.
