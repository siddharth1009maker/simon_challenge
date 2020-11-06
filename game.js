var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var i=0;
var randomChosenColour;
var started=false;
$(document).keydown(function(){
    if(!started)
    {
        $("#level-title").html("Level"+ " " + i);
        nextSequence();
        started=true;
    }
})
function nextSequence()
{
    userClickedPattern = [];

    i++;
    $("#level-title").text("Level " + i);
    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name)
{
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },100);
        }
    }
    else
    {
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver() {
    i = 0;
    gamePattern = [];
    started = false;
  }
  
