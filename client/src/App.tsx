import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard/UserDashboard';
import OrganizerPreview from './components/OrganizerPreview/OrganizerPreview';
import EventCreation from './components/EventCreation/EventCreation';
import ParticipantPreview from './components/ParticipantPreview/ParticipantPreview';
import Login from './components/Login/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Login - This is the default route */}
        <Route path="/" element={<Login />} />

        {/* Route for User Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Route for Organizer Preview */}
        <Route path="/events/organizer/:eventId" element={<OrganizerPreview />} />

        {/* Inside your Participant component */}
        <Route path="/events/participant/:eventId" element={<ParticipantPreview />} />

        {/* Route for Event Creation */}
        <Route path="/create-event" element={<EventCreation />} />
      </Routes>
    </Router>
  );
};

export default App;