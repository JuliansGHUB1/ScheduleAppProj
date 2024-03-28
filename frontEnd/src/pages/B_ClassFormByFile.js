import React, { useState } from 'react';
import './B_ClassFormByFile.css'

const FileUpload = () => {
  // state variable to hold selectedFile
 const [selectedFile, setSelectedFile] = useState(null);
 // state variable to check state of loading / not loading
 const [isLoading, setIsLoading] = useState(false);

// event: when they select a file
 const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
 };
// event: they click the upload button
 const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:9000/degreeAudit', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('File uploaded successfully.');
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('File upload failed.');
        setIsLoading(false)
      });
 };

 return (
  <div className="file-upload-wrapper">
     <h3>Submit your Degree Audit!</h3>
     <div className="file-upload-container">
       <input type="file" onChange={handleFileChange} />
       <button onClick={handleUpload}>Update</button>
       {/* When loading, plays animation */}
       {isLoading && (
         <div className="spinner-container">
           <div className="spinner"></div>
         </div>
       )}
     </div>
  </div>
 );
 
};

export default FileUpload;
