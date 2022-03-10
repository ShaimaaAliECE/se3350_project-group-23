// Executes when the script loads
$(() => {
    // When the document loads, the timer starts
    $('#stopwatch').on('load', startTimer());
});

//When the mouse is moved or clicked down anywhere on the doc the inactive timer resets
$(document).mousemove(() => {
    resetTimeoutTimer();
});
$(document).mousedown(() => {
    resetTimeoutTimer();
});

var hr = 0;
var min = 0;
var sec = 0;
var runtimer = false;

var timeout;

/* Run Time Timer */
// Functions to start and stop the timer
function startTimer() {
    if (!runtimer) {
        runtimer = true;
        // allows timer to start from 0 instead of 1
        setTimeout("timerCycle()", 1000);
    }
}
// May not need bt added for later functionality
function stopTimer() {
    if (runtimer) {
        runtimer = false;
    }
}

// Cycles every second and increments up run timer and formats stopwatch
function timerCycle() {
    if (runtimer) {

        sec++;
        timeout++;



        if (sec == 60) {
            min = min + 1;
            sec = 0;

            if (min == 60) {
                hr = hr + 1;
                min = 0;
            }
        }

        //300 seconds = 5 minutes
        if (timeout == 300) {
            sendHome();
        }


        // Updates the timer display
        $('#timer').html(getFormattedTime());

        console.log(timeout);

        // Executes the function again after 1 second
        // setTimeout("timerCycle()", 1000);
        setTimeout("timerCycle()", 1000);
    }
}

// Resets the timer display to 00:00:00 DONT NEED
function resetTimer() {
    hr = 0;
    min = 0;
    sec = 0;
    $('#stopwatch').html('00:00:00');
}

//Stops the timer and than resets it and runs it. will have slight error of up to 1 sec DONT NEED
function restartTimer() {
    stopTimer();

    hr = 0;
    min = 0;
    sec = 1; // sets to 1 since once timer starts it will be a second behind

    $('#stopwatch').html('00:00:00');

    setTimeout('startTimer()', 1000);
}

//Converts to a time to seconds for comparisons
function toSeconds() {
    return hr * 3600 + min * 60 + sec
}

function getFormattedTime() {
    return (hr < 10 ? '0' + hr : hr) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
}


/* Inactivity Timer Functions */
function resetTimeoutTimer() {
    // clearTimeout(timeout);
    // timeout = setTimeout('sendHome()', 5*60*1000); //5 min
    timeout = 0;
}

function sendHome() {
    //Change to request to log game and then redirect home
    window.location.href = "/";
}