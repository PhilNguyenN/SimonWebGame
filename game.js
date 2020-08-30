var buttonColor = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level;
var currentLevel;
var isStarted = false;

$("body").keydown(function (e) {
    if (isStarted == false){
        isStarted = true;
        level = 0;
        currentLevel = 0;
        userClickedPattern = [];
        gamePattern = [];
        nextSequence();
    }
});

$(".btn").click(function () {
    var idClicked = $(this).attr("id");
    userClickedPattern.push(idClicked);
    currentLevel = userClickedPattern.length;
    console.log(currentLevel)
    console.log(userClickedPattern)
    animatePressed(idClicked);
    checkAnswer(currentLevel);
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level = level + 1;
    $("h1").text("Level " + level);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel - 1] == userClickedPattern[currentLevel - 1]) {
        console.log("success");
        if (currentLevel == level) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        } else {
            currentLevel += 1;
        }

    } else {
        console.log("wrong");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").keydown(function () {
           starOver();
        });
    }
};

function starOver() {
    isStarted = false;
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePressed(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");}, 100);
    playSound(currentColor);
}