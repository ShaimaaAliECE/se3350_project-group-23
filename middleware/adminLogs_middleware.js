const newConn = require("../../models/users_model.js");

const getAnalytics = function(req, res, next) {
    let conn = newConn();

    conn.query(`SELECT * FROM game_logs;`
        ,(err,rows,fields) => {
            conn.end();  
            if (err) {
                // Unk Error
                console.log(err);
                console.log('- While Checking logs, an error occured.');
                res.status(400).send("An unknown error occured");    
            } else if (rows.length < 1){
                res.status(400).send("Error, no logs are found");    
            } else {
                req.body.data = rows;

                for (let i = 0; i < rows.length; i++) {
                    let r = rows[i]
                    let time = r.log_time;
                    let hrs = Math.floor(time/(60 * 60));
                    time -= hrs*60*60;
                    let min = Math.floor(time/60) ;
                    time -= min*60;
                    let sec = time;

                    let date = new Date(r.log_date);

                    let day = parseInt(date.getDate());
                    day = day < 10 ? '0' + day : day;

                    let month = parseInt(date.getMonth()) + 1;
                    month = month < 10 ? '0' + month : month;

                    // change later to be middle ware stuff but not now
                    rows[i].log_date = day + '/' + month + '/' + date.getFullYear().toString().substr(2,4) + ' ' + date.getHours() + ':' + date.getMinutes();
                    rows[i].log_time = (hrs == 0 ? "" : (hrs < 10 ? '0' + hrs : hrs) + ':') + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
                }
                next();
            }
        });
}

module.exports = {
    getAnalytics
}
