// P5 STUFF

var sensorX1;
var sensorY1;
var sensorR1;
var sensorS1;

var x1;
var y1;
var rotation1;
var ready1;
var fire1;
var points1;
var bullets1;
var hearts1;

var sensorX2;
var sensorY2;
var sensorR2;
var sensorS2;

var x2;
var y2;
var rotation2;
var ready2;
var fire2;
var points2;
var bullets2;
var hearts2;

var wins;
var gameState;
// 0 = start screen
// 1 = in progress
// 2 = end 

function preload() {
   fontTitle = loadFont("assets/Bangers-Regular.ttf");
   fontOther = loadFont("assets/SquadaOne-Regular.ttf");

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	gameState = 0;
	wins = 5;

	// Player 1
	ready1 = false;
	player1 = createSprite(400, 200, 50, 50);
	// player1.shapeColor = 'blue';
	blueTank = loadImage("assets/bluetank_small.png");
	player1.addImage(blueTank);
	x1 = 90;
	y1 = 140;
	bullets1 = new Group();
	points1 = 0;

	// Player 2
	ready2 = false;
	player2 = createSprite(400, 200, 50, 50);
	greenTank = loadImage("assets/greentank_small.png");
	greenTank2 = loadImage("assets/greentank_small2.png");
	player2.addImage(greenTank);
	// player2.shapeColor = 'red';
	x2 = windowWidth - 90;
	y2 = windowHeight -93;
	bullets2 = new Group();
	points2 = 0;

	heart = loadImage("assets/heart.png");

}

function draw() {
	console.log(gameState);
	// GAME STATE 0 ----- START SCREEN ----- ----- 
	if(gameState == 0){
		background('white');

		fill(200);
		textSize(80);
		textFont(fontTitle);
		text("Battle Tanks", windowWidth/2 -200, 70);

		rect(100,100, windowWidth - 200, windowHeight - 200);

		fill(0);
		textSize(40);
		textFont(fontOther);
		text("Instructions", windowWidth/2 - 90, 135);
		rect(windowWidth/2 - 300, 145, 600, 5);

		textSize(30);
		text("- Use the joystick to move", windowWidth/2 - 140, 180);
		text("- Press the joystick down to shoot", windowWidth/2 - 140, 210 );
		text("- Use the slider to turn", windowWidth/2 - 140, 240);

		textSize(40);
		text("To ready up, press the joystick down.", windowWidth/2 -250, windowHeight/2);
		text("When both players are ready, the game will start!", windowWidth/2 - 335, windowHeight/2 + 40);

		image(blueTank, 210, windowHeight - 300);
		image(greenTank2, windowWidth-280, windowHeight - 300);


		if(ready1){
			text("Player 1: Ready!", 120, windowHeight - 200);
		}
		if(ready2){
			text("Player 2: Ready!", windowWidth - 360, windowHeight - 200);
		}

		// rect(windowWidth/2 - 2, 0, 4, windowHeight);

		if(sensorS1 == 1){
			ready1 = true;
			// console.log(gameState);
		}
		if(sensorS2 == 1){
			ready2 = true;
			// console.log(gameState)
		}
		if(ready1 == true && ready2 == true){
			gameState = 1;
		}
	}
	
	// GAME STATE 1 ----- GAME PLAY ----- -----
	if(gameState == 1){
		background('white');

		fill(200);
		textSize(80);
		textFont(fontTitle);
		text("Battle Tanks", windowWidth/2 -200, 70);

		//rectangle box
		stroke(0);
		strokeWeight(2);
		rect(50,100,windowWidth - 100, windowHeight - 150);
		strokeWeight(1);

		//middle bar
		fill(0);
		rect(windowWidth/2 -10,100, 20, windowHeight - 150);

		
		// Player 1 Location
		player1.position.x = x1;
		player1.position.y = y1;

		// Player 1 Shooting
		if(keyWentDown("x")){
			// console.log('x');
	   		var bullet1 = createSprite(player1.position.x, player1.position.y, 6, 4);
	    	bullet1.setSpeed(10+player1.getSpeed(), player1.rotation);
	    	bullet1.life = 160;
	    	bullet1.shapeColor = 'black';
	    	bullets1.add(bullet1);
	    }
	   
	    // Player 2 Location
		player2.position.x = x2;
		player2.position.y = y2;

		// Player 2 Shooting
	    if(keyWentDown("c")){
	    	// console.log('c pressed');
	   		var bullet2 = createSprite(player2.position.x, player2.position.y, 6, 4);
	    	bullet2.setSpeed(10+player2.getSpeed(), player2.rotation);
	    	bullet2.life = 160;
	    	bullet2.shapeColor = 'black';
	    	bullets2.add(bullet2);
	    }

	    //detect hits
		bullets1.overlap(player2, oneHitTwo);
		bullets2.overlap(player1, twoHitOne);

		//draw hearts
		hearts1 = wins - points2;
		hearts2 = wins - points1;

		for(var i = 0; i < hearts1; i++){
			image(heart, 50 + (22*i), windowHeight - 48);
		}

		for(var j = 0; j < hearts2; j++){
			image(heart, windowWidth - (70 + (22*j) ), windowHeight - 48);
		}
		

		// Check Win

		if(points1 == wins || points2 == wins){
			gameState = 2;
		}

		// Update Values
		drawSprites();
		updateValues();
	}

	// GAME STATE 2 ----- GAME OVER ----- ----- 

	if(gameState == 2){
		background('white');

		fill(200);
		textSize(80);
		textFont(fontTitle);
		text("Battle Tanks", windowWidth/2 -200, 70);

		stroke(0);
		strokeWeight(2);
		rect(50,100,windowWidth - 100, windowHeight - 150);
		strokeWeight(1);

		textFont(fontOther);
		textSize(200)

		if(points1 == wins){
			fill("#2262c9");
			text("Player 1 Wins!", windowWidth/2 - 500, windowHeight/2);
		}
		if(points2 == wins){
			fill("#0eca29");
			text("Player 2 Wins!", windowWidth/2 - 500, windowHeight/2);
		}

		fill("black");
		textSize(40);
		text("To restart, press the joystick down.", windowWidth/2 -250, windowHeight/2+80);

		if(sensorS1 == 1){
			ready1 = false;
		}
		if(sensorS2 = 1){
			ready2 = false;
		}

		if(ready1 == false || ready2 == false){
			gameState = 0;
			ready1 = false;
			ready2 = false;
			points1 = 0;
			points2 = 0;
		}
	}

}

function oneHitTwo(bullet1){
	// player2.shapeColor = "orange";
	points1++;
	bullet1.remove();
}

function twoHitOne(bullet2){
	points2++;
	bullet2.remove();
}

function updateValues(){ // update sketch.js variables with sensor data
	//// Player 1 ------------
	// X1
	//left
	if(sensorX1 < 470){
		if(x1 > 90){
			x1-=3;
			// console.log(x1);
		}
	}//right
	if(sensorX1 > 530){
		if(x1 < windowWidth/2 - 45){
			x1+=3;
			// console.log(x1);
		}
	}
	
	// Y1
	//down
	if(sensorY1 > 530){
		if(y1 < windowHeight - 90){
			y1 += 3;
			// console.log(y1);
		}
	}//up
	if(sensorY1 < 470){
		if(y1 > 140){
			y1 -= 3;
			// console.log(y1);
		}
	}
	// Rotation 1
	rotation1 = map(sensorR1, 0, 1023, -90, 90);
	player1.rotation = rotation1;

	//// Player 2 ------------

	// X2
	// left
	if(sensorX2 < 470){
		if(x2 > windowWidth/2 + 45){
			x2 -= 3;
			// console.log(x2);
		}
	}
	// right
	if(sensorX2 > 530){
		if(x2 < windowWidth - 90){
			x2 += 3;
		}
	}
	// Y2
	// down
	if(sensorY2 > 530){
		if(y2 < windowHeight -93){
			y2 += 3;
			// console.log(y2);
		}
	}
	// up
	if(sensorY2 < 470){
		if(y2 > 140){
			y2 -= 3;
			// console.log(y1);
		}
	}
	// Rotation 2
	rotation2 = map(sensorR2, 0, 1023, 270, 90);
	player2.rotation = rotation2;
	// console.log(rotation2);

}

// all non-p5 javascript needs to go inside init 
// so that it executes once the page has loaded
// function init(){

// 	// SOCKET STUFF
// 	var socket = io.connect();

// 	socket.on('connect', function() {
// 		console.log("Connected");
// 	});

// 	socket.on('sensor', function(data){
// 		console.log(data);
// 		sensor = Number(data);
// 	});

// }

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

function init(){

}

window.addEventListener('load', init);
