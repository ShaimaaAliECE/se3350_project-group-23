const newConn = require("../../models/users_model.js");

const verifyFormInput = function(req, res, next) {
    console.log('-> Verifying Inputs:');

    if (!req.body.studentId || !req.body.usr || !req.body.verify_usr) {
        console.log('- Verifying Inputs Failed.');
        // check what send does
        if (!req.body.studentId) {
            res.status(400).send("Student id must be entered.");
        } else if (!req.body.usr) {
            res.status(400).send("A Username must be entered.");
        } else {
            res.status(400).send("Usernames must be verified.");
        }
      } else {
        console.log('- Verifying Inputs Success...');
        next();
      }
}
const verifyStudentId = function(req, res, next) {
    console.log('-> Verifying Student Id:');

    if (req.body.studentId.length !== 9) {
        console.log('- Verifying Inputs Failed.');
        // check what send does
        res.status(400).send("A Student id must be entered 9 digits.");    
      } else {
        console.log('- Verifying Student Id Success...');
        next();
      }
}
const verifyUsername = function(req, res, next) {
    console.log('-> Verifying Username:');

    if (req.body.usr.length < 5) {
        console.log('- Verifying Inputs Failed.');
        // check what send does
        res.status(400).send("A username must be 6 or more charecters");    
    } else if (req.body.usr !== req.body.verify_usr) {
        console.log('- Verifying Inputs Failed.');
        res.status(400).send("Your Username must match the verify input.");  
    } else {
        console.log('- Verifying Username Success...');
        next();
    }
}

const checkDuplicateStudentId = function(req, res, next) {
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
                console.log('- Duplicate ID Found...');
                res.status(400).send("An Account already exists with this id");
            } else {
                console.log('- Not A Duplicate ID, Success...');
                next();
            }
        }
    );
}
const checkDuplicateUsername = function(req, res, next) {
    console.log('-> Verifying Student Id:');

    console.log('- Checking For Duplicate User In Table...');
    let conn = newConn();

    conn.query(`SELECT COUNT(*) duplicate FROM Users WHERE username="` + req.body.usr + `";`
        ,(err,rows,fields) => {
            conn.end();
            let d = rows[0].duplicate;  
            if (err) {
                // Unk Error
                console.log(err);
                console.log('- While Checking Duplicate Username, an error occured.');
                res.status(400).send("An unknown error occured");    
            } else if (d){
                console.log('- Duplicate User Found...');
                res.status(400).send("An account already exists with this username");
            } else {
                console.log('- Not A Duplicate Username, Success...');
                next();
            }
        }
    );
}
const createAccount = function(req, res, next) {
    console.log('- Creating New Account...');

    let conn = newConn();
    conn.query(`INSERT INTO Users
        VALUES (
            "` + req.body.studentId + `", 
            "` + req.body.usr + `" 
        );`
        ,(err,rows,fields) => {
            if (err) {
                console.log('- Error Creating New Account.');

              // Unk Error
              console.log(err);
              res.status(400).render("error", {title: "Error"});
            } else {
                console.log('- Creating New Account Success...');
                next();
            }
            conn.end()
          }
    );
}
const createLvlsAccount = function(req, res, next) {
    console.log('- Creating New Account...');

    let conn = newConn();
    conn.query(`INSERT INTO levels
        VALUES (
            "` + req.body.studentId + `", 
            "1" 
        );`
        ,(err,rows,fields) => {
            if (err) {
                console.log('- Error Creating New Levels Account.');

              // Unk Error
              console.log(err);
              res.status(400).render("error", {title: "Error"});
            } else {
                console.log('- Creating New Levels Account Success...');
                next();
            }
            conn.end()
          }
    );
}

module.exports = {
    verifyFormInput,
    verifyStudentId,
    verifyUsername,
    checkDuplicateStudentId,
    checkDuplicateUsername,
    createAccount,
    createLvlsAccount
}