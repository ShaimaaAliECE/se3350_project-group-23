
/* Visual Feedback*/
function setPosVis(id) {
    //sets background of box to green
    let el = $(`#${id}`);
    el.css('background-color', "lightgreen");
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

//Audio feedback
function ()