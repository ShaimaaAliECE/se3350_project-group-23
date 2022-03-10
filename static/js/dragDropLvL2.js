console.log('1', Date.now());

//counter to track mistakes
let counter = 0; 

window.addEventListener("load", () => {
  console.log('2', Date.now());
  $(".arr").on("drop", handleDrop);
  $(".arr").on("dragover", allowDrop);
  $(".num-slot").on("dragstart", handleDrag);
});

function allowDrop(ev) {
  ev.preventDefault();
}

function handleDrag(ev) {
  ev.dataTransfer.setData("text", ev.currentTarget.id);
  console.log(ev.currentTarget);
}

function handleDrop(ev) {
  // ev.target is the element that the number was dropped into
  if (ev.currentTarget.innerHTML == "") {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let boxID = ev.currentTarget.id;
    let boxArray = boxID.split("-");
    let boxIDindex = boxArray[boxArray.length - 1];

    // If the next number in the array is equal to the number we are dropping in, add it to the box
    //last digit of the targeted box id must also be equal to the array index (ensures element dropped in correct box)
    if (
      nextArr[curNumIndex] === Number($(`#${data}`).html()) &&
      boxIDindex == curNumIndex
    ) {
      //Move is right
      curNumIndex++;
      //console.log(curNumIndex);
      ev.currentTarget.appendChild(document.getElementById(data));

      //console.log(ev.target);
      //console.log(ev.target.parentElement.id);
      setPosVis(boxID);
      playRightMoveAudio();

      // DISPLAY NEXT EMPTY ROW
      if (curNumIndex === nextArr.length) {
        curNumIndex = 0;
        getNextRow();
      }
    } else {
      setNegVis(boxID);
      playWrongMoveAudio();
      //increment counter when a mistake is made
      counter ++;
      //show the updated mistake count
      $('#mistake-num').html(counter);
      //check if 3 mistakes have been made
      checkIncorrect(counter);
    }

  }
}
