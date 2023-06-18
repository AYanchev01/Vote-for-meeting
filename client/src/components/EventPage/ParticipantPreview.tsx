import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VotingResult from './VotingResult';

type EventData = {
  id: string;
  name: string;
  availableTimes: Date[];
  votes: {
    votedBy: {
      id: string;
      name: string;
    };
    selectedTimes: Date[];
  }[];
};

type ParticipantPreviewProps = {
  event: EventData;
};

const ParticipantPreview: React.FC<ParticipantPreviewProps> = ({ event  }) => {
  const [eventd, setEvent] = useState<EventData | null>(null);
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const headers = new Headers();
    headers.append('x-auth-token', token || '');

    fetch(`http://localhost:3001/api/events/${eventId}`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setEvent(data))
      .catch((error) => console.error('There has been a problem with your fetch operation:', error));
  }, []);

  if (!eventd) {
    return <div>Loading event information...</div>;
  }

  
  return (
    <div>
      <h1>Response submitted!</h1>
      <p>Results:</p>
      {/* <VotingResult voteData={eventData.voteData} availableTimes={eventData.availableTimes} />   */}
    </div>
  );
};

export default ParticipantPreview;
