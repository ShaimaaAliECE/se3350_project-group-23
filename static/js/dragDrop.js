$(() => {
  $(".arr").on("drop", handleDrop);
  $(".arr").on("dragover", allowDrop);
  $(".num-slot").on("dragstart", handleDrag);
});

function allowDrop(ev) {
  ev.preventDefault();
}

function handleDrag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function handleDrop(ev) {
  // ev.target is the element that the number was dropped into
  if (ev.target.innerHTML == "") {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let boxID = ev.target.parentElement.id;
    let boxIDindex = boxID.slice(boxID.length - 1);

    console.log(nextArr);
    console.log("Expected val: " + nextArr[curNumIndex]);
    console.log("Detected val: " + Number($(`#${data}`).html()));
    console.log(boxID);
    console.log(boxID.slice(boxID.length - 1));
    //console.log(ev.target.children);

    // If the next number in the array is equal to the number we are dropping in, add it to the box
    //last digit of the targeted box id must also be equal to the array index (ensures element dropped in correct box)
    if (
      nextArr[curNumIndex] === Number($(`#${data}`).html()) &&
      boxIDindex == curNumIndex
    ) {
      curNumIndex++;
      //console.log(curNumIndex);
      ev.target.appendChild(document.getElementById(data));

      //console.log(ev.target);
      //console.log(ev.target.parentElement.id);
      setPosVis(boxID);

      // DISPLAY NEXT EMPTY ROW???
      if (curNumIndex === nextArr.length) {
        curNumIndex = 0;
        getNextRow();
      }
    } else setNegVis(boxID);

    //setPosVis(ev.target.id);

    //     if (ev.target.id == "master9") {
    //       //not real just to test
    //       playWinAudio();
    //       stopTimer();

    //       openWinModal();
    //     } else {
    //       //playPosAudio();
    //     }
    //   } else {
    //     if (ev.target.id.substring(0, 3) == "num") {
    //       //console.log(ev.target.parentElement.id);
    //       //setNegVis(ev.target.parentElement.id);
    //     } else {
    //       //setNegVis(ev.target.id);
    //     }

    //incMistake();
  }
}
