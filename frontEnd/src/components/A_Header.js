// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './A_Header.css'; // Import your CSS file

function Header() {
  return (
    <div className="header">
      <h1>UMB Class Scheduler</h1>
      <nav>
        <ul>
          <li><Link to="/">(ClassesByForm)</Link></li>
          <li><Link to="/degreeAudit">(ClassesByDegreeAudit)</Link></li>
          <li><Link to="/TimeForm">(TimeForm)</Link></li>
          <li><Link to="/help">(Help)</Link></li>
          <li><Link to="/tempNotes">(...Notes...)</Link></li>
          <li><Link to="/schedule">(builtSchedules)</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
