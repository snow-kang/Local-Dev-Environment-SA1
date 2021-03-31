const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/* TEXT LOCAL VARIABLES */
let idx = 0;
let introText =
  "Hi! I'm Snow from Florida :) Click somewhere to experience a day in my life :p";
let speed = 100; // speed of the typing effect (duration in milliseconds)

/* SCENE LOCAL VARIABLES */
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
let particlesArray = [];

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

// Adjusts for window resizing
function clientResize(env) {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", clientResize);

// Upon mouse click, generates a snowflake
function clientMousePress(env) {
  particlesArray.push({
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
  for (var i = 0; i < particlesArray.length; i++) {
    // Draws a circle
    ctx.beginPath();
    ctx.arc(
      particlesArray[i].x, // x-coord
      particlesArray[i].y, // y-coord
      particlesArray[i].radius, // radius
      0, // start angle (rad)
      Math.PI * 2 // end angle (rad)
    );
    ctx.fillStyle = `rgba(255, 255, 255, ${particlesArray[i].opacity})`;
    ctx.fill();
  }
}

function moveSnowFlakes() {
  for (var i = 0; i < particlesArray.length; i++) {
    particlesArray[i].x += particlesArray[i].speedX;
    particlesArray[i].y += particlesArray[i].speedY;

    // After a snowflake falls out of view -> move it back to the top of the window
    if (particlesArray[i].y > h) {
      particlesArray[i].x = random(-10, w + 10);
      particlesArray[i].y = -30;
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
