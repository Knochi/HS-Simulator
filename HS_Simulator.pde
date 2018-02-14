
Hex myHex;

void setup() {
  size(800,200);
 myHex = new Hex(400,100,50);
}

void draw(){
   myHex.display();
}

class Hex {
  PShape h;
  float x,y;
  float wdth;
  float ang;
  float h1,y1;
  
  //constructor
  Hex(float xPos, float yPos, float wdth) {
    
    ang=(TWO_PI/360)*30; //30°
    
    h1=(wdth/2)/cos(ang);
    y1=tan(ang)*wdth/2;
    println(ang,h1,y1);
    h = createShape();
    h.beginShape();
    h.noFill();
    h.stroke(0,200,200);
    h.strokeWeight(1);
    h.vertex(xPos+wdth/2,yPos+y1); //1
    h.vertex(xPos+wdth/2,yPos-y1); //2
    h.vertex(xPos,yPos-h1);        //3
    h.vertex(xPos-wdth/2,yPos-y1);        //4
    h.vertex(xPos-wdth/2,yPos+y1);        //5
    h.vertex(xPos,yPos+h1);        //6
    h.endShape(CLOSE);
  }
  void display(){
    shape(h);
  }
  
}

class BattleShip {
  
  int level;
  int[] strengthLvl = {4000, 5000, 6000, 7500, 9000};
  int speed=600; //600 AU/m on all lvls
  int hullStr, hydro, jump, wpnSlots, shldSlots, supSlots;
 
  //set 
  BattleShip(int lvl){
    hullStr=strengthLvl[lvl-1];
    supSlots=lvl-1;
  }
}