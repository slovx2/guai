var g_Interval = 10;
var g_Timer;
var running = false;
var teamA;
var teamB;
var teamC;

var currentTeam;
var currentTrigger;
var currentNum;

var teamName;
var BType;

window.onload = function() {
    teamA = A.split('\n');
    teamB = B.split('\n');
    teamC = C.split('\n');
};

function beginRndNum(trigger){
    if (running) {
        if (currentTrigger != trigger) return;
        currentTeam.splice(currentNum, 1);
        running = false;
        clearTimeout(g_Timer);
        $('#ResultNum').css('color','red');
        if (BType == 1) {
            $(trigger).css('background','url(images/top01.png) no-repeat');
        } else if (BType == 2) {
            $(trigger).css('background','url(images/top02.png) no-repeat');
        } else if (BType == 3) {
            $(trigger).css('background','url(images/top03.png) no-repeat');
        }
    }
    else {
        currentTrigger = trigger;
        running = true;
        teamName = trigger.id.charAt(0);
        BType = trigger.id.charAt(1);
        if (teamName == 'A') {
            currentTeam = teamA;
        } else if (teamName == 'B') {
            currentTeam = teamB;
        } else if (teamName == 'C') {
            currentTeam = teamC;
        }
        $('#ResultNum').css('color','black');
        $(trigger).css('background','url(images/stop.png) no-repeat');
        $(trigger).css('background-position','center');
        beginTimer();
    }
}

function updateRndNum(team){
    var num = Math.floor(Math.random() * team.length + 1);
    $('#ResultNum').html(team[num]);
    currentNum = num;
}

function beginTimer(){
    g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
    g_Timer = setTimeout(beat, g_Interval);
    updateRndNum(currentTeam);
}
