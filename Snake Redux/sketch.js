// Width of the canvas
const CANVAS_WIDTH = 600;

// Height of the canvas
const CANVAS_HEIGHT = 600;

// Scale
const SCALE = 30;

// Width of one block of the snake
const SNAKE_WIDTH = CANVAS_WIDTH / SCALE;

// Height of one block of the snake
const SNAKE_HEIGHT = CANVAS_HEIGHT / SCALE;

// Width of one grid block
const WIDTH_GRID_BLOCK = SNAKE_WIDTH;


function setup() {
  frameRate(10);
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.position((windowWidth - CANVAS_WIDTH) / 2, (windowHeight - CANVAS_HEIGHT) / 2);
  snake = new Snake(WIDTH_GRID_BLOCK, WIDTH_GRID_BLOCK, SNAKE_WIDTH, SNAKE_HEIGHT);
  pickFoodLocation();
}

function draw() {
  background(0);
  snake.gameOver();
  if(snake.collidedWithWall) {
    snake.moveBack();
    fill(255, 0, 0);
    textSize(20);
    text("Game Over", 0, 50);
    text("Press the Space Bar to try again", 0, 70);
    noLoop();

  } else if(snake.collidedWithSnakeBody) {
    fill(255, 0, 0);
    textSize(20);
    text("Game Over", 0, 50);
    text("Press the Space Bar to try again", 0, 70);
    noLoop();
  }
  snake.draw();
  snake.update();
  if(snake.eat(food)) {
    pickFoodLocation();
  }
  drawFood();
  updateScore();

}

function keyPressed() {
  if(keyCode == UP_ARROW) {
    snake.direction(0, -1);
    direction = createVector(0, -1);

  } else if(keyCode == DOWN_ARROW) {
    snake.direction(0, 1);
    direction = createVector(0, 1);

  } else if(keyCode == LEFT_ARROW) {
    snake.direction(-1, 0);
    direction = createVector(-1, 0);

  } else if(keyCode == RIGHT_ARROW) {
    snake.direction(1, 0);
    direction = createVector(1, 0);

  } else if(key == " ") {
    if(snake.collidedWithWall || snake.collidedWithSnakeBody) {
      if(snake.body.length - 1 > highScore) {
        highScore = snake.body.length - 1;
      }

      snake.reset(WIDTH_GRID_BLOCK, WIDTH_GRID_BLOCK);
      direction = null;
      prevDirection = null;
      pickFoodLocation();
      loop();
    }

  }


  if(prevDirection != null) {
    // Part for not allowing the snake to go backwards
    if(snake.body.length > 1 && ((direction.x != prevDirection.x && direction.y == prevDirection.y)
     || (direction.x == prevDirection.x && direction.y != prevDirection.y))) {
      direction = prevDirection;
      snake.direction(direction.x, direction.y);
    }

  }
  prevDirection = direction;

}

// function that picks the location of the food
function pickFoodLocation() {
  let columns = floor(CANVAS_WIDTH / WIDTH_GRID_BLOCK);
  let rows = floor(CANVAS_HEIGHT / WIDTH_GRID_BLOCK);
  let xOfFood = floor(random(columns));
  let yOfFood = floor(random(rows));
  food = createVector(xOfFood, yOfFood);
  food.mult(WIDTH_GRID_BLOCK);
}

function drawFood() {
  fill(255, 0, 0);
  rect(food.x, food.y, SNAKE_WIDTH, SNAKE_HEIGHT);
}

// function to update the score
function updateScore() {
  fill(255, 0, 0);
  textSize(20);
  text("Score: " + (snake.body.length - 1), 0, 20);
  text("High Score: " + highScore, CANVAS_WIDTH / 3, 20);
}

let canvas;

let snake;

let food;

//  current direction of the snake
let direction;

// previous direction of the snake
let prevDirection;

let highScore = 0;
