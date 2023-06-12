import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard/UserDashboard';
import EventPreview from './components/EventPreview/EventPreview';
import EventCreation from './components/EventCreation/EventCreation';
import Login from './components/Login/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Login - This is the default route */}
        <Route path="/" element={<Login />} />

        {/* Route for User Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Route for Event Preview */}
        <Route path="/events/:eventId" element={<EventPreview />} />

        {/* Route for Event Creation */}
        <Route path="/create-event" element={<EventCreation />} />
      </Routes>
    </Router>
  );
};

export default App;
