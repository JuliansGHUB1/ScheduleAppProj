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


async function scrapeForMajors(url) {
  try {
    const response = await axios.get(url); // Make a GET request to the URL
    const $ = cheerio.load(response.data); // Load the HTML into cheerio
    
    // Select the div with class "unit-50"
    const unit50Div = $('div.unit-50');
    
    // Find all <a> tags within the div with class "unit-50"
    const links = unit50Div.find('a');

    /*
      Code here is responsible for iterating over links (which contains all the elements with anchor tags)
      and for each of those elements, take the text out, the link out, and put it into a new major object to be stored in our db
    */
    links.each(async (index, element) => {
      const text = $(element).text().trim(); // Get the text of the anchor tag (Major name)
      const href = $(element).attr('href'); // Get the href attribute value (the link)
      
      // Check if the major already exists in the database
      const existingMajor = await CollegeMajor.findOne({ name: text });

      const courses = await scrapeForCourses(href);

      if (!existingMajor) {
        // Major doesn't exist, so create a new one and save it
        const newMajor = new CollegeMajor({
          name: text,
          link: href,
          coursesInMajor: courses  // Set to empty array for the time being, will populate later
        });

        // Save the new major to the database
        await newMajor.save();
        console.log(`Major ${text} added to the database.`);
      } else {
     //   console.log(`Major ${text} already exists in the database. Skipping.`);
      }
    });

  } catch (error) {
    console.log('Error scraping website:', error.message);
  }
}


async function scrapeForCourses(url) {
  const emptyCourseArray = [];
  try {
    const response = await axios.get(url); // Make a GET request to the URL
    const $ = cheerio.load(response.data); // Load the HTML into cheerio
    
    // Select the div with class "unit-50"
    const unit50Div = $('div.unit-70.content');
    
    // Find all <a> tags within the div with class "unit-50"
    const links = unit50Div.find('a');

    /*
      Code here is responsible for iterating over links (which contains all the elements with anchor tags)
      and for each of those elements, take the text out, the link out, and put it into a new major object to be stored in our db
    */
    links.each((index, element) => {
      const courseName = $(element).text().trim(); // Get the text of the anchor tag (Major name)
      const linkToCourse = $(element).attr('href'); // Get the href attribute value (the link)
      
      // Make the instance of this course using the schema
      const courseInst = {
          name: courseName,
          link: linkToCourse,   
      };

      console.log(courseInst);
      emptyCourseArray.push(courseInst);
    });
  } catch (error) {
    console.log('Error scraping website:', error.message);
    throw error; // Re-throw the error to be caught by the caller
  }
  return emptyCourseArray;
}




async function connect () {
  try {
      await mongoose.connect("mongodb+srv://chauduksing2:umass123@cluster0.lcwmjao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
      console.log("connected to db")
      await scrapeForMajors("https://courses.umb.edu/course_catalog/subjects/2024%20Spring");
      console.log("website scraping done")
      console.log("starting to scrape for courses: accounting and finance");
      await scrapeForCourses("https://courses.umb.edu/course_catalog/courses/ugrd_AF_2024%20Spring");
      console.log("done");
      
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
