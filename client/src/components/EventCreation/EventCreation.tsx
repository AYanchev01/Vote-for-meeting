import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventDuration from './EventDuration';
import Calendar from './Calendar';
import './EventCreation.css'

const EventCreation: React.FC = () => {
  const [eventName, setEventName] = useState<string>('');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [startTimeInputs, setStartTimeInputs] = useState<{ [key: string]: string[] }>({});
 
  const [displayDuration, setDisplayDuration] = useState<string>('');
  const navigate = useNavigate();

  const handleEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

  const handleCreateEvent = () => {
      // Combine date portions with time portions to create DateTime[] array
      const availableTimes: Date[]= [];

      selectedDates.forEach((date) => {
          const dateISOString = date.toISOString();
          const timeArray = startTimeInputs[dateISOString];
          if (timeArray) {
              timeArray.forEach((time) => {
                  const [hours, minutes] = time.split(':');
                  const dateTime = new Date(date);
                  dateTime.setUTCHours(Number(hours));
                  dateTime.setUTCMinutes(Number(minutes));
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
      body: JSON.stringify(event)
    })
      .then(response => response.json())
      .then(newEvent => {
        navigate(`/events/${newEvent.id}`);
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
        onDisplayDurationChange={(displayDuration) => setDisplayDuration(displayDuration)}
      />
      <Calendar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        startTimeInputs={startTimeInputs}
        setStartTimeInputs={setStartTimeInputs}
      />
      {/* Button to create event */}
      <button
        className="finish-creation"
        onClick={handleCreateEvent}>Finish Creation</button>
    </div>
  );
};

export default EventCreation;