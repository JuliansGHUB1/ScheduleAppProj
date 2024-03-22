import React, { useState, useCallback } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Create a localizer using moment
const localizer = momentLocalizer(moment);

function TimeForm() {
 const [myEvents, setEvents] = useState([]);

 const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event Name');
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
 );

 const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
 );

 return (
    <div className="height800">
      <Calendar
        dayLayoutAlgorithm="no-overlap"
        defaultDate={new Date(2015, 3, 12)}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={new Date(1970, 1, 1, 6)}
      />
    </div>
 );
}

export default TimeForm