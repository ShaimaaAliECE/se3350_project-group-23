
/* Visual */
function setPosVis(id) {
    //let el = $(`#arr-row-${id}`).children();
    let el = $(`#${id}`);
    el.css('background-color', "lightgreen");
    //setTimeout("revertVis(" + id + ")", 1000);
    //console.log(id);

    //let el = $(`#arr-row-${id}`).children();

    //sets intial element colour to green
    //el.css("background-color", "lightgreen");

    //timer set to keep element green for 1sec
    setTimeout(() => {
        el.css("background-color", "");
    }, 1000);
}

function setNegVis(id) {
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