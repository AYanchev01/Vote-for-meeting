import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventDuration from './EventDuration';
import Calendar from './Calendar';

const EventCreation: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = React.useState<number | 'all-day' | 'custom' | null>(null);
  const [customDuration, setCustomDuration] = React.useState<number>(0);

  const handleDurationSelection = (duration: number | 'all-day' | 'custom') => {
    setSelectedDuration(duration);
  };

  const handleCustomDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = parseInt(event.target.value);
    setCustomDuration(minutes);
  };

  return (
    <div>
      <h1>Add your times</h1>
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