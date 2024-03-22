import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FormSection from './components/FormSection';
import ResponseSection from './components/ResponseSection';
import HelpSection from './components/HelpSection';
import SchedulePage from './pages/SchedulePage';
import AllSchedulesPage from './pages/AllSchedulesPage';


import ClassForm from './components/FORMforClass';
import TimeForm from './components/FORMforTime';


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
