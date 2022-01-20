const express = require('express');
var bodyParser = require('body-parser');

// Routes
var mergeSortRouter = require('./routes/mergesort_routes');
//var infoRouter = require('./routes/info_routes');

const app = express();
app.use(bodyParser.urlencoded({extended: true})); 
const path = require('path'); //Used for directory path stuff
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Public client side static file
app.use(express.static('static'));

app.use('/merge_sort', mergeSortRouter);
//app.use('/admin', adminRouter);

//use may not be correct as it seems to love to access this
app.use('/', (req, res, next) => {
    console.log('-> Rendering Home Page:');
    res.status(200).render("home", {pageTitle: "Home", tabTitle: "Home"});
    console.log('* Rendering Home Page Success.\n');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(err.status || 404).json({
      message: "No such route exists"
    })
});
  
// error handler
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({
        message: "Error Message"
    })
});

app.listen(2000);