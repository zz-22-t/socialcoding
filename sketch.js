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

let shapeColor;
let shapeColor2;
let color1;
let mask;

function preload() {
  font = loadFont("assets/NanumGothicCoding-Bold.ttf");
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

  textSize(420);
  shapeColor2 = "rgb(91,207,231)";
  fill(shapeColor2);
  text("*", 318, 390);
};

mask = () => {
  fill('white');
  circle(300, 350, 600, 600);
};


function starBounce()
 {


 }  

//   clip(mask);


//function mask() {
  
// circle(400, 400, 100, 100);
// circle(200, 600, 200, 200);


// rect(200,200,200,200,10)

//  strokeWeight(10);
// textSize(50)
//}

