import React from 'react';

type EventInformationProps = {
  name: string;
  creator: string;
  duration: string;
};

const EventInformation: React.FC<EventInformationProps> = ({ name, creator, duration }) => {
  return (
    <div>
      <h2>Event Information</h2>
      <p>Name: {name}</p>
      <p>Creator: {creator}</p>
      <p>Duration: {duration}</p>
    </div>
  );
};

export default EventInformation;