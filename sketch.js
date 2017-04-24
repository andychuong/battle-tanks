// P5 STUFF

var sensorX1;
var sensorY1;
var sensorX2;
var sensorY2;
var x1;
var y1;
var x2;
var y2;


// var brightness; // map brightness to mouse X

function setup() {
	createCanvas(windowWidth, windowHeight);
	// background('white');
	x1 = windowWidth/2;
	y1 = windowHeight/2;
	x2 = windowWidth/2;
	y2 = windowHeight/2;

}

function draw() {
	background('white');
	updateValues();
	fill('blue');
	noStroke();
	rect(x1,y1,30,30);
	fill('red');
	rect(x2,y2,30,30);

}

function updateValues(){
	// X1
	if(sensorX1 < 470){
		if(x1 > 3){
			x1-=3;
			console.log(x1);
		}
	}
	if(sensorX1 > 530){
		if(x1 < windowWidth - 33){
			x1+=3;
			console.log(x1);
		}
	}
	// Y1
	if(sensorY1 > 530){
		if(y1 > 3){
			y1-=3;
			console.log(y1);
		}
	}
	if(sensorY1 < 470){
		if(y1 < windowHeight - 33){
			y1+=3;
			console.log(y1);
		}
	}

	// X2
	if(sensorX2 < 470){
		if(x2 > 3){
			x2-=3;
			// console.log(x1);
		}
	}
	if(sensorX2 > 530){
		if(x2 < windowWidth - 33){
			x2+=3;
		}
	}
	// Y2
	if(sensorY2 > 530){
		if(y2 > 3){
			y2-=3;
			console.log(y2);
		}
	}
	if(sensorY2 < 470){
		if(y2 < windowHeight - 33){
			y2+=3;
			// console.log(y1);
		}
	}

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
