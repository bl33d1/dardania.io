let regions = [];
let map;

let wait = 1000;
let time;

let isClicked = false;
let v0;
let v1;

function preload(){
  map = loadImage('assets/kosovomap.png');
}

function setup(){
  createCanvas(500,500);
  
  regions.push(new Region('01',320,230))// 01
  regions.push(new Region('02',230,130,true,20,'2'))// 02
  regions.push(new Region('03',140,200,true,20,'2'))// 03
  regions.push(new Region('04',210,370,true,20,'2'))// 04
  regions.push(new Region('05',310,330,true,20,'2'))// 05
  regions.push(new Region('06',400,310,true,20,'2'))// 06
  regions.push(new Region('07',110,300,true,20,'1'))// 07

  time = millis();
  
}

function draw(){
  image(map,0,0,500,500)
  //background(100);
  if(checkForWinner()){
    background(255,255,255);
    regions = [];
  }
  for(let i=0;i<regions.length;i++){
    regions[i].show();
  }

  if(mouseIsPressed && v0.x != 0){
    let v1 = createVector(mouseX, mouseY);
    //drawArrow(v0, v1, 'white');
    fill(255)
    strokeWeight(5);
    stroke(255)
    line(v0.x, v0.y, mouseX, mouseY);
    strokeWeight(1);
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
  let x;
  let y;
  for (let i = 0; i < regions.length; i++) {
    if (regions[i].contains(mouseX+20, mouseY+20)) {
      //console.log(regions[i].units);
      startingRegion = i;
      if(regions[i].team){
        x = regions[i].x
        y = regions[i].y
      }
    }
  } 
  
  v0 = createVector(x,y);

}

function mouseReleased(){
  if(!regions[startingRegion].team){
    return;
  }
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
  let team = regions[0].team;
  for(let i = 0; i < regions.length; i++){
    if(regions[i].team != team){
      return false;
    }
  }
  return true;
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  // push();
  // stroke(myColor);
  // strokeWeight(3);
  // fill(myColor);
  // //translate();
  // line(base.x, base.y, vec.x, vec.y);
  // //rotate(vec.heading());
  // //let arrowSize = 15;
  // //translate(vec.mag() - arrowSize, 0);
  // //triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  // pop();
}
