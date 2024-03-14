import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FormSection from './components/FormSection';
import ResponseSection from './components/ResponseSection';
import HelpSection from './components/HelpSection';
import SchedulePage from './pages/SchedulePage';
import AllSchedulesPage from './pages/AllSchedulesPage';
import DelTest from './components/DelTest';
import Footer from './components/Footer';

function App() {
 return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<FormSection />} />
          <Route path = "/test" element = {<DelTest/>}/>
          <Route path="/help" element={<HelpSection />} />
          <Route path="/response" element={<ResponseSection />} />
          <Route path="/all-schedules" element={<AllSchedulesPage />} />
          <Route path="/schedule/" element={<SchedulePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
 );
}

export default App;
