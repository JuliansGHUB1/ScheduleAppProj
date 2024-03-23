import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/A_Header';
import ResponseSection from './pages/B_ClassFormByFile';
import HelpSection from './pages/C_HelpSection';
import SchedulePage from './pages/X_SchedulePage';
import AllSchedulesPage from './pages/X_AllSchedulesPage';
import ClassForm from './pages/B_ClassFormByManual';
import TimeForm from './pages/B_TimeForm';


function App() {
 return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ClassForm />} />
          <Route path = "/TimeForm" element = {<TimeForm/>}/>
          <Route path="/help" element={<HelpSection />} />
          <Route path="/response" element={<ResponseSection />} />
          <Route path="/all-schedules" element={<AllSchedulesPage />} />
          <Route path="/schedule/" element={<SchedulePage />} />
        </Routes>
      </div>
    </Router>
 );
}

export default App;
