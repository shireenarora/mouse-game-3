
var mouse
var cat;
var cheese;
var yarn;
var mousetrap;
var bg, mouseImg, catImg, cheeseImg, yarnImg, mousetrapImg,deadmouseImg, deadcatImg;
var edges;
var x,y,x1,y1
var yarnGroup
var cheeseGroup
var life
var score = 0
var inv_ground
var cat_life
var gamestate = "play"


var restartImg, gameOverImg
var restart, gameOver


function preload()
{
  bg = loadImage("floor1.webp")
  mouseImg = loadImage("mouse.png")
  catImg = loadImage("cat.png")
  cheeseImg = loadImage("cheese.png")
  yarnImg = loadImage("yarn.png")
  mousetrapImg = loadImage("mousetrap.jpg")
  deadcatImg = loadImage("deadcat.png")
  deadmouseImg = loadImage("deadmouse.png")
  gameOverImg = loadImage("gameoverImg.png")
  restartImg = loadImage("restartImg.png")
}
function setup() {
  createCanvas(800,400);
  edges = createEdgeSprites()

  mouse = createSprite(width-50, height-250, 30,30)
  mouse.addImage("live",mouseImg)
  mouse.addImage("dead",deadmouseImg)
  mouse.changeImage("live");
  mouse.scale = 0.2;
  mouse.debug = true;
  mouse.setCollider("rectangle", 0, 0, 300, 290 )

  cat = createSprite(width -255, height-150, 30 , 30)
  cat.addImage("alive",catImg)
  cat.addImage("dead",deadcatImg)
  cat.changeImage("alive")
  cat.scale = 0.5
  cat.velocityX = -3

  inv_ground = createSprite(0, height-100, 2*width, 10)
  inv_ground.visible = false

  restart = createSprite(width/2,height/2)
  restart.addImage(restartImg);
  restart.visible = false;

  gameOver = createSprite(width/2 - 100, height/2 - 100)
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart.scale = 0.2
  gameOver.scale = 0.2


  yarnGroup = new Group()
  cheeseGroup = new Group()

  life = 100
  cat_life = 100
  


  
}

function draw() {
  background(0);  
  //image(bg, 0,0, width, height);
  textSize(50)
  fill(255,255,255)
  text("Life: "+life, 0, 45);

  //-------------PLAY--------------//
  if(gamestate === "play"){
    if(keyDown(LEFT_ARROW))
    {
      mouse.x -=5
    }
  
    if(keyDown("space")){
      mouse.velocityY = -3
    }
    // if (mouse.velocityY <= 0){
      mouse.velocityY += 0.1
    // }
    if(cat.x <= -20){
      cat.x = 760
    }
    // if(mouse.x <= -20){
    //   mouse.x = 780
    // }
    if(yarnGroup.isTouching(mouse)){
      yarnGroup[0].destroy()
      life -= 25
    }
    
    mouse.bounceOff(edges[3])
    mouse.bounceOff(edges[2])
  
    mouse.collide(inv_ground)
    
    spawnYarn()
    spawnCheese()

    if(cheeseGroup.isTouching(mouse)){
      life += 20
    }
    if(life > 100){
      life = 100
    }
    if(life < 0){
      life = 0
    }
    if(cat.isTouching(mouse)){
      cat_life -= 25
      
    }
    if(cat_life <= 0){
      cat.changeImage("dead")
      gamestate = "win"
    }
    if(life <= 0){
      mouse.changeImage("dead")
      gamestate = "lose"
    }

  }

  //------WIN-------
  if(gamestate === "win"){
    swal({
      title:"You Won",
      text:"Congartulations",
      imageUrl:"https://media.tenor.com/kvnzt12mZ00AAAAC/congratulations-mickey.gif",
      imageSize:"250x250",
      confirmButtonText:"Play Again"
    },
    function(isConfirm){
     if(isConfirm){
      window.location.reload()
     }
    }
    )
  }
  
  if(gamestate  === "lose"){
    swal({
      title: "You lose!",
      text: "Better luck next time!",
      imageUrl:"https://media.tenor.com/mAWHNBIvmP4AAAAC/cat-kitten.gif",
      imageSize: "250x250",
      confirmButtonText: "Play Again"
    },
    function(isConfirm){
      if(isConfirm){
        window.location.reload()
      }
    }
    )
    
  }


  drawSprites();
}


function spawnYarn()
{
  if(frameCount % 60 === 0){
    x = Math.round(random(10,700))
    y = Math.round(random(10,450))
    yarn = createSprite(x,y,30,30)
    yarn.addImage(yarnImg)
    yarn.scale = 0.2
    yarn.lifetime = 20
    yarnGroup.add(yarn)
  }

}
function spawnCheese()
{
  if(frameCount % 80 === 0){
    x1 = Math.round(random(10,700))
    y1 = Math.round(random(10,450))
    cheese = createSprite(x1,y1,30,30)
    cheese.addImage(cheeseImg)
    cheese.scale = 0.2
    cheese.lifetime = 25
    cheeseGroup.add(cheese)
  }
}