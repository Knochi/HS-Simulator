
function setup() {
  // put setup code here
  createCanvas(1024 ,768);
  background(0);
  sulaco=new battleShip(2);
  sulaco.weapons[0]=new battery(5);
  sulaco.display(40,40);
  //textSize(32);
  //noStroke();

}

function draw() {
  // put drawing code here
  fill(255);
 text(sulaco.weapons[0].dps,80,80);
 ellipse(130,130,80);
}

//battleShip class
function battleShip(lvl) {
  var strengths=[]
  img = loadImage("assets/BS_lvl3.png");
  this.level=lvl;
  this.hullStrength=500;
  this.speed=600;

  //slots
  this.weaponSlots=1;
  this.shieldSlots=1;
  this.supportSlots=0;
  this.weapons=[];

  this.display = function(x, y){
    image(img,x,y);
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
