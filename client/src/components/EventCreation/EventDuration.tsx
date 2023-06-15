import React, { useState } from 'react';
import "./EventDuration.css";

interface DurationProps {
  onDisplayDurationChange: (displayDuration: string) => void;
}

const EventDuration: React.FC<DurationProps> = ({ onDisplayDurationChange }) => {
  const [selectedDuration, setSelectedDuration] = useState<number | 'all-day' | 'custom' | null>(null);
  const [customDuration, setCustomDuration] = useState<number>(0);

  const handleDurationSelection = (duration: number | 'all-day' | 'custom') => {
    setSelectedDuration(duration);
    let displayDuration = '';

    if (duration === 'all-day') {
      displayDuration = 'All Day';
    } else if (duration === 'custom') {
      displayDuration = `${customDuration} minutes`;
    } else {
      displayDuration = `${duration} minutes`;
    }

    onDisplayDurationChange(displayDuration);
  };

  const handleCustomDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = parseInt(event.target.value);
    setCustomDuration(minutes);
    if (selectedDuration === 'custom') {
      onDisplayDurationChange(`${minutes} minutes`);
    }
  };

  return (
    <div>
      <h2>Duration:</h2>
      <div className="event-duration-options">
        <button
          className={`duration-option ${selectedDuration === 15 ? 'selected' : ''}`}
          onClick={() => handleDurationSelection(15)}
        >
          15 minutes
        </button>
        <button
          className={`duration-option ${selectedDuration === 30 ? 'selected' : ''}`}
          onClick={() => handleDurationSelection(30)}
        >
          30 minutes
        </button>
        <button
          className={`duration-option ${selectedDuration === 60 ? 'selected' : ''}`}
          onClick={() => handleDurationSelection(60)}
        >
          60 minutes
        </button>
        <button
          className={`duration-option ${selectedDuration === 'all-day' ? 'selected' : ''}`}
          onClick={() => handleDurationSelection('all-day')}
        >
          All Day
        </button>
        <button
          className={`duration-option ${selectedDuration === 'custom' ? 'selected' : ''}`}
          onClick={() => handleDurationSelection('custom')}
        >
          Custom
        </button>
        {selectedDuration === 'custom' && (
          <>
            <input
              type="number"
              value={customDuration}
              onChange={handleCustomDurationChange}
              placeholder="Enter custom duration"
            />
            <span>minutes</span>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDuration;
