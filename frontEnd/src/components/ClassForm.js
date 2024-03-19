import React, { useState, useEffect } from 'react';

function ClassForm() {
 const [majors, setMajors] = useState([]);
 const [classes, setClasses] = useState([]);
 const [selectedMajor, setSelectedMajor] = useState('');
 const [selectedClass, setSelectedClass] = useState('');
 const [selectedClasses, setSelectedClasses] = useState([]); // State to hold selected classes

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
    setClasses([]); // Clear classes when major changes
 };

 const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
 };

 const handleSubmit = (event) => {
    event.preventDefault();
    // Add the selected class to the selectedClasses state
    setSelectedClasses([...selectedClasses, { id: selectedClasses.length, name: selectedClass }]);
    // Reset the form
    setSelectedMajor('');
    setSelectedClass('');
    setClasses([]);
 };

 const handleRemoveClass = (id) => {
    // Remove the class with the given id from the selectedClasses state
    setSelectedClasses(selectedClasses.filter(classItem => classItem.id !== id));
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
        <button type="submit">Submit</button>
      </form>
    </>
 );
}

export default ClassForm;
