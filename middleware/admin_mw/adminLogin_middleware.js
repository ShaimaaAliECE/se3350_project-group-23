const newConn = require("../../models/users_model.js");

const checkUser = function(req, res, next) {
    //Just temporary 
    if (req.body.usr == 'admin') {
        next();
    } else {
        //add stuff to prevent normal usr from accessing later (cookies?)
        res.status(400).send('User is not registered');
    }
}

const checkPassword = function(req, res, next) {
    //Just temporary 
    if (req.body.psw == '123') {
        next();
    } else {
        //add stuff to prevent normal usr from accessing later
        res.status(400).send('Password is not valid for this account.');
    }
}

module.exports = {
    checkUser,
    checkPassword
}