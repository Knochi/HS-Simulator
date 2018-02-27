
var BS3img;

var margin = 20;
//palette
var cyan;
var cyanLight;

var totalRows=0;

function preload(){
  BS3img = loadImage("/assets/BS_lvl3.png");
}

function setup() {
  // put setup code here
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display','block');

  //setup color palette
  cyan = color(255,204,0);
  cyanLight = color('#a9edd833');

  //textSize(32);
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

  sulaco=new battleShip(2);
  sulaco.weapons[0]=new battery(5);
  sulaco.display(100,50);
  angleMode(DEGREES);

 fill(255);
 text(sulaco.weapons[0].dps,80,80);
 ellipse(130,130,80);
 //image(img,0,0);

}

//battleShip class
function battleShip(lvl) {
  var strengths=[0,4000,5000,6000,7500,9000];
  this.level=lvl;
  this.hullStrength=strengths[lvl];
  this.speed=600;

  //slots
  this.weaponSlots=1;
  this.shieldSlots=1;
  this.supportSlots=lvl-1;
  this.weapons=[];
  this.shield=0;
  this.support=[];

  this.display = function(x, y){
    push();
    translate(x+BS3img.height/8,y-BS3img.width/8);
    rotate(PI/2);
    image(BS3img,0,0,BS3img.width/4,BS3img.height/4);
    pop();
  }


}

function battery(lvl){
  var dpsAr = [0,100,120,140,160,180,210,250,285,315,340];
  var dpsWsAr = [0,600,720,840,960,1080,1260,1500,1800,2100,2400];
  this.level=lvl;
  this.dps=dpsAr[lvl]; //damage per second
  this.dps.ws=dpsWsAr[lvl]; //damage per hour in WS
  this.range=120; //range in AU
  this.name="Battery";
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
  totalRows++;
  this display = function(expand){
    if (expand){//display expanded view

    }
    else {

    }
  }
}
