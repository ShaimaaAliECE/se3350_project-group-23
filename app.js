const express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path'); //Used for directory path stuff
const app = express();

app.use(bodyParser.urlencoded({extended: true})); 
app.use(cookieParser());

// Sets the view engine and view path
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Public client side static file
app.use(express.static('static'));

// Routes
var mergeSortRouter = require('./routes/mergesort_routes');

// URLs used by routes
app.use('/merge_sort', mergeSortRouter);

// Base case (Home) if no matching Route
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

// Listens on port 80
app.listen(80);