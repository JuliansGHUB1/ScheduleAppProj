import React, { useState } from 'react';
import './B_ClassFormByFile.css'

const FileUpload = () => {
 const [selectedFile, setSelectedFile] = useState(null);
 const [isLoading, setIsLoading] = useState(false);


 const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
 };

 const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('YOUR_BACKEND_ENDPOINT', {
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
    <div className="file-upload-container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Update</button>
    {/* Loading indicator */}
    {isLoading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
    </div>

 );
};

export default FileUpload;
