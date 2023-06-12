import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

type Event = {
  id: number;
  name: string;
  createdBy: {
    name: string;
  };
  createdAt: string;
};

const UserDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from server 
    fetch('http://localhost:3001/api/events')
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

  const handleEventClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
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
            <div className="event-creator">{event.createdBy.name}</div>
            <div className="event-date">{new Date(event.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
