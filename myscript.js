var rocketID = 0;
var rocketRemoveCount = 0;
var interval;
var isJumping = false;
var crashCount = 0;

$(function() {
    var interval = setInterval(createRocket, 1000);
    var count = 0;
    backStart();

    setInterval(checkGame, 500);

    $("#jumpButton").on("click",function(){
        if (!isJumping) { 
            isJumping = true; 
            $("#mario").animate({
                top: '200px'
            }, 300, function() {
                $(this).animate( {
                    top: '375px'
                }, 300, function() {
                    isJumping = false;
                });
            });
        }
    });    
    $("#stopButton").on("click", function() { clearInterval(interval);  }); 
});

function rectinrect(rect1, rect2) {
    if (
        rect1.x1 < rect2.x2 &&
        rect1.x2 > rect2.x1 &&
        rect1.y1 < rect2.y2 &&
        rect1.y2 > rect2.y1
    ) {
        return true; 
    } else {
        return false; 
    }
}

function checkGame() {
    for(var index = rocketRemoveCount; index < rocketID; index++) {
        console.log("check");
        var x = parseInt($("#rocket" + index).css("left").replace("px",""));
        if(x<=-100) {
            console.log("rocket" + index + "removed");
            $("#rocket" + index).remove();
            rocketRemoveCount++;
        }
        var marioRect = {
            x1: parseInt($("#mario").css("left").replace("px", "")) + 20, 
            y1: parseInt($("#mario").css("top").replace("px", "")) + 20, 
            x2: parseInt($("#mario").css("left").replace("px", "")) + $("#mario").width() - 20, 
            y2: parseInt($("#mario").css("top").replace("px", "")) + $("#mario").height() - 20 
        };
        var rocketRect = {
            x1: parseInt($("#rocket" + index).css("left").replace("px", "")),
            y1: parseInt($("#rocket" + index).css("top").replace("px", "")),
            x2: parseInt($("#rocket" + index).css("left").replace("px", "")) + $("#rocket" + index).width(),
            y2: parseInt($("#rocket" + index).css("top").replace("px", "")) + $("#rocket" + index).height()
        };
        if (rectinrect(marioRect, rocketRect)) {
            crashCount++;

            if(crashCount >=3) {
                endGame();
                break;
            }
            
        }
    }
}
function createRocket() {
    $("#outterBox").append("<div id='rocket" + rocketID + "' class='rocketStyle'>" +
                            "<img src='a.png' width='100%' height='100%'>" +
                            "</div>");
    $("#rocket" + rocketID).animate({
        left: '-100px'
    },3000);
    rocketID++;
}

function backStart() {
    $("#background1").css("left", "0px");
    $("#background1").animate({
        left: '-1000px'
    },5000, "linear", backStart);
}

function endGame() {
    clearInterval(interval);
    alert("게임 종료!");
}