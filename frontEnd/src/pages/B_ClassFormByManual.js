import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './B_ClassFormByManual.css'

function ClassForm() {
  // majors = stored majors from backend
  // classes = stored classes based on selected major
 const [majors, setMajors] = useState([]);
 const [classes, setClasses] = useState([]);
 // stores selected major + class
 const [selectedMajor, setSelectedMajor] = useState('');
 const [selectedClass, setSelectedClass] = useState('');
 // stores all classes already selected
 const [selectedClasses, setSelectedClasses] = useState([]);
 // state for errorMessage
 const [errorMessage, setErrorMessage] = useState(''); 
 // variable for tracking loading state
 const [isLoading, setIsLoading] = useState(false);

 // useEffect: initially fetches majors
 useEffect(() => {
    fetch('http://localhost:9000/major')
      .then(response => response.json())
      .then(data => setMajors(data))
      .catch(error => console.error('Error fetching data: ', error));
 }, []
 );
 // useEffect: when Major is selected, fetches Majors.classes
 useEffect(() => {
    if (selectedMajor) {

      // Because potentially we can have the major be "Accounting/Finance", the / will be problematic in the url
      // So we must encode first
      const encodedMajor = encodeURIComponent(selectedMajor);
      fetch(`http://localhost:9000/major/${encodedMajor}`)
        .then(response => response.json())
        .then(data => setClasses(data))
        .catch(error => console.error('Error fetching classes: ', error));
    }
 }, [selectedMajor]
 );
 // function: clears classes when major changes
 const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
    setClasses([]);
 };
 // function: change selected class
 const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
 };
 // function: addClass
 const addClass = (event) => {
  event.preventDefault();
  // case:they have not selected  a calss
  if (selectedClass === '') {
     setErrorMessage('Please select a class before submitting.');
     return;
  }
  // Check if the selected class is already in the selectedClasses array
  const classExists = selectedClasses.some(classItem => classItem.name === selectedClass);
  if (classExists) {
     setErrorMessage('This class has already been added.');
     return;
  }
  // If the class does not exist, add it to the selectedClasses array
  setSelectedClasses([...selectedClasses, { id: selectedClasses.length, name: selectedClass }]);
  setSelectedClass('');
  setErrorMessage(''); // Clear the error message after successful submission
 };
 // function: removal of class
 const handleRemoveClass = (id) => {
    setSelectedClasses(selectedClasses.filter(classItem => classItem.id !== id));
 };
 // function-buttonClick: send to backend
 const handleSendToBackend = () => {
  setIsLoading(true); // Set loading to true at the beginning
  axios.post('http://localhost:9000/sentClasses', { selectedClasses })
     .then(response => {
       console.log('Data sent to backend successfully:', response.data);
       setIsLoading(false); // Set loading to false after success
     })
     .catch(error => {
       console.error('Error sending data to backend:', error);
       setIsLoading(false); // Set loading to false after error
     });
 };

 


 return (
    <>
      <div>
        {selectedClasses.map(classItem => (
          <div key={classItem.id}>
            {classItem.name} <button onClick={() => handleRemoveClass(classItem.id)}>X</button>
          </div>
        ))}
      </div>
      {/* Display the error message */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={addClass}>
        <div>
          <label htmlFor="majorDropdown">Select a Major:</label>
          <select id="majorDropdown" value={selectedMajor} onChange={handleMajorChange}>
            <option value="">Select a major</option>
            {majors.map((major, index) => (
              <option key={index} value={major}>{major}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="classDropdown">Select a Class:</label>
          <select id="classDropdown" value={selectedClass} onChange={handleClassChange}>
            <option value="">Select a class</option>
            {classes.map((className, index) => (
              <option key={index} value={className}>{className}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add</button>
        <button type="button" onClick={handleSendToBackend}>Update</button>
      </form>
    {/* Loading indicator */}
    {isLoading && (
  <div className="spinner-container">
    <img src="/Capture.JPG" alt="Loading..." className="custom-spinner" />
  </div>)}
    </>
 );
}

export default ClassForm;

