// P5 STUFF

var sensor1;
var sensor2;
var x;
var y;

var brightness; // map brightness to mouse X

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background('lavender');
	fill('black');
	noStroke();

	x = map(sensor1, 0, 1023, 20, windowWidth-60);
	y = map(sensor2, 0, 915, 20, windowHeight-60);

	sizeX = map(x,60,windowWidth-60,40,120);
	sizeY = map(y,60,windowHeight-60,40,120);

	// ellipse(width/2, height/2, sensor1 + 20, sensor2);
	ellipse(x,y,sizeX,sizeY);
	// sensor 1: 0-1023
	// sensor 2: 0-915

	//brightness should be a value between 0-255, based on mouseX
	brightness = int(map(mouseX, 0, width, 0, 255));
}

function mouseClicked(){
	//send brightness to the server!
	socket.emit('led', brightness);
	console.log(brightness);

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
