var g_Interval = 10;
var g_Timer;
var running = false;
var teamA;
var teamB;
var teamC;

window.onload = function() {
    teamA = A.split('\n');
};

function beginRndNum(trigger){
    if(running){
        running = false;
        clearTimeout(g_Timer);
        $(trigger).val("开始");
        $('#ResultNum').css('color','red');
    }
    else{
        running = true;
        $('#ResultNum').css('color','black');
        $(trigger).val("停止");
        beginTimer();
    }
}

function updateRndNum(team){
    var num = Math.floor(Math.random() * team.length + 1);
    $('#ResultNum').html(team[num]);
}

function beginTimer(){
    g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
    g_Timer = setTimeout(beat, g_Interval);
    updateRndNum(teamA);
}
