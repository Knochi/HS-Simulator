var x=0;

function setup() {
  // put setup code here
  createCanvas(600,400);
  line(15,25,70,90);
}

function draw() {
  // put drawing code here
  ellipse(x, height/2, 20, 20);
  x = x+1;
}

//battleShip class
function battleShip(lvl) {
  var strengths=[]
  this.level=lvl;
  this.hullStrength=500;
  this.speed=600;

  //slots
  this.weaponSlots=1;
  this.shieldSlots=1;
  this.supportSlots=0;

  
};

function battery(lvl){
  var dpsAr = [0,100,120,140,160,180,210,250,285,315,340];
  var dpsWsAr = [0,600,720,840,960,1080,1260,1500,1800,2100,2400];
  this.level=lvl;
  this.dps=dpsAr[lvl]; //damage per second
  this.dps.ws=dpsWsAr[lvl]; //damage per hour in WS
  this.range=120; //range in AU

}
