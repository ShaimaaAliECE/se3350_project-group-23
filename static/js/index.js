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

    *reversePreOrderTraversal(node = this.root) {
      yield node;
      if (node.right) yield* this.reversePreOrderTraversal(node.right);
      if (node.left) yield* this.reversePreOrderTraversal(node.left);
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
let curStep = 0;
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

    maxDepth = Math.ceil(Math.log(origArr.length) / Math.log(2)); // Finds the max depth of the tree

    fillGameBoard(origArr, maxDepth);

    // Creates tree for the splitting steps
    splitTree = new BinaryTree(0, [...origArr]);
    // Gets the final merged result
    mergeSort(splitTree, [...origArr], 0,0, getEmptyArr(maxDepth)); //CHANGE TO SOMETHING ABOUT POPULATING TREE

    // Order of steps
    splitOrder = [...splitTree.preOrderTraversal()].map((n) => n.key);
    
    // Creates tree for the merging steps
    mergeOrder = [...splitTree.reversePreOrderTraversal()].map((n) => n.key).reverse();

    console.log(splitOrder);
    console.log(mergeOrder)
  }
}
function fillGameBoard(startArray, maxDepth) {
  let rowSize = startArray.length * boxSize;

  let dom = `<div class="arr-holder" id="dom-hold" style="order: 0"><div class="arr-row" id="arr-row-0-a">` + formatRow(startArray) + `</div></div>`;
  let sub = `<div class="arr-holder" id="sub-hold" style="order: ${maxDepth * 3}"><div class="arr-row" id="arr-row-0-b"></div></div>`;
  let split = ``;
  let sort = ``;
  for (i = 1; i < maxDepth + 1; i++) {
    rowSize = Math.ceil(startArray.length/(i * 2)) * boxSize;
    split += `<div class="arr-holder" id="arr-holder-${i}-a" style="order: ${i}">`;
    sort += `<div class="arr-holder" id="arr-holder-${i}-b" style="order: ${maxDepth * 2 - i}">`;

    if (i < maxDepth) {
      for (j = 0; j < Math.pow(2,i); j++) {
        split += `<div class="arr-row" id="arr-row-${i}-${j}-a" style="width: ${rowSize}px;"></div>`;
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
    }
  }

  $("#gameboard").append(dom + split + sort + sub); // Append markup to the end of the gameboard
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

  // Concatenating leftover elements
  return [...arr, ...left, ...right];
}

// dont need to sdn stuff as post due to cookies
function getNextRow() {
  let curNode, val;
  // Increment current step
  curStep++;

  if (curStep >= splitOrder.length && curStep < splitOrder.length + mergeOrder.length) {
    if (curStep == splitOrder.length) 
      splitOrder.reverse();

    curNode = splitTree.find(splitOrder[curStep - splitOrder.length]);
    val = curNode.getSortedValue;

    if(curNode.value.length <= 1) {
      return getNextRow();
    }
  } else if (curStep < splitOrder.length) {
    curNode = splitTree.find(splitOrder[curStep]);
    val = curNode.value;
  } else {
    console.log("Error. Algorithm complete, no more steps");
    return;
  }

  $(`#arr-row-${curNode.key}-a`).html(formatRow(val));
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

