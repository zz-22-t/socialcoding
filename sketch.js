let angle = 0; 
let font;
let points = [];
let msg;
let rx;
let ry;
let h = 3;
let j = 0;
let firstShapeX = 150;
let firstShapeY = 350;
let secondShapeX = 19;
let secondShapeY = 600;
let firstShapeSize = 600;
let secondShapeSize = 400;
let sampleFactor = .8;
let cycle = [
  () => drawOutline(),
  () => drawOutline(),
  () => drawShape(),
  () => applyBlur(4),
  () => drawShape()
]



let shapeColor;
let shapeColor2;
let color1;


function preload() {
  font= loadFont('assets/NanumGothicCoding-Bold.ttf')
   //font= loadFont('assets/SpaceMono-Regular.ttf')
  //font= loadFont('assets/SpaceMono-Bold.ttf')
}



function shapetoPoint(x,y,size,sampleFactor){
  
  points = font.textToPoints(msg,x,y,size,{
   sampleFactor:sampleFactor,
  });
  
  r = 3; //rotate points
  for (let i = 0; i < points.length; i++) 
    { rect(points[i].x + r * sin(angle - i * 100), points[i].y + r * sin(angle - i * 100), rx, ry); }

    noStroke();
    angleMode(DEGREES);
}



function setup() {
  createCanvas(800, 800);
  msg='*';
  rx=4;//rect x
  ry = rx;
  frameRate(6);
}


function draw() {

  background(0);

  function blinking() {

    const num = cycle.length - 1
    
    for (let k = 0; k <= Math.abs(h - num); k++) {
      cycle[k]();
    }
    
    if (h == num*2) {
      if (j == 2) {
        j = 0;
        h = 0;
      } else {
        j++;
      }
    } else {
      h++;
    }
  }

  blinking();

  angle += 10;



  changeShapeColor();

  
	fill(random(256),random(256),random(256),random(50,200));
	noStroke()
	circle(random(mouseX-80,mouseX+80),random(mouseY-80,mouseY+80),random(10,40));
	
  

}

let drawOutline = () => {
  fill(140, 131, 11);
  shapetoPoint(firstShapeX, firstShapeY, firstShapeSize, sampleFactor);
  fill(29,67,74);
  shapetoPoint(secondShapeX, secondShapeY, secondShapeSize, sampleFactor);
}

let drawShape = () => {
  fill(243, 247, 0);
  shapetoPoint(firstShapeX, firstShapeY, firstShapeSize, sampleFactor);
  fill(91,207,231);
  shapetoPoint(secondShapeX, secondShapeY, secondShapeSize, sampleFactor);
}

function applyBlur(strength) {
   for (let i = 0; i < strength; i++) {
    filter(BLUR, 4);
   }
}



function changeShapeColor(){
textSize(430);
shapeColor = ('rgb(243, 247, 0)');
fill(shapeColor);
text('*', 36, 710);

textSize(560);
shapeColor2 = ('rgb(91,207,231)');
fill(shapeColor2);
text('*', 194, 470);
}

function mouseMove(){
changeShapeColor();

shapeColor = color(random(256),random(256),random(256),random(50,200))
noStroke();
circle(random(mouseX-80,mouseX+80),random(mouseY-80,mouseY+80),random(10,40));

}

////
// function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	background(255);
// }

// function draw() {
// 	fill(random(256),random(256),random(256),random(50,200));
// 	noStroke()
// 	circle(random(mouseX-80,mouseX+80),random(mouseY-80,mouseY+80),random(10,40));
	
// }