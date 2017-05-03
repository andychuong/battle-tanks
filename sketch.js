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

var gameState;
// 0 = start screen
// 1 = in progress
// 2 = end 

function setup() {
	createCanvas(windowWidth, windowHeight);
	gameState = 0;

	// Player 1
	ready1 = false;
	player1 = createSprite(400, 200, 50, 50);
	player1.shapeColor = 'blue';
	x1 = windowWidth/2;
	y1 = windowHeight/2;
	bullets1 = new Group();
	points2 = 0;



	// Player 2
	ready2 = false;
	player2 = createSprite(400, 200, 50, 50);
	player2.shapeColor = 'red';
	x2 = windowWidth/2;
	y2 = windowHeight/2;
	bullets2 = new Group();
	points2 = 0;

}

function draw() {
	// GAME STATE 0 ----- START SCREEN ----- ----- 
	if(gameState == 0){
		background('grey');
		if(sensorS1 == 1){
			ready1 = true;
			console.log(gameState);
		}
		if(sensorS2 == 1){
			ready2 = true;
			console.log(gameState)
		}

		if(ready1 == true && ready2 == true){
			gameState = 1;
		}
	}
	
	// GAME STATE 1 ----- GAME PLAY ----- -----
	if(gameState == 1){
		background('white');
		
		// Player 1 Location
		player1.position.x = x1;
		player1.position.y = y1;

		// Player 1 Shooting
		if(keyWentDown("x")){
			console.log('x');
	   		var bullet1 = createSprite(player1.position.x, player1.position.y, 5, 1);
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
	    	console.log('c pressed');
	   		var bullet2 = createSprite(player2.position.x, player2.position.y, 5, 1);
	    	bullet2.setSpeed(10+player2.getSpeed(), player2.rotation);
	    	bullet2.life = 160;
	    	bullet2.shapeColor = 'black';
	    	bullets2.add(bullet2);
	    }
		

		bullets1.overlap(player2, oneHitTwo);
		bullets2.overlap(player1, twoHitOne);
		

		// Check Win

		if(points1 == 5 || points2 == 5){
			gameState = 2;
		}

		// Update Values
		drawSprites();
		updateValues();
	}

	// GAME STATE 2 ----- GAME OVER ----- ----- 

	if(gameState == 2){
		background('black');
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
		if(x1 > 3){
			x1-=3;
			console.log(x1);
		}
	}//right
	if(sensorX1 > 530){
		if(x1 < windowWidth - 33){
			x1+=3;
			console.log(x1);
		}
	}
	
	// Y1
	//down
	if(sensorY1 > 530){
		if(y1 < windowHeight - 33){
			y1 += 3;
			console.log(y1);
		}
	}//up
	if(sensorY1 < 470){
		if(y1 > 3){
			y1 -= 3;
			console.log(y1);
		}
	}
	// Rotation 1
	rotation1 = map(sensorR1, 0, 1023, -90, 90);
	player1.rotation = rotation1;

	//// Player 2 ------------

	// X2
	// left
	if(sensorX2 < 470){
		if(x2 > 3){
			x2 -= 3;
		}
	}
	// right
	if(sensorX2 > 530){
		if(x2 < windowWidth - 33){
			x2 += 3;
		}
	}
	// Y2
	// down
	if(sensorY2 > 530){
		if(y2 < windowHeight -33){
			y2 += 3;
			console.log(y2);
		}
	}
	// up
	if(sensorY2 < 470){
		if(y2 > 3){
			y2 -= 3;
			// console.log(y1);
		}
	}
	// Rotation 2
	rotation2 = map(sensorR2, 0, 1023, 270, 90);
	player2.rotation = rotation2;
	console.log(rotation2);

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

function init(){

}

window.addEventListener('load', init);
