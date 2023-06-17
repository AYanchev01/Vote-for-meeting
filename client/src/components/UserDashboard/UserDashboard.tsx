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
  const [searchText, setSearchText] = useState('');
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
    navigate(`/events/${eventId}`);
  };

  // Filter events based on search text
  const filteredEvents = events.filter(event => event.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navbar">
        <span className="website-name">Doodle</span>
        <button className="create-event-btn" onClick={handleCreateEvent}>+ Create</button>
      </div>

      {/* Events List */}
      <div className="events-list">
        <div className="events-list-header">
          <h1>Your events</h1>
          <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          </div>
        </div>

        {filteredEvents.map((event) => (
          <div key={event.id} className="event-item" onClick={() => handleEventClick(event.id)}>
            <div className="event-name">{event.name}</div>
            <div className="event-duration">
              Duration: <span className="event-duration-value">{event.duration}</span>
            </div>
            <div className="event-creator">Organizer: {event.createdBy.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
