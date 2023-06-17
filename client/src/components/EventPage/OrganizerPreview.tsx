import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';                //to fix error
import { CopyToClipboard } from 'react-copy-to-clipboard';
import VotingResult from './VotingResult';

type EventData = {
  id: string;          //types?
  name: string;          //types?
};

type OrganizerPreviewProps = {
  event: EventData;
};
const OrganizerPreview: React.FC<OrganizerPreviewProps> = () => {
  const [event, setEvent] = useState<any>(null);
  const { eventId } = useParams<{ eventId: string }>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fetch the event information from your server
    fetch(`http://localhost:3001/api/events/${eventId}`)               //rework
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setEvent(data))
      .catch((error) => console.error('There has been a problem with your fetch operation:', error));
  }, []);

  if (!event) {
    return <div>Loading event information...</div>;
  }

  const handleCopy = () => {
    setCopied(true);
  };

  return (
    <div>
      <p>Invitation link:</p>
      <CopyToClipboard text={`http://localhost:3000/events/${event.eventId}`} onCopy={handleCopy}>
        <button>Copy Link</button>
      </CopyToClipboard>
      {copied && <p>Link copied to clipboard!</p>}

      <VotingResult voteData={event.voteData} availableTimes={event.availableTimes} />
    </div>
  );
};

export default OrganizerPreview;