let angle = 0;
let font;
let points = [];
let msg;
let rx;
let ry;
let h = 3;
let j = 0;
let firstShapeX = 250;
let firstShapeY = 350;
let secondShapeX = 300;
let secondShapeY = 600;
let firstShapeSize = 600;
let secondShapeSize = 400;
let sampleFactor = 0.8;
let cycle = [
  () => drawOutline(),
  () => drawOutline(),
  () => drawShape(),
  () => applyBlur(4),
  () => drawShape(),
  () => clip(mask),
]

var texts = [];

let shapeColor;
let shapeColor2;
let color1;
let mask;

function preload() {
  font = loadFont("Open_Sans/OpenSans-VariableFont_wdth,wght.ttf");
}

function shapetoPoint(x, y, size, sampleFactor) {
  points = font.textToPoints(msg, x, y, size, {
    sampleFactor: sampleFactor,
  });

  r = 3; //rotate points
  for (let i = 0; i < points.length; i++) {
    rect(
      points[i].x + r * sin(angle - i * 100),
      points[i].y + r * sin(angle - i * 100),
      rx,
      ry
    );
  }

  noStroke();
  angleMode(DEGREES);
}

function setup() {
  createCanvas(800, 800);
  msg = "*";
  rx = 4; //rect x
  ry = rx;
  frameRate(100);
}

function draw() {
  background('black');

  //this draws and updates the texts array
  for(var i=0; i<texts.length; i++){
    texts[i].display();
    texts[i].move();
  }

  blinking();

  erase();
  textSize(560);
  text("*", 290, 470);  
  textSize(430);
  text("*", 320, 710)
  noErase();

  changeShapeColor();

  fill(random(256),random(256),random(256),random(50,200));
  noStroke();
  circle(random(mouseX-80,mouseX+80),random(mouseY-80,mouseY+80),random(10,40));
  
}

let drawOutline = () => {
  fill(140, 131, 11);
  shapetoPoint(firstShapeX, firstShapeY, firstShapeSize, sampleFactor);
  fill(29, 67, 74);
  shapetoPoint(secondShapeX, secondShapeY, secondShapeSize, sampleFactor);
};

let drawShape = () => {
  fill(243, 247, 0);
  shapetoPoint(firstShapeX, firstShapeY, firstShapeSize, sampleFactor);
  fill(91, 207, 231);
  shapetoPoint(secondShapeX, secondShapeY, secondShapeSize, sampleFactor);
};

let applyBlur = (strength) => {
  for (let i = 0; i < strength; i++) {
    filter(BLUR, 4);
  }
};

function blinking() {
  const num = cycle.length - 1;

  for (let k = 0; k <= Math.abs(h - num); k++) {
    cycle[k]();
  }

  if (h == num * 2) {
    if (j == 2) {
      j = 0;
      h = 0;
    } else {
      j++;
    }
  } else {
    h++;
  }

  angle += 10;
}

function changeShapeColor() {
textSize(230);
shapeColor = "rgb(243, 247, 0)";
fill(shapeColor);
text("*", 358, 595);

// textSize(420);
// shapeColor2 = "rgb(91,207,231)";
// fill(shapeColor2);
// text("*", 318, 390);
};

mask = () => {
  fill('white');
  circle(300, 350, 600, 600);
};


function mouseClicked(){
  texts.push(new TextObj(mouseX, mouseY));
}



function TextObj(theX, theY){
  
  
  this.x = theX;
  this.y = theY;
  this.text = "p5js"
  this.size = random(20, 50, 75);
  
  
  //METHODS for the object
  
  //display() draws the object
  this.display = function(){
   	stroke('darkcyan');
    strokeWeight(3);
    // fill(random(256),random(256),random(256),random(50,200))
    textSize(this.size);
    text(this.text, this.x, this.y);
  }
  
  //move() adds the textoject
  this.move = function(){
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }

   
}//end texts

//   clip(mask);


//function mask() {
  
// circle(400, 400, 100, 100);
// circle(200, 600, 200, 200);


// rect(200,200,200,200,10)

//  strokeWeight(10);
// textSize(50)
//}