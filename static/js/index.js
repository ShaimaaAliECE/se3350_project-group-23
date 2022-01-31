class BinaryTreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    get isLeaf() {
        return this.left === null && this.right === null;
    }

    get hasChildren() {
        return !this.isLeaf;
    }
}

class BinaryTree {
    constructor(key, value = key) {
        this.root = new BinaryTreeNode(key, value);
    }

    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }

    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    insert(
        parentNodeKey,
        key,
        value = key,
        { left, right } = { left: true, right: true }
    ) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;

                if (!canInsertLeft && !canInsertRight) return false;

                if (canInsertLeft) {
                    node.left = new BinaryTreeNode(key, value, node);
                    return true;
                }

                if (canInsertRight) {
                    node.right = new BinaryTreeNode(key, value, node);
                    return true;
                }
            }
        }
        return false;
    }

    remove(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.left.key === key) {
                node.left = null;
                return true;
            }
            if (node.right.key === key) {
                node.right = null;
                return true;
            }
        }
        return false;
    }

    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
}

//-------------------------------------------------------------------

let keys = [];
let splitOrder = [];
let splitTree;
//let mergeOrder = [];
let mergedArrs = [];
let mergeTree;
let mergeResult;
let curStep = 0;
let numRows;

function getRandArr() {
  $(".start-btn").remove();

  let data = {};

  let xReq = new XMLHttpRequest();
  //xReq.onreadystatechange = displayNewRow;
  xReq.onreadystatechange = sort;

  xReq.open("POST", window.location.pathname + "/get_arr", true);
  xReq.setRequestHeader("data", JSON.stringify(data));
  xReq.send();
}

function sort() {
  if (this.readyState == 4 && this.status == 200) {
    // Gets the original array of random numbers
    let origArr = JSON.parse(this.responseText).arr;

    // Finds the max depth of the tree
    let maxDepth = Math.ceil(Math.log(origArr.length) / Math.log(2));

    // Populating the initial array on the screen
    let markup = `<div class="arr-holder" id="master-hold">
    <div class="arr-row" id="master-row">`;

    origArr.forEach((val, i) => {
      if (i === 0) markup += `<button class="arr arr-start">${val}</button>`;
      else if (i === origArr.length - 1)
        markup += `<button class="arr arr-end">${val}</button>`;
      else markup += `<button class="arr">${val}</button>`;
    });

    markup += `</div></div>`;

    // Number of arr-holder rows is twice max depth because need rows for both splitting and merging
    numRows = maxDepth * 2;

    for (i = 0; i < maxDepth * 2; i++) {
      keys.push([]);
      markup += `<div class="arr-holder" id="arr-holder-${i + 1}"></div>`;
    }

    // Append markup to the end of the gameboard
    $("#gameboard").append(markup);

    // Sorting
    // --------------------------------------------------------------

    // Creates tree for the splitting steps
    splitTree = new BinaryTree(0, [...origArr]);

    // Gets the final merged result
    mergeResult = mergeSort([...origArr]);

    // Order of steps
    splitOrder = [...splitTree.preOrderTraversal()].map((n) => n.key);

    // Creates tree for the merging steps
    mergeTree = new BinaryTree(0, mergedArrs.pop());

   
  }
}
// Merge sort algorithm
function mergeSort(arr, parentKey = 0, depth = 0) {
  // Gets the length of half the array (rounding up)
  const half = Math.ceil(arr.length / 2);

  // Base case
  if (arr.length < 2) return arr;

  // Left side of the array, right side will be stored in "arr" since splice removes these values from original arr
  const left = arr.splice(0, half);

  // Sets the key for the left side of the array, and inserts it into the tree
  const leftKey = (depth + 1).toString() + keys[depth].length;
  splitTree.insert(parentKey, leftKey, [...left]);

  let curKey = keys[depth].length;
  keys[depth].push(curKey);

  // Sets the key for the right side of the array, and inserts it into the tree
  const rightKey = (depth + 1).toString() + keys[depth].length;
  splitTree.insert(parentKey, rightKey, [...arr]);

  curKey = keys[depth].length;
  keys[depth].push(curKey);

  return merge(
    mergeSort(left, leftKey, depth + 1),
    mergeSort(arr, rightKey, depth + 1),
    depth
  );
}
// Merge two arrays
function merge(left, right, depth) {
  let arr = [];

  // Break if any of the arrays are empty
  while (left.length && right.length) {
    // Pushes the lowest of the two values (first value from each array)
    if (left[0] < right[0]) arr.push(left.shift());
    else arr.push(right.shift());
  }

  let merged = [...arr, ...left, ...right];
  console.log("Depth: " + depth + " Arr: " + merged);
  mergedArrs.push([[...merged], depth]);

  // Concatenating leftover elements
  return merged;
}
//--------

// dont need to sdn stuff as post due to cookies
function getNextRow() {
  curStep++;

  // Will need a row div whether we are splitting or merging
  let markup = `<div class="arr-row">`;

  // If merging
  if (
    curStep >= splitOrder.length &&
    curStep < splitOrder.length + mergedArrs.length
  ) {
    // The "merge step" is just the current step minus the steps needed for splitting
    let curMergeStep = curStep - splitOrder.length;

    // Gets the array for the current merge step
    let curStepArr = mergedArrs[curMergeStep][0];
    let curStepDepth = mergedArrs[curMergeStep][1];

    // For each number in the array, create a button
    for (n of curStepArr) {
      markup += `<button class="arr arr-single" exp-val=${n}>${n}</button>`;
    }

    // Appends markup to the correct arr-holder
    $(`#arr-holder-${numRows - curStepDepth}`).append(markup);

    // Return, so we don't go into the splitting section of this fn
    return;
  } // If this is the last merge step, put the final result of the merge into the last arr-holder
  else if (curStep === splitOrder.length + mergedArrs.length) {
    for (n of mergeResult) {
      markup += `<button class="arr arr-single" exp-val=${n}>${n}</button>`;
    }

    $(`#arr-holder-${numRows}`).append(markup);

    // Return, so we don't go into the splitting section of this fn
    return;
  } else if (curStep >= splitOrder.length) {
    console.log("Error. Algorithm complete, no more steps");
    // Return, so we don't go into the splitting section of this fn
    return;
  }

  // Splitting section
  // -----------------

  let curStepKey = splitTree.find(splitOrder[curStep]).key;
  let curStepArr = splitTree.find(splitOrder[curStep]).value;

  // For each number in the current step, add a button to represent it
  for (n of curStepArr) {
    markup += `<button class="arr arr-single" exp-val=${n}>${n}</button>`;
  }

  markup += `</div>`;

  // Add the current array of numbers to the row
  $(`#arr-holder-${curStepKey.slice(0, 1)}`).append(markup);
}

// function displayNewRow() {
//   if (this.readyState == 4 && this.status == 200) {
//     let rowArrs = JSON.parse(this.responseText).arr;
//     let rowWidth = 200 / rowArrs.length; //need to change to better

//     new Promise((resolve, reject) => {
//       let html = '<div class="arr-holder">';
//       for (let i = 0; i < rowArrs.length; i++) {
//         html += '<div class="arr-row" style="width:' + rowWidth + '%;">';

//         let temp = rowArrs[i];

//         for (let j = 0; j < temp.length; j++) {
//           if (j == 0) {
//             if (temp.length == 1) {
//               html +=
//                 '<button class="arr arr-single" exp-val="' +
//                 temp[j] +
//                 '">' +
//                 temp[j] +
//                 "</button>";
//             } else {
//               html +=
//                 '<button class="arr arr-start" exp-val="' +
//                 temp[j] +
//                 '">' +
//                 temp[j] +
//                 "</button>";
//             }
//           } else if (j == temp.length - 1) {
//             html +=
//               '<button class="arr arr-end" exp-val="' +
//               temp[j] +
//               '">' +
//               temp[j] +
//               "</button>";
//           } else {
//             html +=
//               '<button class="arr" exp-val="' +
//               temp[j] +
//               '">' +
//               temp[j] +
//               "</button>";
//           }
//         }

//         html += "</div>";

//         if (i + 1 == rowArrs.length) {
//           resolve(html + "</div>");
//         }
//       }
//     }).then((newRow) => {
//       $("#gameboard").append(newRow);
//     });
//   }
// }
/* 
function formatRow(items) {
    div.arr-holder
            div.arr-row
                each val, index in algArray
                    if index == 0
                        button.arr.arr-start(exp-val=val)= val
                    else if index == algArray.length - 1
                        button.arr.arr-end(exp-val=val)= val
                    else
                        button.arr(exp-val=val)= val
    return new Promise((resolve, reject) => {
        for(let i = 0; i < items.length)
    });
} */
