
var database, locChild, balloon;

function preload(){

  balloonAnimation=loadImage("images/Hot Air Ballon-02.png");
  bg=loadImage("images/Hot Air Ballon-01.png");
}

function setup() {
  createCanvas(1300,1000);
  database = firebase.database();
  var locChild=database.ref("balloon/pos");
  locChild.on("value",readOp,showError);

  balloon = createSprite(300,300,50,50);
  balloon.addImage(balloonAnimation);
  balloon.scale= 0.7;

}

function draw() {
  background(bg);

  textSize(20);
  text("Use Arrow Keys to Move the Balloon",10, 50)
    
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    
    database.ref("balloon/pos").set({
        x: balloon.x+x,
        y: balloon.y+y
    })
    
    balloon.x = balloon.x + x;
    balloon.y = balloon.y + y;
}

function readOp(data){

    position = data.val()
    balloon.x = position.x
    balloon.y = position.y

}

function showError(){
    console.log("error");
}