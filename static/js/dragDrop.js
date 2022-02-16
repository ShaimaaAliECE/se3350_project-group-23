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
      let boxID = ev.target.parentElement.id;
      let boxIDindex = boxID.slice(boxID.length - 1);

      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data)); //user can drop # in incorrect box
      
      console.log(nextArr);
      console.log("Expected val: " + nextArr[curNumIndex]);
      console.log("Detected val: " + Number($(`#${data}`).html()));
      console.log(boxID);
      console.log(boxID.slice(boxID.length - 1));
  
      // If the next number in the array is equal to the number we are dropping in and
      //last digit of the targeted box id is also be equal to the array index (ensures element dropped in correct box)
      if (
        nextArr[curNumIndex] === Number($(`#${data}`).html()) &&
        boxIDindex == curNumIndex
      ) {
        curNumIndex++;
       
        setPosVis(boxID);
  
        // DISPLAY NEXT EMPTY ROW???
        if (curNumIndex === nextArr.length) {
          curNumIndex = 0;
          getNextRow();
        }
      } else setNegVis(boxID);

    }
  }
  