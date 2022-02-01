class BinaryTreeNode {
    constructor(key, value = key, parent = null, left = null, right = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }

    get isLeaf() {
        return this.left === null && this.right === null;
    }

    get hasChildren() {
        return !this.isLeaf;
    }

    get getSortedValue() {
      let copy = [...this.value];
      copy.sort((a, b) => {
        return a - b;
      });
      return copy;
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

// reduce global variables after fin
let splitOrder = [];
let splitTree;
let mergeOrder = [];
let mergedArrs = [];
let mergeTree;
let mergeResult;
let curStep = 0;
let numRows;
let maxDepth;
const boxSize = 45; // size of a single box within a display array (px)

function getRandArr() {
  //used after start btn once
  $(".start-btn").remove();

  let data = {};

  let xReq = new XMLHttpRequest();
  //xReq.onreadystatechange = displayNewRow;
  xReq.onreadystatechange = sorter;

  xReq.open("POST", window.location.pathname + "/get_arr", true);
  xReq.setRequestHeader("data", JSON.stringify(data));
  xReq.send();
}

function sorter() {
  if (this.readyState == 4 && this.status == 200) {
    let origArr = JSON.parse(this.responseText).arr; // Gets the original array of random numbers
    let rowSize = origArr.length * boxSize;
    maxDepth = Math.ceil(Math.log(origArr.length) / Math.log(2)); // Finds the max depth of the tree
    // Populating the initial array on the screen

    numRows = maxDepth * 2; // Number of arr-holder rows is twice max depth because need rows for both splitting and merging

    fillGameBoard(origArr);

    // Sorting
    // --------------------------------------------------------------

    // Creates tree for the splitting steps
    splitTree = new BinaryTree(0, [...origArr]);
//    console.log(splitTree);
    // Gets the final merged result
    mergeResult = mergeSort(splitTree, [...origArr], 0,0, getEmptyArr(maxDepth));//Array(maxDepth).fill([]));

    // Order of steps
    splitOrder = [...splitTree.preOrderTraversal()].map((n) => n.key);
    
    // Creates tree for the merging steps
    mergeTree = new BinaryTree(0, [...mergeResult]);//mergedArrs.pop());
    // Gets the final merged result
    mergeSort(mergeTree, [...mergeResult], 0, 0, getEmptyArr(maxDepth));//Array(maxDepth).fill([]));

    // Creates tree for the merging steps
    mergeOrder = [...mergeTree.preOrderTraversal()].map((n) => n.key).reverse();

   // console.log(splitOrder);
    console.log(mergeTree)
  }
}
function fillGameBoard(startArray) {
  let markup = `<div class="arr-holder" id="master-hold" style="order: 0"><div class="arr-row" id="master-row">` + formatRow(startArray) + `</div></div>`;
  let split = ``;
  let sort = ``;
  for (i = 1; i < maxDepth + 1; i++) {
    rowSize = Math.ceil(startArray.length/(i * 2)) * boxSize;
    split += `<div class="arr-holder" id="arr-holder-${i}-a" style="order: ${i}">`;
    sort += `<div class="arr-holder" id="arr-holder-${i}-b" style="order: ${maxDepth * 2 - i}">`;

    if (i < maxDepth) {
      for (j = 0; j < Math.pow(2,i); j++) {
        split += `<div class="arr-row" id="arr-row-${i}-${j}-a" style="width: ${rowSize}px"></div>`;
        sort += `<div class="arr-row" id="arr-row-${i}-${j}-b" style="width: ${rowSize}px"></div>`;
      }

      split += `</div>`;
      sort += `</div>`;
    } else {
      split += `<div class="arr-row" id="arr-row-${maxDepth}-0-a" style="width: ${rowSize}px"></div>`;
      split += `<div class="arr-row" id="arr-row-${maxDepth}-1-a" style="width: ${rowSize}px"></div>`;

      sort += `<div class="arr-row" id="arr-row-${maxDepth}-0-b" style="width: ${rowSize}px"></div>`;
      sort += `<div class="arr-row" id="arr-row-${maxDepth}-1-b" style="width: ${rowSize}px"></div>`;

      for (j = 2; j < Math.pow(2,(i - 1)); j++) {
        split += `<div class="arr-row" style="width: ${rowSize}px"></div>`;
        sort += `<div class="arr-row" style="width: ${rowSize}px"></div>`;
      }
      split += `<div class="arr-row" id="arr-row-${maxDepth}-2-a" style="width: ${rowSize}px"></div>`;
      split += `<div class="arr-row" id="arr-row-${maxDepth}-3-a" style="width: ${rowSize}px"></div>`;

      sort += `<div class="arr-row" id="arr-row-${maxDepth}-2-b" style="width: ${rowSize}px"></div>`;
      sort += `<div class="arr-row" id="arr-row-${maxDepth}-3-b" style="width: ${rowSize}px"></div>`;

      for (j = 2; j < Math.pow(2,(i - 1)); j++) {
        split += `<div class="arr-row" style="width: ${rowSize}px"></div>`;
        sort += `<div class="arr-row" style="width: ${rowSize}px"></div>`;
      }

      split += `</div>`;
      sort += `</div>`;
      //rowSize = Math.ceil(origArr.length/( (maxDepth * 2 - i) * 2)) * boxSize;
    }
  }

  $("#gameboard").append(markup + split + sort); // Append markup to the end of the gameboard
}

// Merge sort algorithm
function mergeSort(tree, arr, parentKey, depth, keys) {
  // Gets the length of half the array (rounding up)
  const half = Math.ceil(arr.length / 2);

  // Base case
  if (arr.length < 2) return arr;

  // Left side of the array, right side will be stored in "arr" since splice removes these values from original arr
  const left = arr.splice(0, half);

  // Sets the key for the left side of the array, and inserts it into the tree
  const leftKey = (depth + 1).toString() + `-` + keys[depth].length;
  tree.insert(parentKey, leftKey, [...left]);

  let curKey = keys[depth].length;
  keys[depth].push(curKey);

  // Sets the key for the right side of the array, and inserts it into the tree
  const rightKey = (depth + 1).toString() + `-` + keys[depth].length;
  tree.insert(parentKey, rightKey, [...arr]);

  curKey = keys[depth].length;
  keys[depth].push(curKey);

  return merge(
    mergeSort(tree, left, leftKey, depth + 1, keys),
    mergeSort(tree, arr, rightKey, depth + 1, keys),
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

// dont need to sdn stuff as post due to cookies
function getNextRow() {
  // Increment current step
  curStep++;

  // If merging
  if (curStep >= splitOrder.length && curStep < splitOrder.length + mergeOrder.length) {
    let curNode = splitTree.find(splitOrder[curStep - splitOrder.length]);
    $(`#arr-row-${curNode.key}-b`).append(formatRow(curNode.getSortedValue));
  } else if (curStep === splitOrder.length + mergedArrs.length) {
    // If this is the last merge step, put the final result of the merge into the last arr-holder
    //$(`#arr-holder-${numRows}-b`).append(formatRow(mergeResult));
  } else if (curStep >= splitOrder.length) {
    console.log("Error. Algorithm complete, no more steps");
  } else {
    let curNode = splitTree.find(splitOrder[curStep]);
    $(`#arr-row-${curNode.key}-a`).append(formatRow(curNode.value));
  }
}

// Formats the displayed rows accordingly (move from index but put in game index) 
function formatRow(arr) {
  let n;
  let html = ``;

  if (arr.length == 1) {
    html += `<button class="arr arr-single" exp-val=${arr[0]}>${arr[0]}</button>`;
  } else {
    for(var i = 0; i < arr.length; i++) {
      n = arr[i];
      if(i == 0) {
        html += `<button class="arr arr-start" exp-val=${n}>${n}</button>`;
      } else if (i + 1 == arr.length) {
        html += `<button class="arr arr-end" exp-val=${n}>${n}</button>`;
      } else {
        html += `<button class="arr" exp-val=${n}>${n}</button>`;
      }
    }
  }

  return html;
}

function getEmptyArr(size) {
  let arr = [];
  for(i = 0; i < size; i++) {
    arr.push([]);
  }
  return arr;
}

