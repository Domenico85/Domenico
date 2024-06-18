const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const basket = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 50,
  width: 100,
  height: 20,
  dx: 5,
};

const fallingObjects = [];
const objectWidth = 20;
const objectHeight = 20;
let score = 0;

function drawBasket() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawObject(object) {
  ctx.fillStyle = "#f00";
  ctx.fillRect(object.x, object.y, objectWidth, objectHeight);
}

function moveBasket() {
  if (rightPressed && basket.x < canvas.width - basket.width) {
    basket.x += basket.dx;
  }
  if (leftPressed && basket.x > 0) {
    basket.x -= basket.dx;
  }
}

function generateFallingObject() {
  const x = Math.random() * (canvas.width - objectWidth);
  fallingObjects.push({ x, y: 0 });
}

function moveFallingObjects() {
  for (let i = 0; i < fallingObjects.length; i++) {
    fallingObjects[i].y += 2;

    if (
      fallingObjects[i].y + objectHeight > basket.y &&
      fallingObjects[i].x > basket.x &&
      fallingObjects[i].x < basket.x + basket.width
    ) {
      fallingObjects.splice(i, 1);
      score++;
    } else if (fallingObjects[i].y > canvas.height) {
      fallingObjects.splice(i, 1);
    }
  }
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();
  drawScore();
  moveBasket();
  moveFallingObjects();
  fallingObjects.forEach(drawObject);
  requestAnimationFrame(update);
}

setInterval(generateFallingObject, 1000);
update();
