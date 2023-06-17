import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventDuration from './EventDuration';
import Calendar from './Calendar';
import './EventCreation.css';

const EventCreation: React.FC = () => {
  const [eventName, setEventName] = useState<string>('');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [startTimeInputs, setStartTimeInputs] = useState<{ [key: string]: string[] }>({});
  const [displayDuration, setDisplayDuration] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

const handleCreateEvent = () => {
  setErrorMessage(null);

  if (!eventName) {
    setErrorMessage('Event title is required.');
    return;
  }

  if (!displayDuration) {
    setErrorMessage('Event duration is required.');
    return;
  }

  if (selectedDates.length === 0) {
    setErrorMessage('You must select at least one date.');
    return;
  }

  // Check that all selected dates have times associated with them
  const allDatesHaveTimes = selectedDates.every(date => {
    const dateISOString = date.toISOString();
    return startTimeInputs[dateISOString] && startTimeInputs[dateISOString].length > 0;
  });

  if (!allDatesHaveTimes) {
    setErrorMessage('All selected dates must have times associated with them.');
    return;
  }

  // Combine date portions with time portions to create DateTime[] array
    const availableTimes: Date[]= [];

    selectedDates.forEach((date) => {
        const dateISOString = date.toISOString();
        const timeArray = startTimeInputs[dateISOString];
        if (timeArray) {
            timeArray.forEach((time) => {
                const [hours, minutes] = time.split(':');
                const dateTime = new Date(date);
                dateTime.setHours(Number(hours)); 
                dateTime.setMinutes(Number(minutes));

                // Compensate for the time zone offset
                const offsetInMinutes = dateTime.getTimezoneOffset();
                dateTime.setMinutes(dateTime.getMinutes() - offsetInMinutes);

                availableTimes.push(dateTime);
            });
        }
    });

    const event = {
        name: eventName,
        duration: displayDuration,
        availableTimes,
    };

    // POST request to create a new event
    fetch('http://localhost:3001/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then((newEvent) => {
        navigate(`/events/${newEvent.id}`);
      })
      .catch((error) => console.error('Error creating event:', error));
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
        onDisplayDurationChange={(displayDuration) => setDisplayDuration(displayDuration)}
      />
      <Calendar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        startTimeInputs={startTimeInputs}
        setStartTimeInputs={setStartTimeInputs}
      />
      {/* Button to create event */}
      <button className="finish-creation" onClick={handleCreateEvent}>
        Finish Creation
      </button>
      {/* Error message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default EventCreation;