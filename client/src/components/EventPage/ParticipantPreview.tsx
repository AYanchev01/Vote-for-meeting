import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ParticipantPreview.css'

const ParticipantPreview: React.FC = () => {
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
      {/* <h1>Participant Preview</h1> */}
      <p>Name: {event.name}</p>
      <p>Created By: {event.createdBy.name}</p>
      {/* <p>Created At: {new Date(event.createdAt).toLocaleDateString()}</p> */}
      <p>Duration: {event.duration}</p>

      {/* then if check for voted or not and based on that we generate what we need for the bottom part of the page? or two separate pages with 
      two separate URLs,                     i think its better to do it in the dashboard when we choose where to go to */}

      {/* <div>
      {user.votedFor.length === 0 ? (
        <VotingPage eventId={eventId} />
      ) : (
        <PreviewPage eventId={eventId} />
      )} */}


    </div>
  );
};

export default ParticipantPreview;