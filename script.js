// Initialize the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up the ball, paddle, bricks, and score
const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  dx: 3,
  dy: -3,
  radius: 10
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 20
};

const brickRowCount = 5;
const brickColumnCount = 7;
const brickWidth = 70;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 20;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

let score = 0;

// Draw the ball, paddle, bricks, and score
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = '24px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`Score: ${score}`, 20, 30);
}

// Move the ball and paddle
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.radius > canvas.height - paddle.height) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      alert('Game over');
      document.location.reload();
    }
  }

  for (let c = 0; c < brickColumnCount; c++) {
for (let r = 0; r < brickRowCount; r++) {
const b = bricks[c][r];
if (b.status === 1) {
if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
ball.dy = -ball.dy;
b.status = 0;
score++;
if (score === brickRowCount * brickColumnCount) {
alert('You win!');
document.location.reload();
}
}
}
}
}
}

function movePaddle(direction) {
if (direction === 'left' && paddle.x > 0) {
paddle.x -= paddle.speed;
} else if (direction === 'right' && paddle.x + paddle.width < canvas.width) {
paddle.x += paddle.speed;
}
}

// Main game loop
function loop() {
// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Move the ball and paddle
moveBall();

// Draw the ball, paddle, bricks, and score
drawBall();
drawPaddle();
drawBricks();
drawScore();

// Request another animation frame
requestAnimationFrame(loop);
}

// Event listeners for moving the paddle
document.addEventListener('keydown', event => {
if (event.code === 'ArrowLeft') {
movePaddle('left');
} else if (event.code === 'ArrowRight') {
movePaddle('right');
}
});

// Start the game loop
requestAnimationFrame(loop);