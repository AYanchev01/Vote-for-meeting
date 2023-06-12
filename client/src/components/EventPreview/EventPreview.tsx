import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventPreview: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${eventId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setEvent(data))
      .catch((error) => console.error('There has been a problem with your fetch operation:', error));
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Event Preview</h1>
      <p>Name: {event.name}</p>
      <p>Created By: {event.createdBy.name}</p>
      <p>Created At: {new Date(event.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default EventPreview;
