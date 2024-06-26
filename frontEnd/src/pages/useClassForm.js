import axios from 'axios';
// useClassForm.js
import { useState, useEffect } from 'react';

const useClassForm = () => {
  const [majors, setMajors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:9000/major')
     .then(response => response.json())
     .then(data => setMajors(data))
     .catch(error => console.error('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    if (selectedMajor) {
      const encodedMajor = encodeURIComponent(selectedMajor);
      fetch(`http://localhost:9000/major/${encodedMajor}`)
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

  const addClass = (event) => {
    event.preventDefault();
    if (selectedClass === '') {
      setErrorMessage('Please select a class before submitting.');
      return;
    }

    const classExists = selectedClasses.some(classItem => classItem.name === selectedClass);
    if (classExists) {
      setErrorMessage('This class has already been added.');
      return;
    }

    setSelectedClasses([...selectedClasses, { id: selectedClasses.length, name: selectedClass }]);
    setSelectedClass('');
    setErrorMessage('');
  };

  const handleRemoveClass = (id) => {
    setSelectedClasses(selectedClasses.filter(classItem => classItem.id!== id));
  };

  const handleSendToBackend = () => {
    setIsLoading(true);
    axios.post('http://localhost:9000/sentClasses', { selectedClasses })
     .then(response => {
        console.log('Data sent to backend successfully:', response.data);
        setIsLoading(false);
      })
     .catch(error => {
        console.error('Error sending data to backend:', error);
        setIsLoading(false);
      });
  };

  return {
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
  };
};

export default useClassForm;
