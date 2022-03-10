
/* Visual Feedback*/
function setPosVis(id) {
    //sets background of box to green
    let el = $(`#${id}`);
    el.css('background-color', "lime");
    //timer set to keep element green for 1sec
    setTimeout(() => {
        el.css("background-color", "");
    }, 1000);
}

function setNegVis(id) {
    //sets background of box to red
    let el = $(`#${id}`);
    el.css('background-color', "red");
    //timer set to keep element red for 1sec
    setTimeout(() => {
        el.css("background-color", "");
    }, 1000);
}

function revertVis(id) {
    $(`#${id}`).css('background-color', "");
}

//if 3 mistakes have been made, show the window 
function checkIncorrect(num) {
    if (num >= 3)
    {
        openWindow();
    }
} 



/* Audio Feedback */ 

//Gameover
function playGameOverAudio(){
    let gameOverAudio = new Audio('../audio/game_over.wav');    //Referencing gameover sound
    gameOverAudio.play();                                       //Playing audio
}

//Win
function playWinAudio(){
    let winAudio = new Audio('../audio/game_win.wav');          //Referencing gameover sound
    winAudio.play();                                            //Playing audio
}

//Right Move
function playRightMoveAudio(){
    let rightMoveAudio = new Audio('../audio/right_move.wav');  //Referencing gameover sound
    rightMoveAudio.playbackRate = 2                             //Adjusting playback rate
    rightMoveAudio.play();                                      //Playing audio
}

//Wrong Move
function playWrongMoveAudio(){
    let wrongMoveAudio = new Audio('../audio/wrong_move.wav');  //Referencing gameover sound
    wrongMoveAudio.playbackRate = 2                             //Adjusting playback rate
    wrongMoveAudio.play();                                      //Playing audio
}