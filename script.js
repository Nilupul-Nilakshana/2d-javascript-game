// Start Game Function
var startGame = 0;
function keyCheck(event) {
  // Enter Key
  if (event.which == 13) {
    if (runWokerId == 0) {
      startGame = 1;
      score.style.visibility = "visible";
      runSound.play();
      runWokerId = setInterval(run, 100);
      backgroundWorkerId = setInterval(moveBackground, 100);
      scoreWorkerId = setInterval(updateScore, 100);
      createBlockId = setInterval(createBlock, 100);
      moveBlockId = setInterval(moveBlocks, 100);
    }
  }

  // Space Key
  if (event.which == 32) {
    if (startGame == 1) {
      if (jumpWorkerId == 0) {
        clearInterval(runWokerId);
        runSound.pause();
        jumpSound.play();
        jumpWorkerId = setInterval(jump, 100);
      }
    }
  }
}

// Audios

var runSound = new Audio("audios/run.mp3");
runSound.loop = true;
var jumpSound = new Audio("audios/jump.mp3");
var deadSound = new Audio("audios/dead.mp3");

//Run Function
var player = document.getElementById("player");
var runImageCount = 1;
var runWokerId = 0;
function run() {
  runImageCount++;
  if (runImageCount == 9) {
    runImageCount = 1;
  }

  player.src = "images/Run (" + runImageCount + ").png";
}

// Jump Function
var jumpImageCount = 1;
var jumpWorkerId = 0;
var playerMarginTop = 350;
function jump() {
  jumpImageCount++;

  if (jumpImageCount <= 7) {
    playerMarginTop = playerMarginTop - 20;
    player.style.marginTop = playerMarginTop + "px";
  }

  if (jumpImageCount >= 8) {
    playerMarginTop = playerMarginTop + 20;
    player.style.marginTop = playerMarginTop + "px";
  }

  if (jumpImageCount == 13) {
    jumpImageCount = 1;
    clearInterval(jumpWorkerId);
    jumpWorkerId = 0;

    runWokerId = setInterval(run, 100);
    runSound.play();
  }

  player.src = "images/Jump (" + jumpImageCount + ").png";
}

// Move Background Function

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground() {
  backgroundX = backgroundX - 20;
  background.style.backgroundPositionX = backgroundX + "px";
}

// Update Score

var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;
function updateScore() {
  newScore++;
  score.innerHTML = newScore;
}

// Create Blocks
var createBlockId = 0;
var blockMarginLeft = 600;
var blockId = 1;
function createBlock() {
  var block = document.createElement("div");
  block.className = "block";

  block.id = "block" + blockId;
  blockId++;

  var gap = Math.random() * (1000 - 400) + 400;
  blockMarginLeft = blockMarginLeft + gap;
  block.style.marginLeft = blockMarginLeft + "px";

  background.appendChild(block);
}

// Move Blocks
var moveBlockId = 0;
function moveBlocks() {
  for (var i = 1; i <= blockId; i++) {
    var currentBlock = document.getElementById("block" + i);
    var currentMarginLeft = currentBlock.style.marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 20;
    currentBlock.style.marginLeft = newMarginLeft + "px";
    // 237 & 97
    if ((newMarginLeft <= 237) & (newMarginLeft >= 102)) {
      if (playerMarginTop > 310) {
        clearInterval(runWokerId);
        runSound.pause();
        clearInterval(jumpWorkerId);
        jumpWorkerId = -1;
        clearInterval(backgroundWorkerId);
        clearInterval(scoreWorkerId);
        clearInterval(createBlockId);
        clearInterval(moveBlockId);

        deadWorkerId = setInterval(dead, 100);
        deadSound.play();
      }
    }
  }
}

// if(newMarginLeft<=222){
//   if (newMarginLeft>=102) {
//     if(playerMarginTop<=290){
//       if(playerMarginTop>=20){

//       }
//     }
//   }
// }

// Dead Function
var deadImageCount = 1;
var deadWorkerId = 0;
var gameOver = document.getElementById("gameOver");
function dead() {
  deadImageCount++;

  if (deadImageCount == 11) {
    deadImageCount = 10;

    player.style.marginTop = "350px";
    document.getElementById("endScore").innerHTML = newScore;
  }
  player.src = "images/Dead (" + deadImageCount + ").png";
  gameOver.style.visibility = "visible";
}

// Restart Function

function restart() {
  location.reload();
}
