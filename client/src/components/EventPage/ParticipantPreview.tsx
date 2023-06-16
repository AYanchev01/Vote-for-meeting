import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ParticipantPreview.css'
import VotingResult from './VotingResult';

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
        <p>Response submitted!</p>
        <VotingResult voteData={event.voteData} availableTimes={event.availableTimes} />     
        
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