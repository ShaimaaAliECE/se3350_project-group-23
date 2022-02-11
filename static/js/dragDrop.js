$(() => {
  $(".arr").on("drop", handleDrop);
  $(".arr").on("dragover", allowDrop);
  $(".num-slot").on("dragstart", handleDrag);
});

function allowDrop(ev) {
  ev.preventDefault();
}

function handleDrag(ev) {
  ev.originalEvent.dataTransfer.setData("text", ev.target.id);
}

function handleDrop(ev) {
  // ev.target is the element that the number was dropped into
  if (ev.target.innerHTML == "") {
    ev.preventDefault();
    var data = ev.originalEvent.dataTransfer.getData("text");

    ev.target.appendChild(document.getElementById(data));
    setPosVis(ev.target.id);

    if (ev.target.id == "master9") {
      //not real just to test
      playWinAudio();
      stopTimer();

      openWinModal();
    } else {
      playPosAudio();
    }
  } else {
    if (ev.target.id.substring(0, 3) == "num") {
      //console.log(ev.target.parentElement.id);
      setNegVis(ev.target.parentElement.id);
    } else {
      setNegVis(ev.target.id);
    }

    incMistake();
  }
}
