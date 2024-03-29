import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard/UserDashboard';
import EventPage from './components/EventPage/EventPage';
import EventCreation from './components/EventCreation/EventCreation';
import Login from './components/Login/Login';
import { Register } from './components/Register/Register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Login - This is the default route */}
        <Route path="/" element={<Login />} />

        {/* Route for Register*/}
        <Route path='/register' element={<Register/>} />
        
        {/* Route for User Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Route for Event Page*/}
        <Route path="/events/:eventId" element={<EventPage/>} />

        {/* Route for Event Creation */}
        <Route path="/create-event" element={<EventCreation />} />
      </Routes>
    </Router>
  );
};

export default App;