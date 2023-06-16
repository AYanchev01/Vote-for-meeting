import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

type Event = {
  id: string;
  name: string;
  duration: string;
  createdBy: {
    name: string;
  };
};

const UserDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from server 
    fetch('http://localhost:3001/api/user/events')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data fetched: ', data);
        setEvents(data);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleEventClick = (eventId: string) => {
    // Navigate to the EventPage component with the event ID
    navigate(`/events/participate/${eventId}`);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navbar">
        <span className="website-name">Doodle</span>
        <button className="create-event-btn" onClick={handleCreateEvent}>+ Create</button>
      </div>

      {/* Events List */}
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-item" onClick={() => handleEventClick(event.id)}>
            <div className="event-name">{event.name}</div>
            <div className="event-duration">{event.duration}</div>
            <div className="event-creator">{event.createdBy.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
