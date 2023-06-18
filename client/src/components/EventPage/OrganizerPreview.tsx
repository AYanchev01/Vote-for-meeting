import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import VotingResult from './VotingResult';
import './OrganizerPreview.css';

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

type OrganizerPreviewProps = {
  event: EventData;
};

const OrganizerPreview: React.FC<OrganizerPreviewProps> = ({ event  }) => {
  const [eventd, setEvent] = useState<EventData | null>(null);
  const { eventId } = useParams<{ eventId: string }>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const headers = new Headers();
    headers.append('x-auth-token', token || '');

    // Fetch the event information from your server
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

      {/* {eventd && <VotingResult event={eventd} />} */}
    </div>
  );
};

export default OrganizerPreview;
