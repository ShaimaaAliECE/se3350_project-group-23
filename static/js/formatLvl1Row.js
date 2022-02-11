// Formats the displayed rows accordingly (move from index but put in game index)
function formatRow(arr, key) {
  let n;
  let html = ``;

  if (arr.length == 1) {
    html += `<div class="arr arr-single" id="arr-box-${key}-${0}"exp-val=${
      arr[0]
    }><div class="num-slot">${arr[0]}</div></div>`;
  } else {
    for (var i = 0; i < arr.length; i++) {
      n = arr[i];
      if (i == 0) {
        html += `<div class="arr arr-start" id="arr-box-${key}-${i}"exp-val=${n}><div class="num-slot">${n}</div></div>`;
      } else if (i + 1 == arr.length) {
        html += `<div class="arr arr-end" id="arr-box-${key}-${i}" exp-val=${n}><div class="num-slot">${n}</div></div>`;
      } else {
        html += `<div class="arr" id="arr-box-${key}-${i}" exp-val=${n}><div class="num-slot">${n}</div></div>`;
      }
    }
  }

  return html;
}
