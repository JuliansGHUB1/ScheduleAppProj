var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios'); // Import axios for making HTTP requests
const cheerio = require('cheerio'); // Import cheerio for parsing HTML
const CollegeMajor = require('./models/Major');
const courseSchema = require('./models/Course');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url); // Make a GET request to the URL
    const $ = cheerio.load(response.data); // Load the HTML into cheerio
    
    // Select the div with class "unit-50"
    const unit50Div = $('div.unit-50');
    
    // Find all <a> tags within the div with class "unit-50"
    const links = unit50Div.find('a');


    /*
      Code here is responsible for itearting over links (which contains all the elements with anchor tags)
      and for each of those elements, take the text out, the link out, and put it into a new major object to be stored in our db
    */
    links.each((index, element) => {
      const text = $(element).text().trim(); // Get the text of the anchor tag (Major name)
      const href = $(element).attr('href'); // Get the href attribute value (the link)
      
      const newMajor = new CollegeMajor({
        name: text,
        link: href,
        coursesInMajor: []  // Set to empty string for time being, will populate later
      })

      // ! Once we have db set up and we have a controller function set up, pass the newMajor to the controller function to add to DB
      console.log(newMajor);
    });

  } catch (error) {
    console.log('Error scraping website:', error.message);
  }
}


async function connect () {
  try {
      await mongoose.connect("mongodb+srv://julianbiju001:Password123@techdive.jkyexu6.mongodb.net/PatientData?retryWrites=true&w=majority");
      console.log("connected to db")
      await scrapeWebsite("https://courses.umb.edu/course_catalog/subjects/2024%20Spring");
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
