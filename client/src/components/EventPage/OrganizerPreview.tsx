import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import VotingResult from './VotingResult';
import './OrganizerPreview.css';


type EventData = {
  id: string;
  votes: {
    userName: string;
    selectedTimes: string[];
  }[];
  availableTimes: string[];
};
type OrganizerPreviewProps = {
  event: EventData;
};

const OrganizerPreview: React.FC<OrganizerPreviewProps> = () => {
  const [event, setEvent] = useState<EventData | null>(null);
  const { eventId } = useParams<{ eventId: string }>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${eventId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched event data:', data);
        setEvent(data);
        console.log('Updated event data:', event);
      })
      .catch((error) => console.error('There has been a problem with your fetch operation:', error));
  }, [eventId]);

  if (!event) {
    return <div>Loading event information...</div>;
  }

  const handleCopy = () => {
    setCopied(true);
  };

  return (
    <div>
      <div className="invite-link">
        <p>Invitation link:</p>
        <CopyToClipboard text={`http://localhost:3000/events/${eventId}`} onCopy={handleCopy}>
          <button className="link-button">Copy Link</button>
        </CopyToClipboard>
      </div>
      {copied && <p className="copied-to">Link copied to clipboard!</p>}
      <VotingResult voteData={event.votes} availableTimes={event.availableTimes} />
    </div>
  );
};

export default OrganizerPreview;