var express = require('express');
var router = express.Router();

const {getMajors} = require('../controllers/controller')
const {getCourses} = require('../controllers/controller')

router.get('/table', async function(req, res, next) { 
    res.json("hello");
  });

router.post('/scheduleFromClasses', async function(req, res){
  console.log(req.body);
});

// End point responsible for getting all the courses in the database 
router.get('/major', async function(req, res){
  try {
    // Pass those variables as arguments to the controller function which will return an object containing information pertaining to exam
    const courses = await getMajors();

    // Send the exam object as the response
    res.json(courses);
  } catch (error) {
    
    console.log(error);
  }
});

// End point to get all classes for a specific major
router.get('/major/:major', async function(req, res){
  try {

    // Isolate the major in question
    const major = req.params.major;
    console.log("We have recieved a get request with the major: ", major);
    // Call some controller function that will obtain the courses pertaining to this major from database
    const courses = await getCourses(major);
    console.log(courses);

    // Send the array of courses pertaining to this major to client
    res.json(courses);
  } catch (error) {
    
    console.log(error);
  }
});

  module.exports = router;