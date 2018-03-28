
var BS3img;

var margin = 20;
//sizing
//yellow star sector is 750AU
//red star sector is 450AU
//WZ 400AU (flat sides)

//palette
var greys =[];
var cyans = [];

var totalRows=0;

//static objects
var testHex;
var hexagons = [];
let testBS;

function preload(){
  BS3img = loadImage("/assets/BS_lvl3n.png");
}

function setup() {
  //initialize palletes with 100%, 60% and 20% alpha
  greys = [color('#434446ff'),color('#4344469a'),color('#43444633')];
  cyans = [color('#9bfae0ff'),color('#9bfae09a'),color('#9bfae033')];
  blues = [color('#9fe5fdff'),color('#9fe5fd9a'),color('#9fe5fd33')];
  pinks = [color('#fbb6c7ff'),color('#fbb6c79a'),color('#fbb6c733')];
  yellows = [color('#f7e99bff'),color('#f7e99b9a'),color('#f7e99b33')];
  purples = [color('#ab9addff'),color('#ab9add9a'),color('#ab9add33')];

  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display','block');

  //textSize(32);
 var hexSizePx = 200;
 var hexGap = 3;
  //create static objects
  for (var i=0; i<7;i++){
    hexagons.push(new HexShape(hexSizePx/2+150+margin+i*(hexSizePx+hexGap),margin+75,hexSizePx));
  }
  bPane = new battlePane;
  sulaco=new BattleShip(100,60,2);
  sulaco.weapon=new Battery(5);
  //default drawing settings
  noStroke();

}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

//forever loop
function draw() {
  // put drawing code here
  background(0);

  bPane.display();
  sulaco.display();

 fill(255);
 text(sulaco.weapon.dps + "/" + sulaco.weapon.dps ,80,80);

 for (var i=0; i<hexagons.length;i++){
   hexagons[i].display();
 }
 //image(img,0,0);

}

//battleShip class
class BattleShip {

    constructor(xPos, yPos, lvl=1) {
    var strengths=[0,4000,5000,6000,7500,9000];
    this.level=lvl;
    this.hullStrength=strengths[lvl];
    this.speed=600;
    this.x = xPos;
    this.y = yPos;
    this.scale = 0.25;

    //slots
    this.supportSlots=lvl-1;
    this.weapon=0;
    this.shield=0;
    this.support=[];
  }

  display(){
    push();
    angleMode(DEGREES);
    imageMode(CENTER);
    translate(this.x,this.y);
    rotate(135);
    tint(pinks[0]);
    image(BS3img,0,0,BS3img.width*this.scale,BS3img.height*this.scale);

    pop();
  }
}

class Battery{
  constructor(lvl){
    this.dpsAr = [0,100,120,140,160,180,210,250,285,315,340];
    this.dpsWsAr = [0,600,720,840,960,1080,1260,1500,1800,2100,2400];
    this.level=lvl;
    this.dps=this.dpsAr[lvl]; //damage per second
    this.dpsWS=this.dpsWsAr[lvl]; //damage per hour in WS
    this.rangeAU=120; //range in AU
    this.name="Battery";
  }
}

class Laser{
  constructor(lvl){
    this.minDpsAr = [0,100,120,140,160,180,210,250,285,315,340];
    this.minDpsWsAr = [0,600,720,840,960,1080,1260,1500,1800,2100,2400];
    this.level=lvl;
    this.minDps=this.minDpsAr[lvl]; //minimum damage per second
    this.minDpsWS=this.minDpsWsAr[lvl]; //minimum damage per hour in WS
    this.rangeAU=120; //range in AU
    this.name="Laser";
  }
}

//class for top "battlepane"
function battlePane(){

  this.display = function(){
    push();
    fill(cyans[2]);
    rect(margin,margin,width-2*margin,150);
    pop();
  }

}

//class for creating panes for the ships
function shipPane(){
  this.ship=new battleShip(1);
  this.attitude='mine'; //select mine, friend or enemy
  this.row=totalRows+1;
  //totalRows++;
  this.display = function(expand){
    if (expand){//display expanded view

    }
    else {
      push();
      fill(cyanLight);
      rect(margin,margin,width-2*margin,150);
      pop();
    }
  }
}

function HexShape(x,y,wdth){
  this.x = x;
  this.y = y;
  this.wdth=wdth;

  this.ang = (TWO_PI/360)*30; //30°

  this.h1=(this.wdth/2)/cos(this.ang);
  this.y1=tan(this.ang)*this.wdth/2;

  this.display = function(){
    push();
    noFill();
    stroke(greys[0]);
    strokeWeight(1);
    beginShape();
    vertex(this.x+this.wdth/2,this.y+this.y1); //1
    vertex(this.x+this.wdth/2,this.y-this.y1); //2
    vertex(this.x,this.y-this.h1);        //3
    vertex(this.x-this.wdth/2,this.y-this.y1);        //4
    vertex(this.x-this.wdth/2,this.y+this.y1);        //5
    vertex(this.x,this.y+this.h1);        //6
    endShape(CLOSE);
    pop();
  }

}
