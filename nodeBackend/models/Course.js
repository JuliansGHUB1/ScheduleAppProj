const mongoose = require('mongoose')
// A course should have two key value pairs name: name of course, link: link to classes for that course
// We will create a "schema" which defines the structure of these courses

const courseSchema = new mongoose.Schema({
    name: String,
    link: String,
  });

module.exports = courseSchema;