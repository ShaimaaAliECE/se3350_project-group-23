const getNextArr = function(req, res, next) {
    console.log('-> Getting Next Arrays:');

    var arr = [];
    var algArr = req.cookies.algArr

    for(let i = 0; i < algArr.length; i++) {
        var branch = algArr[i];
        var segSize = Math.ceil(branch.length / 2);
        for(let j = 0; j < branch.length; j += segSize) {
            var temp = branch.slice(j, j + segSize)
            arr.push(temp);
        }
    }

    req.body.nextArr = arr;
    
    console.log('* Getting Level Array: Success');
    next();
}

module.exports = {
    getNextArr
}