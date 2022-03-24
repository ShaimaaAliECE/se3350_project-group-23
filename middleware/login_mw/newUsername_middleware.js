const newConn = require("../../models/users_model.js");

const checkStudentId = function(req, res, next) {
    console.log('- Checking For Duplicate ID In Table...');
    let conn = newConn();

    conn.query(`SELECT COUNT(*) duplicate FROM Users WHERE studentId=` + req.body.studentId + `;`
        ,(err,rows,fields) => {
            conn.end();
            let d = rows[0].duplicate;  
            if (err) {
                // Unk Error
                console.log(err);
                console.log('- While Checking Duplicate ID, an error occured.');
                res.status(400).send("An unknown error occured");    
            } else if (d){
                console.log('- Duplicate ID, Success...');
                next();
            } else {
                console.log('- Duplicate ID Not Found...');
                res.status(400).send("An Account with this id does not exist. Please ensure the correct id was entered or create an account.");
            }
        }
    );
}

const changeUsername = function(req, res, next) {
    console.log('- Changing Username...');

    let conn = newConn();
    conn.query(`UPDATE Users
        SET username="` + req.body.usr+ `"
        WHERE studentId="` + req.body.studentId + `";`
        ,(err,rows,fields) => {
            if (err) {
                console.log('- Error Changing Username.');

              // Unk Error
              console.log(err);
              res.status(400).render("error", {title: "Error"});
            } else {
                console.log('- Changing Username Success...');
                next();
            }
            conn.end()
          }
    );
}

module.exports = {
    checkStudentId,
    changeUsername
}
