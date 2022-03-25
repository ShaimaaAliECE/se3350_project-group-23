const newConn = require("../../models/users_model.js");

const checkUser = function(req, res, next) {
    console.log('- Checking For User In Table...');
    let conn = newConn();

    conn.query(`SELECT COUNT(*) duplicate FROM users WHERE studentId=` + req.body.studentId + ` AND username="` + req.body.usr + `";`
        ,(err,rows,fields) => {
            conn.end();
            console.log(req.body.studentId);
            let d = rows[0].duplicate;  
            if (err) {
                // Unk Error
                console.log(err);
                console.log('- While Checking Users, an error occured.');
                res.status(400).send("An unknown error occured");    
            } else if (d){
                console.log('- User Found, Success...');
                next();
            } else {
                console.log('- User Not Found...');
                res.status(400).send("An Account with this id or username does not exist. Please ensure the correct id/username was entered or create an account.");
            }
        }
    );
}

const setCookies = function(req, res, next) {
    console.log('-> Setting Users Cookies:');

    res.clearCookie('usr');
    res.clearCookie('studentId');

    res.cookie('usr', req.body.usr);
    res.cookie('studentId', req.body.studentId);
    
    console.log('* Setting Users Cookies: Success');
    next();
}

const clearCookies = function(req, res, next) {
    console.log('-> Clearing Users Cookies:');

    res.clearCookie('usr');
    res.clearCookie('studentId');
    
    console.log('* Clearing Users Cookies: Success');
    next();
}

module.exports = {
    checkUser,
    setCookies,
    clearCookies
}