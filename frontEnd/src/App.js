import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/A_Header';

import ClassSubmissionByFilebyForm from './pages/B_ClassFormByManual';
import ClassSubmissionByFile from './pages/B_ClassFormByFile';
import TimeSubmission from './pages/B_TimeForm';

import HelpSection from './pages/C_HelpSection';

import SchedulePage from './pages/X_SchedulePage';
import AllSchedulesPage from './pages/X_tempNotes';


function App() {
 return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ClassSubmissionByFilebyForm />} />
          <Route path="/degreeAudit" element={<ClassSubmissionByFile />} />
          <Route path = "/TimeForm" element = {<TimeSubmission/>}/>
          <Route path="/help" element={<HelpSection />} />
          <Route path="/tempNotes" element={<AllSchedulesPage />} />
          <Route path="/schedule/" element={<SchedulePage />} />
        </Routes>
      </div>
    </Router>
 );
}

export default App;
