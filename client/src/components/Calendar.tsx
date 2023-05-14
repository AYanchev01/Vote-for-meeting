import React, { useState } from 'react';
import './Calendar.css';

const timeOptions: string[] = [];

for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 15) {
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    timeOptions.push(`${formattedHour}:${formattedMinute}`);
  }
}

interface CalendarProps {
  selectedDuration: number | 'all-day' | 'custom' | null;
  customDuration: number;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDuration, customDuration }) => {
  const displayDuration = selectedDuration === 'custom' ? `${customDuration} minutes` : selectedDuration;
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [startTimeInputs, setStartTimeInputs] = useState<{ [key: string]: string[] }>({});
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const handleAddStartTime = (date: Date) => {
    setStartTimeInputs({
      ...startTimeInputs,
      [date.toISOString()]: [...(startTimeInputs[date.toISOString()] ?? []), '']
    });
  };

  const handleDeleteStartTime = (date: Date, index: number) => {
    setStartTimeInputs({
      ...startTimeInputs,
      [date.toISOString()]: startTimeInputs[date.toISOString()].filter((_, i) => i !== index)
    });
  };

  const handleStartTimeChange = (date: Date, index: number, value: string) => {
    setStartTimeInputs({
      ...startTimeInputs,
      [date.toISOString()]: startTimeInputs[date.toISOString()].map((time, i) => (i === index ? value : time))
    });
  };


const handleDateClick = (date: Date) => {
  const isDateSelected = selectedDates.some((selectedDate) => selectedDate.toDateString() === date.toDateString());

  if (isDateSelected) {
    // If the date is already selected, remove it and its associated starting times
    const updatedSelectedDates = selectedDates.filter((selectedDate) => selectedDate.toDateString() !== date.toDateString());
    setSelectedDates(updatedSelectedDates);
    setStartTimeInputs((prevStartingTimes) => {
      const updatedStartingTimes = { ...prevStartingTimes };
      delete updatedStartingTimes[date.toISOString()];
      return updatedStartingTimes;
    });
  } else {
    // If the date is not selected, add it and initialize its starting times to an empty array
    setSelectedDates([...selectedDates, date]);
    setStartTimeInputs((prevStartingTimes) => {
      const updatedStartingTimes = { ...prevStartingTimes };
      updatedStartingTimes[date.toISOString()] = [];
      return updatedStartingTimes;
    });
  }
};


const renderCalendar = () => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startingDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarRows: JSX.Element[] = [];
  let calendarDays: JSX.Element[] = [];

  // add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(<td key={`empty-${i}`}></td>);
  }

  // generate cells for each day in the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isSelectable = date >= currentDate; // only allow selecting dates after today
    const isSelected = selectedDates.some((selectedDate) => selectedDate.toDateString() === date.toDateString());
    const isBeforeCurrentDate = date < currentDate; 

    const classNames = `calendar-day ${isSelectable ? 'selectable' : ''} ${isSelected ? 'selected' : ''} ${isBeforeCurrentDate ? 'before-current-date' : ''}`;

    calendarDays.push(
      <td
        key={day}
        className={classNames}
        onClick={() => isSelectable && handleDateClick(date)}
      >
        {day}
      </td>
    );

    // start a new row every 7 days
    if (calendarDays.length === 7) {
      calendarRows.push(<tr key={day}>{calendarDays}</tr>);
      calendarDays = [];
    }
  }

  // add remaining empty cells for the last row
  if (calendarDays.length > 0) {
    for (let i = calendarDays.length; i < 7; i++) {
      calendarDays.push(<td key={`empty-${i}`}></td>);
    }
    calendarRows.push(<tr key="lastRow">{calendarDays}</tr>);
  }

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={7}>{monthNames[currentMonth]} {currentYear}</th>
        </tr>
        <tr>
          {daysOfWeek.map(day => (
            <th key={day}>{day.slice(0, 3)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {calendarRows}
      </tbody>
    </table>
  );
};


  return (
    <div>
      <h2>Dates</h2>
      <div className="calendar">
        {renderCalendar()}
      </div>
      <h2>Selected Dates:</h2>
      <ul>
        {selectedDates.map((date) => (
          <li key={date.toISOString()}>
            <div>{date.toDateString()}</div>
            {startTimeInputs[date.toISOString()]?.map((time, i) => (
              <div key={i}>
                <select
                  value={time}
                  onChange={(e) => handleStartTimeChange(date, i, e.target.value)}
                >
                  {timeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleDeleteStartTime(date, i)}>Delete</button>
              </div>
            ))}
            <button onClick={() => handleAddStartTime(date)}>Add starting time</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
