// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file

function Header() {
  return (
    <div className="header">
      <h1>UMB Class Scheduler</h1>
      <nav>
        <ul>
          <li><Link to="/">(ClassesForm)</Link></li>
          <li><Link to="/TimeForm">(TimeForm)</Link></li>
          <li><Link to="/help">Help</Link></li>
          <li><Link to="/response">Response</Link></li>
          <li><Link to="/all-schedules">All Schedules</Link></li>
          <li><Link to="/schedule">Schedule</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
