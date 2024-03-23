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
      const _2ndStart = moment(start).format('dddd, h:mm A');
      const _2ndEnd = moment(end).format('dddd, h:mm A');
      const userIsSure = window.confirm(`Are you sure of this time?\n\nStart: ${_2ndStart}\nEnd: ${_2ndEnd}`);
      if (userIsSure) {
        // prev is an array
        setEvents((prev) => [
          ...prev,
          { id: prev.length, start, end },
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
/*
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
 }, [myEvents]);*/

/*
This converts
        start: new Date(2023, 0, 2, 14, 0), 
        end: new Date(2023, 0, 2, 15, 0),
      To
        start: "Sunday, 09:00",
        end: "10:00"
      
*/
 const handleSendToBackend = useCallback(() => {
  setIsLoading(true);

  // Create a new array of events with formatted start and end times
  const formattedEvents = myEvents.map(event => ({
      ...event,
      start: moment(event.start).format('dddd, HH:mm'),
      end: moment(event.end).format('dddd, HH:mm'),
  }));

  // Send the formatted events to the backend
  axios.post('http://localhost:9000/sentTimes', { events: formattedEvents })
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
      // Why 2023? Seems that there's a specific way of how they store dates. Like if you put 2024, the first day of the calender is 31th of the previous year ... Think it's best to keep a 2023 for starting at 1
        defaultDate={new Date(2023, 0, 1)}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={new Date(1970, 1, 1, 6)}
        toolbar={false}
        // dont worry about 1970, seems to be perfectly alright
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
