import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './B_ClassFormByManual.css'

function ClassForm() {
 const [majors, setMajors] = useState([]);
 const [classes, setClasses] = useState([]);
 const [selectedMajor, setSelectedMajor] = useState('');
 const [selectedClass, setSelectedClass] = useState('');
 const [selectedClasses, setSelectedClasses] = useState([]);
 const [errorMessage, setErrorMessage] = useState(''); // State for error message
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
    fetch('http://localhost:9000/major')
      .then(response => response.json())
      .then(data => setMajors(data))
      .catch(error => console.error('Error fetching data: ', error));
 }, []);

 useEffect(() => {
    if (selectedMajor) {
      fetch(`http://localhost:9000/major/${selectedMajor}`)
        .then(response => response.json())
        .then(data => setClasses(data))
        .catch(error => console.error('Error fetching classes: ', error));
    }
 }, [selectedMajor]);

 const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
    setClasses([]);
 };

 const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
 };

 const handleSubmit = (event) => {
  event.preventDefault();
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
 

 const handleRemoveClass = (id) => {
    setSelectedClasses(selectedClasses.filter(classItem => classItem.id !== id));
 };

 const handleSendToBackend = () => {
  setIsLoading(true); // Set loading to true at the beginning
  axios.post('http://localhost:9000/saveSelectedClasses', { selectedClasses })
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
      <form onSubmit={handleSubmit}>
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
    {isLoading && <div>Loading...</div>}
    </>
 );
}

export default ClassForm;
