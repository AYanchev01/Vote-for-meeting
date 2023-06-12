import React, { useState } from 'react';
import "./EventDuration.css"

interface DurationProps {
  onSelectDuration: (duration: number | 'all-day' | 'custom') => void;
  onCustomDurationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customDuration: number;
}

const EventDuration: React.FC<DurationProps> = ({ onSelectDuration, onCustomDurationChange, customDuration }) => {
  const [selectedDuration, setSelectedDuration] = useState<number | 'all-day' | 'custom' | null>(null);

  const handleDurationSelection = (duration: number | 'all-day' | 'custom') => {
    setSelectedDuration(duration);
    onSelectDuration(duration);
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
              onChange={onCustomDurationChange}
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
