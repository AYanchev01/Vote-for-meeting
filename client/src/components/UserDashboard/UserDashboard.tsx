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
  userId: string;
};

const UserDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from server
    const token = localStorage.getItem('accessToken');
    const headers = new Headers();
    headers.append('x-auth-token', token || '');

    fetch('http://localhost:3001/api/user/events', { headers })
      .then(response => {
        if (response.status === 401) {
          return;
        }
        return response.json();
      })
      .then(data => {
        console.log('Data fetched: ', data);
        setEvents(data.events);
        setUserId(data.userId);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };


  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = new Headers();
        headers.append('x-auth-token', token || '');
  
        const response = await fetch(`http://localhost:3001/api/events/${eventId}`, {
          method: 'DELETE',
          headers: headers,
        });
  
        if (response.ok) {
          await response.json();
  
          // Event deleted successfully, now update the events state
          setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        } else {
          console.error('Failed to delete the event.');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
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
          <div key={event.id} className="event-item">
            <div className="event-content" onClick={() => handleEventClick(event.id)}>
              <div className="event-name">{event.name}</div>
              <div className="event-duration">
                Duration: <span className="event-duration-value">{event.duration}</span>
              </div>
              <div className="event-creator">Organizer: {event.createdBy.name}</div>
            </div>
            {event.userId === userId && (
              <button className="delete-event-btn" aria-label="Delete event" onClick={() => handleDeleteEvent(event.id)}>
                🗑️ Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
