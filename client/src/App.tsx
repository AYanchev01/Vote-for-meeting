import React, { useState } from 'react';
import EventDuration from './components/EventDuration';
import Calendar from './components/Calendar';

const App: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<number | 'all-day' | 'custom' | null>(null);
  const [customDuration, setCustomDuration] = useState<number>(0);

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

export default App;
