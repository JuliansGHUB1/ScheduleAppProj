const CollegeMajor = require('../models/Major');
const getMajors = async () => {
    try {
     
        // Get all the Major objects in the database collection
        const collegeMajors = await CollegeMajor.find({});
        // Make a new array that contains all fo the names of the majors
        const namesArray = collegeMajors.map(major => major.name);

        return namesArray;
    } catch (error) {
        console.error('Error finding patients:', error);
        throw error;
    }
};

const getCourses = async (major) => {
    try {
      const majorArr = await CollegeMajor.find({ name: major });
      console.log('majorArr ', majorArr);
  
      // This is a ternary statement. equivalent to
      // if majorArr.length > 0 then let courses = majorArr[0].coursesInMajor,
      // else if majorArr is empty then there is no major object in collection
      // with name major, so return empty array
      // main thing here is remember that CollegeMajor.find will return an array
      // of ALL objects in collection whose name attribute matches major, so it will
      // be an array
      const courses = majorArr.length > 0 ? majorArr[0].coursesInMajor : [];
    
      // We don't want to send all of the objects, just all of there names 
      mappedToNames = courses.map(courseObj => courseObj.name);
      
      return mappedToNames;
    } catch (error) {
      console.log('There has been an error: ', error);
      throw error; // Rethrow the error to propagate it further if needed
    }
  };



module.exports.getMajors= getMajors;
module.exports.getCourses = getCourses;