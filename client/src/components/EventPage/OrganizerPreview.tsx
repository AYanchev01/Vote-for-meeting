import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';                //to fix error
import { CopyToClipboard } from 'react-copy-to-clipboard';
import VotingResult from './VotingResult';
import './OrganizerPreview.css';

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
    const token = localStorage.getItem('accessToken');
    const headers = new Headers();
    headers.append('x-auth-token', token || '');

    // Fetch the event information from your server
    fetch(`http://localhost:3001/api/events/${eventId}`, { headers })               //rework
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
      <div className='invite-link'>
        <p>Invitation link:</p>
        <CopyToClipboard text={`http://localhost:3000/events/${eventId}`} onCopy={handleCopy}>
          <button className='link-button'>Copy Link</button>
        </CopyToClipboard>
      </div>
      {copied && <p className='copied-to'>Link copied to clipboard!</p>}

      <VotingResult voteData={event.voteData} availableTimes={event.availableTimes} />
    </div>
  );
};

export default OrganizerPreview;