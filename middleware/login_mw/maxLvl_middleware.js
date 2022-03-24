const newConn = require("../../models/users_model.js");

const getMaxMergeSortLevel = function(req, res, next) {
    //console.log('- Checking For Duplicate ID In Table...');
    if (req.cookies.studentId) {
        let conn = newConn();

        conn.query(`SELECT merge_sort FROM levels WHERE studentId=` + req.cookies.studentId + `;`
            ,(err,rows,fields) => {
                conn.end();
                let lvl = rows[0].merge_sort; 
                if (err) {
                    // Unk Error
                    console.log(err);
                    console.log('- While Checking Duplicate ID, an error occured.');
                    res.status(400).send("An unknown error occured");    
                } else if (lvl){
                    //console.log('- Duplicate ID, Success...');
                    req.body.mergesortLvl = lvl;
                    next();
                } else {
                    console.log('- Duplicate ID Not Found...');
                    res.status(400).send("An Account with this id does not exist. Please ensure the correct id was entered or create an account.");
                }
            }
        );
    } else {
        req.body.mergesortLvl = 0;
        next();
    }
}

const changeMergeSortMaxLvl = function(req, res, next) {
    console.log('- Changing MergeSort Max Level...');

    if(req.cookies.studentId != undefined) {
        let conn = newConn();
        conn.query(`UPDATE levels
            SET merge_sort="` + req.body.newMax + `"
            WHERE studentId="` + req.cookies.studentId + `" AND merge_sort < ${req.body.newMax};`
            ,(err,rows,fields) => {
                if (err) {
                    console.log('- Error Changing Max Level.');
                } else {
                    console.log('- Changing max lvl.\n');
                }
                conn.end()
            }
        );
    }
}

module.exports = {
    getMaxMergeSortLevel,
    changeMergeSortMaxLvl
}