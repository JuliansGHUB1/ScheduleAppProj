const courseSchema = require('./Course');
const mongoose = require('mongoose');

const collegeMajorSchema = new mongoose.Schema({
    name: String,
    link: String,
    coursesInMajor: [courseSchema] // Array of course objects
  });



module.exports = mongoose.model('CollegeMajor', collegeMajorSchema);