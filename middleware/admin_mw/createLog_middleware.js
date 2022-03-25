const newConn = require("../../models/users_model.js");

const createGameLog = function(req, res, next) {
    console.log("--> Logging a game:");
    let conn = newConn();
    let data = req.body;
    let id = req.cookies.studentId == undefined ? 0 : req.cookies.studentId;

    let queryStr = `INSERT INTO game_logs VALUES 
                        ( 
                            ${id}, 
                            NOW(), 
                            "${data.type}", 
                            ${data.level}, 
                            ${data.playTime},
                            ${data.mistakeCount},
                            "${data.logReason}"
                        );`;
    
    conn.query(queryStr, 
        (err) => {
            conn.end();
            if (err) {
                console.log('*Game was NOT successfully logged.\n');
                console.log(err);
            } else {
                console.log('*Game was successfully logged.\n');
            }
        }
    );  

}

module.exports = {
    createGameLog
}