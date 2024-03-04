var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios'); // Import axios for making HTTP requests
const cheerio = require('cheerio'); // Import cheerio for parsing HTML

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url); // Make a GET request to the URL
    const $ = cheerio.load(response.data); // Load the HTML into cheerio
    // Parse HTML and extract data
    // Perform scraping tasks here
    console.log($.html()); // Print the HTML content
  } catch (error) {
    console.error('Error scraping website:', error.message);
  }
}


async function connect () {
  try {
      await mongoose.connect("mongodb+srv://julianbiju001:Password123@techdive.jkyexu6.mongodb.net/PatientData?retryWrites=true&w=majority");
      console.log("connected to db")
      await scrapeWebsite("http://courses.umb.edu/course_catalog/subjects/2024%20Spring");
      console.log("website scraping done")

      
  } catch (error) {
      console.log(error.message);
  }

  
}

connect()

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
