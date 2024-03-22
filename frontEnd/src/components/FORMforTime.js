import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './FORMforTime.css';
import axios from 'axios';

// Create a localizer using moment
const localizer = momentLocalizer(moment);

function TimeForm() {
 const [myEvents, setEvents] = useState([]);
 const [selectedEvent, setSelectedEvent] = useState(null);

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
    axios.post('http://localhost:9000/saveEvents', { events: myEvents })
      .then(response => {
        console.log('Events sent to backend successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending events to backend:', error);
      });
 }, [myEvents]);

 useEffect(() => {
    console.log(myEvents);
 }, [myEvents]);

 return (
    <div className="height800">
      {/* Add a message at the top */}
      <div style={{ marginBottom: '20px', fontSize: '18px', color: 'red' }}>
        Please go slowly, bugs if you do it too fast.
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
      />
      <button onClick={handleSendToBackend}>Send to Backend</button>
    </div>
 );
}

export default TimeForm;
