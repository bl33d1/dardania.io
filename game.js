let regions = [];
let map;

let wait = 1000;
let time;


function preload(){
  map = loadImage('assets/kosovomap.png');
}

function setup(){
  createCanvas(500,500);
  
  regions.push(new Region('01',320,230))// 01
  regions.push(new Region('02',230,130))// 02
  regions.push(new Region('03',140,200))// 03
  regions.push(new Region('04',210,370))// 04
  regions.push(new Region('05',310,330))// 05
  regions.push(new Region('06',400,310,true,20,'2'))// 06
  regions.push(new Region('07',110,300,true,20,'1'))// 07

  time = millis();
  
}

function draw(){
  image(map,0,0,500,500)
  //background(100);
  for(let i=0;i<regions.length;i++){
    regions[i].show();
  }

  
 
  let ms = millis();
  if (ms - time >= wait) {
    for(let i = 0; i < regions.length;i++){
      if(regions[i].team){
        regions[i].makeUnits();
      }
    }
    time = millis();
  }
}

let startingRegion;

function mousePressed() {
  for (let i = 0; i < regions.length; i++) {
    if (regions[i].contains(mouseX+20, mouseY+20)) {
      regions[i].select();
      console.log(regions[i].units);
      startingRegion = i;
    }
  } 
}

function mouseReleased(){
  for (let i = 0; i < regions.length; i++) {
    if (regions[i].contains(mouseX+20, mouseY+20) && 
    (regions[startingRegion].id != regions[i].id)) {
      if(regions[i].team  === regions[startingRegion].team){
        regions[i].units = regions[startingRegion].units + regions[i].units;
        regions[startingRegion].units = 0;
        break;
      }else{
        if(regions[startingRegion].units > regions[i].units){
          regions[i].units = abs(regions[startingRegion].units - regions[i].units);
          regions[i].team = regions[startingRegion].team;
          regions[startingRegion].units = 0;
        }else{
          regions[i].units = regions[i].units - regions[startingRegion].units;
        }
      }
      
      regions[startingRegion].units = 0;
    }
  } 
}

function checkForWinner(){
  let winner = false;
  let team = '';
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
