
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []

var userClickedPattern = []

var start = false;

var level = 0;

$(document).keypress(function() {
    if(!start) {
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
    }
})

function checkAnswer(currentLevel) {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
      }
}

function startOver() {
    level = 0;
    start = false;
    gamePattern = [];
}

function nextSequence() {
    userClickedPattern = []
    level++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    palySound(randomChosenColour)
}

$(".btn").on("click", clickHandler);


function clickHandler() {
    var userChosedColour = $(this).attr("id");
    userClickedPattern.push(userChosedColour);

    palySound(userChosedColour);

    animatePress(userChosedColour);

    checkAnswer(userClickedPattern.length-1);
}

function palySound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {      
        $("#" + currentColour).removeClass("pressed");         
    }, 100);
}