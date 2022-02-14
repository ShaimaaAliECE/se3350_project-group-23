
//Visual Feedback
//Sets box colour green to indicate correct
function setPosVis(id) {
    $('#' + id).css('background-color', "lightgreen");
    setTimeout("revertVis(" + id + ")", 1000);
}
//Sets box colour red to indicate incorrect 
function setNegVis(id) {
    $('#' + id).css('background-color', "red");
    setTimeout("revertVis(" + id + ")", 1000);
}
//Set box colour back to original 
function revertVis(target) {
    $('#' + target.id).css('background-color', "");
}