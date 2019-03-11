class Snake {
  constructor(startX, startY, originalWidth, originalHeight) {
    this.width = originalWidth;
    this.height = originalHeight;
    this.body = [];
    this.body.push(createVector(startX, startY));
    this.xVel = 0;
    this.yVel = 0;
    this.collidedWithWall = false;
    this.collidedWithSnakeBody = false;
  }

  // displays snake onto the screen
  draw() {
    for(let i = 0; i < this.body.length; i++) {
      fill(255);
      stroke(0);
      rect(this.body[i].x, this.body[i].y, this.width, this.height);
    }
  }

  // updates the position of the snake
  update() {
    let nextBody = this.body[this.body.length - 1].copy();
    this.body.shift();
    nextBody.x += this.xVel;
    nextBody.y += this.yVel;
    this.body.push(nextBody);

  }

  // function to increase the size of the snake
  grow() {
    let nextBody = this.body[this.body.length - 1].copy();
    nextBody.x += this.xVel;
    nextBody.y += this.yVel;
    this.body.push(nextBody);
  }

  // sets direction at which the snake moves
  direction(xVel, yVel) {
    this.xVel = xVel * this.width;
    this.yVel = yVel * this.height;
  }

  // checks if the snake reached the location of the food
  // if so, return true
  eat(food) {
    if(this.body[this.body.length - 1].x == food.x) {
      if(this.body[this.body.length - 1].y == food.y) {
        this.grow();
        return true;
      }
    }
  }

  // checks if the snake has collided with the wall or itself
  gameOver() {
    let xOfSnakeHead = this.body[this.body.length - 1].x;
    let yOfSnakeHead = this.body[this.body.length - 1].y;
    if(xOfSnakeHead == -SNAKE_WIDTH  || xOfSnakeHead == CANVAS_WIDTH
      || yOfSnakeHead == -SNAKE_WIDTH  || yOfSnakeHead == CANVAS_HEIGHT) {
        this.collidedWithWall = true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(xOfSnakeHead == part.x && yOfSnakeHead == part.y) {
      	this.collidedWithSnakeBody = true;
      }
    }

  }

  // function to move the snake backwards once such that the snake would appear to have collided with the wall
  // once the snake has collided with the wall
  moveBack() {
    for(let i = 0; i < this.body.length; i++) {
      this.body[i].x -= this.xVel;
      this.body[i].y -= this.yVel;
    }
  }

  // function to reset the position and size of the snake
  // also resets any variable pertaining to the movement and collision detection of snake object
  // takes in the starting x and y position of the snake in the parameters
  reset(startX, startY) {
    for(let i = this.body.length; i >= 0; i--) {
      this.body.splice(i, 1);
    }
    this.body.push(createVector(startX, startY));
    this.collidedWithWall = false;
    this.collidedWithSnakeBody = false;
    this.xVel = 0;
    this.yVel = 0;
  }
}
