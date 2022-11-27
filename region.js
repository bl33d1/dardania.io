function Region(id,x, y, occupied, units,team){
  this.id = id;
  this.x = x;
  this.y = y;
  this.w = 40;
  this.units = units || 22;
  this.occupied = occupied;
  this.selected = false;
  this.team = team;

  this.show = () => {
    stroke(0);
    
    if(this.team){
      strokeWeight(3);
    }
    if(this.team === '1'){
      fill(255,0,255);
    }else if(this.team === '2'){
      fill(255,255,0);
    }else{
      fill(255,255,255);
    }
    ellipse(this.x, this.y, this.w, this.w);
    strokeWeight(1);
    stroke(255);

    fill(0)
    noStroke()
    textStyle(BOLD);
    textSize(15)
    text(this.units, this.x - 7, this.y + 35);

    // if(this.team){
    //   this.makeUnits();
    // }
  }

  this.contains = (x, y) => {
    if(x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w){
      return true;
    }
  }

  this.select = () => {
    this.selected = !this.selected;
  }

  this.makeUnits = () => {
    this.units += 1;
  }
}