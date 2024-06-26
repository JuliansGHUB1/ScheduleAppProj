// ClassForm.jsx
import React from 'react';
import './B_ClassFormByManual.css'
import useClassForm from './useClassForm'; // Adjust the path according to your file structure

function ClassForm() {
  const {
    majors,
    classes,
    selectedMajor,
    selectedClass,
    selectedClasses,
    errorMessage,
    isLoading,
    handleMajorChange,
    handleClassChange,
    addClass,
    handleRemoveClass,
    handleSendToBackend,
  } = useClassForm();

  return (
    <>
      <div>
        {selectedClasses.map(classItem => (
          <div key={classItem.id}>
            {classItem.name} <button onClick={() => handleRemoveClass(classItem.id)}>X</button>
          </div>
        ))}
      </div>
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
      {isLoading && (
        <div className="spinner-container">
          <img src="/Capture.JPG" alt="Loading..." className="custom-spinner" />
        </div>
      )}
    </>
  );
}

export default ClassForm;
