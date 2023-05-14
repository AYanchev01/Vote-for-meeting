import React from 'react';

interface CalendarProps {
  selectedDuration: number | 'all-day' | 'custom' | null;
  customDuration: number;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDuration, customDuration }) => {
  const displayDuration = selectedDuration === 'custom' ? `${customDuration} minutes` : selectedDuration;

  return (
    <div>
      <h1>Calendar Component</h1>
      <p>Selected Duration: {displayDuration}</p>
      {/* Rest of the Calendar component */}
    </div>
  );
};

export default Calendar;
