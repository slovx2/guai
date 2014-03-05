var g_Interval = 10;
var g_Timer;
var running = false;
var teamA, teamB, teamC;
var countA = 0, countB = 0, countC = 0;
var tempA = 0, tempB = 0, tempC = 0;

var currentTeam;
var currentTrigger;
var currentNum;
var currentCount;

var teamName;

var result;

window.onload = function() {
    teamA = A.split('\n');
    teamB = B.split('\n');
    teamC = C.split('\n');
};

function beginRndNum(trigger){
    if (running) {
        if (currentTrigger != trigger) return;
        console.log(currentNum);
        if (teamName == 'A') {
            $('#numA').text('' + ++countA);
            $('#tempA').text('' + ++tempA);
        } else if (teamName == 'B') {
            $('#numB').text('' + ++countB);
            $('#tempB').text('' + ++tempB);
        } else if (teamName == 'C') {
            $('#numC').text('' + ++countC);
            $('#tempC').text('' + ++tempC);
        }
        $('#text').text($('#text').text() + result + '\n');
        var ta = document.getElementById('text');
        ta.scrollTop = ta.scrollHeight;
        currentTeam.splice(currentNum, 1);
        running = false;
        clearTimeout(g_Timer);
        $('#ResultNum').css('color','red');
        $(trigger).css('background','url(images/top01.png) no-repeat');
    }
    else {
        currentTrigger = trigger;
        running = true;
        teamName = trigger.id;
        if (teamName == 'A') {
            currentTeam = teamA;
            currentCount = countA;
        } else if (teamName == 'B') {
            currentTeam = teamB;
            currentCount = countB;
        } else if (teamName == 'C') {
            currentCount = countC;
            currentTeam = teamC;
        }
        $('#ResultNum').css('color','black');
        $(trigger).css('background','url(images/stop.png) no-repeat');
        $(trigger).css('background-position','center');
        beginTimer();
    }
}

function updateRndNum(team){
    var temp;
    var num;
    while (!temp) {
        num = Math.floor(Math.random() * team.length + 1);
        temp = team[num]
    }
    result = temp;
    $('#ResultNum').html(result);
    currentNum = num;
}

function beginTimer(){
    g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
    g_Timer = setTimeout(beat, g_Interval);
    updateRndNum(currentTeam);
}

function clearReco() {
    $('#text').text("");
    tempA = 0;
    tempB = 0;
    tempC = 0;
    $('#tempA').text('0');
    $('#tempB').text('0');
    $('#tempC').text('0');
    $('#ResultNum').text('');
}
