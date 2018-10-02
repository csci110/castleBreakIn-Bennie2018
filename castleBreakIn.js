import {game, Sprite} from "./sgc/sgc.js";
game.setBackground("grass.png");

// header skill game next part


class Wall extends Sprite {
    constructor(x,y,name,image){
        super();
        this.x = this.x;
        this.y =  this.y;
        this.name = this.name; 
        this.setImage(image);
        this.accelerateOnBounce = false;
    }
    //let wall = new Wall (0,0,"A spooky castle wall","castle.png");
}
let topwall   = new Wall(0,0,"A spooky castle wall","castle.png");
let leftwall  = new Wall(0,200,"left side wall","wall.png");
let rightwall = new Wall(-48,200,"right side wall","wall.png");

class Princess extends Sprite {
	constructor() {
		super();
		this.name = "Princess Ann";
		this.setImage("ann.png");
		this.width = 48;
		this.height = 48;
		this.x = game.displayWidth; //test to make in the middle of the bottom screen
		this.y = this.height - game.displayHeight;
		this.speedWhenWalking = 150;
		this.lives = 3;
		this.accelerateOnBounce = false;
		this.defineAnimation("left", 9, 11);
        this.defineAnimation("right",3,5);
	}
	handleLeftArrowKey(){
		this.playAnimation("left");
		this.speed = this.speedWhenWalking;
		this.angle = 0;
	}		
	handleRightArrowKey() {
		this.playAnimation("right");
		this.speed = this.speedWhenWalking;
		this.angle = 180;
	}
	handleFirstGameLoop(){
		// Set up a text area to display the number of lives remaining.
		this.livesDisplay = game.createTextArea(game.displayWidth + 3, 20);
		this.updateLivesDisplay();
	}
	handleCollision(otherSprite) {
        // Horizontally, Ann's image file is about one-third blank, one-third Ann, and         // one-third blank.
        // Vertically, there is very little blank space. Ann's head is about one-fourth         // the height.
        // The other sprite (Ball) should change angle if:
        // 1. it hits the middle horizontal third of the image, which is not blank, AND
        // 2. it hits the upper fourth, which is Ann's head.
        let horizontalOffset = this.x - otherSprite.x;
        let verticalOffset = this.y - otherSprite.y;
        if (Math.abs(horizontalOffset) < this.width / 3 
                    && verticalOffset > this.height / 4) {
            // The new angle depends on the horizontal difference between sprites.
            otherSprite.angle = 90 + 2 * horizontalOffset;
        }
        return false;
	}
	updateLivesDisplay() {
		game.writeToTextArea(this.livesDisplay, "Lives = " + this.lives);	
	}
	loseALife() {
		this.lives = 3;
		for (this.lives; this.lives >0; this.lives-1) {
			if (this.lives == 0) {
				game.end ("The mysterious stanger has escaped\nPrincess Ann for now\n\Better luck next time.");
			}
			if (this.lives > 0) {
				this.updateLivesDisplay() - 1;
				this.lives - 1;
			}	
		}	
	}
}
let ann = new Princess();


class Ball extends Sprite {
	constructor(){
		super();
		//this.x  play around with game.display stuff to center the ball for x and y
		//this.y   ^
		this.height = 48;
		this.width = 48;
		this.name = Ball;
		this.setImage("ball.png");
		this.defineAnimation("spin",0,12);
		this.playAnimation("spin"); // check if this plays spin with the ball
		this.speed = 1;
		this.angle = 50 + Math.random() * 80;
	}
	handleGameLoop() {
		while ( this.speed < 200) {
			this.speed = this.speed + 2;
		
			return this.speed; // check if this increases speed without going above 200 
		}
	}
	handleBoundaryContact() {
		game.removeSprite(this);
		ann.loseALife();
	}
}

let ball = new Ball(); 