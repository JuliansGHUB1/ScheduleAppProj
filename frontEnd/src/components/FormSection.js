import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormSection.css';

function FormSection() { 
    const [formData, setFormData] = useState({
        monStartTime: "",
        monEndTime: "",
        tueStartTime: "",
        tueEndTime: "",
        wedStartTime: "",
        wedEndTime: "",
        thurStartTime: "",
        thurEndTime: "",
        friStartTime: "",
        friEndTime: "",
        description:"",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    console.log("This is the form data: ");
    console.log(formData);
    const navigate = useNavigate();

    const isValidDescription = (description) => /^CS\d+$/.test(description);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isValidDescription(formData.description)) {
              console.log('Description must match the format CSx, where x is some number');
              return;
            }
            const response = await axios.post('http://localhost:9000/exam', formData);
            console.log("we have received the request");
            console.log(response.data);
            navigate('/admin');
        } catch(error) {
            console.log('Failed to add exam:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="description">Classes: </label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Description" />            </div>
            {/* Add validation message for the description field */}
{!isValidDescription(formData.description) && <div className="error-message">Description must match the format "Major:Number".    <br /> Ex: CS341, ENGL101</div>}

            <div className="form-group">
                <label htmlFor="monStartTime">Monday Start Time:</label>
                <input name="monStartTime" id="monStartTime" type="time" value={formData.monStartTime} onChange={handleChange} placeholder="Monday Start Time" />
                <label htmlFor="monEndTime">Monday End Time:</label>
                <input name="monEndTime" id="monEndTime" type="time" value={formData.monEndTime} onChange={handleChange} placeholder="Monday End Time" />
            </div>
            <div className="form-group">
                <label htmlFor="tueStartTime">Tuesday Start Time:</label>
                <input name="tueStartTime" id="tueStartTime" type="time" value={formData.tueStartTime} onChange={handleChange} placeholder="Tuesday Start Time" />
                <label htmlFor="tueEndTime">Tuesday End Time:</label>
                <input name="tueEndTime" id="tueEndTime" type="time" value={formData.tueEndTime} onChange={handleChange} placeholder="Tuesday End Time" />
            </div>
            <div className="form-group">
                <label htmlFor="wedStartTime">Wednesday Start Time:</label>
                <input name="wedStartTime" id="wedStartTime" type="time" value={formData.wedStartTime} onChange={handleChange} placeholder="Wednesday Start Time" />
                <label htmlFor="wedEndTime">Wednesday End Time:</label>
                <input name="wedEndTime" id="wedEndTime" type="time" value={formData.wedEndTime} onChange={handleChange} placeholder="Wednesday End Time" />
            </div>
            <div className="form-group">
                <label htmlFor="thurStartTime">Thursday Start Time:</label>
                <input name="thurStartTime" id="thurStartTime" type="time" value={formData.thurStartTime} onChange={handleChange} placeholder="Thursday Start Time" />
                <label htmlFor="thurEndTime">Thursday End Time:</label>
                <input name="thurEndTime" id="thurEndTime" type="time" value={formData.thurEndTime} onChange={handleChange} placeholder="Thursday End Time" />
            </div>
            <div className="form-group">
                <label htmlFor="friStartTime">Friday Start Time:</label>
                <input name="friStartTime" id="friStartTime" type="time" value={formData.friStartTime} onChange={handleChange} placeholder="Friday Start Time" />
                <label htmlFor="friEndTime">Friday End Time:</label>
                <input name="friEndTime" id="friEndTime" type="time" value={formData.friEndTime} onChange={handleChange} placeholder="Friday End Time" />
            </div>

            <div className="submitContainer">
                <button type="submit">Submit</button>
            </div>
        </form> 
    );
}

export default FormSection;
