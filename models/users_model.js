const mysql = require('mysql');

function newConn()
{
    let conn = mysql.createConnection({
        host:'34.130.112.197',
        user: 'root',
        password:'silly',
        database:'3350_proj'
    });
    return conn;
}
module.exports = newConn;