const getNextArr = function (req, res, next) {
  console.log("-> Getting Next Arrays:");

  let arr = [];
  let algArr = req.cookies.algArr; // Array of previous step's arrays

  //   // For each array
  //   for (let i = 0; i < algArr.length; i++) {
  //     let branch = algArr[i];

  //     let segSize = Math.ceil(branch.length / 2);
  //     for (let j = 0; j < branch.length; j += segSize) {
  //       let temp = branch.slice(j, j + segSize);
  //       arr.push(temp);
  //     }
  //   }

  req.body.nextArr = arr;

  console.log("* Getting Level Array: Success");
  next();
};

module.exports = {
  getNextArr,
};
