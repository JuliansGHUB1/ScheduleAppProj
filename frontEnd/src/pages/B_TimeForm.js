import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './B_TimeForm.css';
import axios from 'axios';

// Create a localizer using moment
const localizer = momentLocalizer(moment);


function TimeForm() {

 const [myEvents, setEvents] = useState([]);
 const [selectedEvent, setSelectedEvent] = useState(null);
 const [isLoading, setIsLoading] = useState(false);

 // Define deleteEvent first
 const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
 }, []);

 const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event Name');
      if (title) {
        setEvents((prev) => [
          ...prev,
          { id: prev.length, start, end, title },
        ]);
      }
    },
    [setEvents]
 );

 const handleSelectEvent = useCallback(
    (event) => {
      setSelectedEvent(event);
      // Show a confirmation dialog to delete the event
      if (window.confirm(`Do you want to delete the event: ${event.title}?`)) {
        deleteEvent(event.id);
      }
    },
    [deleteEvent] // Ensure deleteEvent is listed as a dependency
 );

 const handleSendToBackend = useCallback(() => {
    setIsLoading(true);
    axios.post('http://localhost:9000/saveEvents', { events: myEvents })
      .then(response => {
        console.log('Events sent to backend successfully:', response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error sending events to backend:', error);
        setIsLoading(false);
      });
 }, [myEvents]);

 useEffect(() => {
  console.log(myEvents);
}, [myEvents]);

 return (
  <div>
    <div className="height800">
      {/* Add a message at the top */}
      <div className="plead-message">
        Please go click and drag slowly, bugs if you do it too fast 🥺.
      </div>
      <Calendar
        defaultDate={new Date(2015, 3, 12)}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={new Date(1970, 1, 1, 6)}
        toolbar={false}
        min={new Date(1970, 1, 1, 8)} // Start at 8 AM
        max={new Date(1970, 1, 1, 23)} // End at 8 PM
      />
      <button className="UpdateButton" onClick={handleSendToBackend}>Update</button>
    </div>
    {/* Loading indicator */}
    {isLoading && (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    )}
    </div>
 );
}

// testing performances of animation
/*const handleSendToBackend = () => {
  setIsLoading(true); // Set loading to true at the beginning
  setTimeout(() => {
    setIsLoading(false);
  }, 5000)
 };*/

export default TimeForm;
