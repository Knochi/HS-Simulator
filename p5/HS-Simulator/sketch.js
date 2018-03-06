
var BS3img;

var margin = 20;
//palette
var greys =[];
var cyan;
var cyanLight;

var totalRows=0;

//static objects
var testHex;
var hexagons = [];

let testBS;

function preload(){
  BS3img = loadImage("/assets/BS_lvl3.png");
}

function setup() {
  //initialize palletes with 100%, 60% and 20% alpha
  greys = [color('#434446ff'),color('#4344469a'),color('#43444633')];
  cyan = color('#434446');

  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display','block');

  //setup color palette
  cyan = color(255,204,0);
  cyanLight = color('#a9edd833');
  testHex = new HexShape(350,margin+75,150);
  //textSize(32);

  //create static objects
  for (var i=0; i<5;i++){
    hexagons.push(new HexShape(230/2+150+margin+i*235,margin+75,230));
  }

  //default drawing settings
  noStroke();

}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function draw() {
  // put drawing code here
  background(0);
  bPane = new battlePane;
  bPane.display();

  sulaco=new BattleShip(600,100,2);
  sulaco.weapon=new Battery(5);
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

    //slots
    this.supportSlots=lvl-1;
    this.weapon=0;
    this.shield=0;
    this.support=[];
  }

  display(){
    push();
    angleMode(DEGREES);
    translate(this.x+BS3img.height/8,this.y-BS3img.width/8);
    rotate(45);
    //tint(greys[0]);
    image(BS3img,0,0,BS3img.width/8,BS3img.height/8);
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
    fill(cyanLight);
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
