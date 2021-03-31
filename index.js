const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const MAX_SNOWFLAKES = 500;

/* TEXT LOCAL VARIABLES */
let idx = 0;
let introText =
  "Hi! I'm Snow from Florida :) Click somewhere to bring me to the beach :O";
let speed = 100; // speed of the typing effect (duration in milliseconds)

/* SCENE LOCAL VARIABLES */
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
let snowflakesArray = [];

/* TEXT FUNCTIONS */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TypeWriting Effect: Followed tutorial from https://www.w3schools.com/howto/howto_js_typewriter.asp
async function typeWriter() {
  if (idx < introText.length) {
    let currentChar = introText.charAt(idx);
    document.getElementById("intro").innerHTML += currentChar;
    if (currentChar === "!" || currentChar === ")") {
      await sleep(700);
    }
    idx++;
    setTimeout(typeWriter, speed);
  }
}

/* SCENE FUNCTIONS */
// Returns a random number from [min, max)
function random(min, max) {
  return min + Math.random() * (max - min);
}

function clientResize(env) {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  drawSnowFlakes();
}
window.addEventListener("resize", clientResize);

// Upon mouse click, generates a snowflake
function clientMousePress(env) {
  snowflakesArray.push({
    x: env.x,
    y: env.y,
    opacity: random(0.5, 1),
    speedX: random(-5, 10),
    speedY: random(8, 15),
    radius: random(3, 8),
  });
}
window.addEventListener("click", clientMousePress);

// Snowfall: Followed tutorial from https://www.youtube.com/watch?v=50teKYVaQgc for the functions below
function drawSnowFlakes() {
  for (var i = 0; i < snowflakesArray.length; i++) {
    // Draws a circle
    ctx.beginPath();
    ctx.arc(
      snowflakesArray[i].x, // x-coord
      snowflakesArray[i].y, // y-coord
      snowflakesArray[i].radius, // radius
      0, // start angle (rad)
      Math.PI * 2 // end angle (rad)
    );
    ctx.fillStyle = `rgba(255, 255, 255, ${snowflakesArray[i].opacity})`;
    ctx.fill();
  }
}

function moveSnowFlakes() {
  for (var i = 0; i < snowflakesArray.length; i++) {
    snowflakesArray[i].x += snowflakesArray[i].speedX;
    snowflakesArray[i].y += snowflakesArray[i].speedY;

    // After a snowflake falls out of view -> move it back to the top of the window
    if (snowflakesArray[i].y > h) {
      // Start removing snowflakes if there are already >= MAX_SNOWFLAKES snowflakes on the screen
      if (snowflakesArray.length < MAX_SNOWFLAKES) {
        snowflakesArray[i].x = random(-10, w + 10);
        snowflakesArray[i].y = -30;
      } else {
        snowflakesArray.splice(i, 1);
      }
    }
  }
}

function updateSnowFall() {
  ctx.clearRect(0, 0, w, h);
  drawSnowFlakes();
  moveSnowFlakes();
}

/* MAIN */
typeWriter();
setInterval(updateSnowFall, 50);
