import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import VotingResult from './VotingResult';

const OrganizerPreview: React.FC = () => {
  const [event, setEvent] = useState<any>(null);
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