import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventDuration from './EventDuration';
import Calendar from './Calendar';
import './EventCreation.css'

const EventCreation: React.FC = () => {
  const [eventName, setEventName] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<number | 'all-day' | 'custom' | null>(null);
  const [customDuration, setCustomDuration] = useState<number>(0);
  const navigate = useNavigate();

  const handleDurationSelection = (duration: number | 'all-day' | 'custom') => {
    setSelectedDuration(duration);
  };

  const handleCustomDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = parseInt(event.target.value);
    setCustomDuration(minutes);
  };

  const handleEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

  const handleCreateEvent = () => {
    // Create the event object
    const event = {
      name: eventName,
      duration: selectedDuration,
      customDuration : customDuration
    };

    // POST request to create a new event
    fetch('http://localhost:3001/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    })
      .then(response => response.json())
      .then(newEvent => {
        // Navigate to the new event's page
        navigate(`/events/organizer/${newEvent.id}`);
      })
      .catch(error => console.error('Error creating event:', error));
  };

  return (
    <div>
      <div className="navbar">
        <span className="website-name">Doodle</span>
      </div>
      <h1>Create a group poll</h1>
      <h2>Title</h2>
      <input
        className="event-name-input"
        type="text"
        value={eventName}
        onChange={handleEventNameChange}
        placeholder="What's the occasion ?"
      />
      <EventDuration
        onSelectDuration={handleDurationSelection}
        onCustomDurationChange={handleCustomDurationChange}
        customDuration={customDuration}
      />
      <Calendar selectedDuration={selectedDuration} customDuration={customDuration} />
      {/* Button to create event */}
      <button
        className="finish-creation"
        onClick={handleCreateEvent}>Finish Creation</button>
    </div>
  );
};

export default EventCreation;