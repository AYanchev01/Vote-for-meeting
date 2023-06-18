import React from 'react';
import './EventInformation.css';

type EventInformationProps = {
  name: string;
  creator: string;       
  duration: string;
};

const EventInformation: React.FC<EventInformationProps> = ({ name, creator, duration }) => {
  return (
    <div className='event-info'>
      <h2> Event Details</h2>
      <p><b>👤 {creator}</b> is organizing</p>
      <p><b>📅 {name}</b></p>
      <p>🕒 Duration: <b>{duration}</b></p>
    </div>
  );
};

export default EventInformation;