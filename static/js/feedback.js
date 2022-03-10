/*
    Counter Logic
*/

//counter to track mistakes
let counter = 0; 

//Increment counter
function incrementCounter(){
    counter ++; //Increase counter variable by 1
}

function decrementCounter(){
    counter --; //Decrease counter variable by 1
}

function getCounter(){
    return counter;
}

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

//if 3 mistakes have been made, show the loss window 
function checkIncorrect(num) {
    //If user makes 3 mistakes
    if (num >= 3)
    {
        //Opens loss modal
        openLossWindow();
        playGameOverAudio();
    }
} 

//shows the pop up window 
function openLossWindow() {
    $('#loss-modal').modal('show');
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