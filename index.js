var sysPattern = [];
var userPattern = [];
var isFirstkey = 1;
var level = 0;

//Checking First keyboard Press

$(document).on("keypress",function() {
    if(isFirstkey === 1) {
        $("h1").text("Level "+(level+1));
        nextLevel();
        isFirstkey = 3;
        ++level;
    } else if(isFirstkey === 2) {
        $("h1").text("Press Any key to start");
            sysPattern = [];
            userPattern = [];
            isFirstkey = 1;
            level = 0;
            window.console.log("Restart");
    } 
    
    else {
        window.console.log("no key");
    }
});

//Listening button clicks

$(".btn").click(function() {
    var chosenbtn = $(this).attr("id");
    userPattern.push("#" + chosenbtn);
    playSound(chosenbtn);
    btnAnimate(chosenbtn);
    if (level === 0) { window.console.log("First Press Any Key to start.");userPattern=[];level=0;}
    else {checkPattern();}
});

//System Functions

function nextLevel() {
    var randomNumber = Math.floor(Math.random()*4)+1;
    sysPattern.push("#btn" + randomNumber);
    playSound("btn" + randomNumber);
    btnAnimate("btn" + randomNumber);
}

function playSound(num) {
    var audio = new Audio("Sounds/" + num + ".mp3");
    audio.play();
}

function btnAnimate(rnum) {
    $("#" + rnum).addClass("pressed");
    $("#" + rnum).fadeOut(100).fadeIn(100);
    setTimeout(function(){$("#" + rnum).removeClass("pressed");},100);
}

function checkPattern() {
    var counter = 0;
    var xcounter = 0;
    for(var i=0; i<userPattern.length; i++) {
        if(sysPattern[i] === userPattern[i]) {
            counter = counter+1;
        } else { xcounter = xcounter+1; }
    }
    if(xcounter > 0) {
        $("h1").text("Game Over! Press any key to restart.");
        playSound("wrong");
        isFirstkey = 2;
    } else if(counter === sysPattern.length && xcounter === 0) {
        level++;
        window.console.log("Completed");
        $("h1").text("Level "+level);
        userPattern = [];
        setTimeout(nextLevel,1000);
    } else {
        window.console.log("Keep Going");
    }
}