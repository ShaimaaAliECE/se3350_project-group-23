// Formats the displayed rows accordingly (move from index but put in game index)
function formatRow(arr, key) {
  let n;
  let html = ``;

  if (arr.length == 1) {
    html += `<div class="arr arr-single" id="arr-box-${key}-${0}"exp-val=${
      arr[0]
    }><div class="num-slot" draggable="true">${arr[0]}</div></div>`;
  } else {
    for (var i = 0; i < arr.length; i++) {
      n = arr[i];
      if (i == 0) {
        html += `<div class="arr arr-start" id="arr-box-${key}-${i}"exp-val=${n}><div class="num-slot" draggable="true" onDragStart="handleDrag(event)" id="${i}">${n}</div></div>`;
      } else if (i + 1 == arr.length) {
        html += `<div class="arr arr-end" id="arr-box-${key}-${i}" exp-val=${n}><div class="num-slot" draggable="true" onDragStart="handleDrag(event)" id="${i}">${n}</div></div>`;
      } else {
        html += `<div class="arr" id="arr-box-${key}-${i}" exp-val=${n}><div class="num-slot" draggable="true" onDragStart="handleDrag(event)" id="${i}">${n}</div></div>`;
      }
    }
  }

  return html;
}

// Formats the displayed rows accordingly (move from index but put in game index)
function formatEmptyRow(arr, key) {
  let n;
  let html = ``;

  if (arr.length == 1) {
    html += `<div class="arr arr-single" onDrop="handleDrop(event)" onDragOver="allowDrop(event)" id="arr-box-${key}-${0}"></div>`;
  } else {
    for (var i = 0; i < arr.length; i++) {
      n = arr[i];
      if (i == 0) {
        html += `<div class="arr arr-start" onDrop="handleDrop(event)" onDragOver="allowDrop(event)" id="arr-box-${key}-${i}"></div>`;
      } else if (i + 1 == arr.length) {
        html += `<div class="arr arr-end" onDrop="handleDrop(event)" onDragOver="allowDrop(event)" id="arr-box-${key}-${i}"></div>`;
      } else {
        html += `<div class="arr" onDrop="handleDrop(event)" onDragOver="allowDrop(event)" id="arr-box-${key}-${i}"></div>`;
      }
    }
  }

  return html;
}
