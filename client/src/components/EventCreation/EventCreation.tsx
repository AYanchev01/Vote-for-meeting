import React from 'react';
import EventDuration from './EventDuration';
import Calendar from './Calendar';
import './EventCreation.css'

const EventCreation: React.FC = () => {
  const [eventName, setEventName] = React.useState<string>(''); // State for storing the event name
  const [selectedDuration, setSelectedDuration] = React.useState<number | 'all-day' | 'custom' | null>(null);
  const [customDuration, setCustomDuration] = React.useState<number>(0);

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
    </div>
  );
};

export default EventCreation;