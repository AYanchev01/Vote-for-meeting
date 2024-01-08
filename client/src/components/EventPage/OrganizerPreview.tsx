import React, { useState } from 'react';
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
  const { eventId } = useParams<{ eventId: string }>();
  const [copied, setCopied] = useState(false);
  
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
      {event  && <VotingResult event={event} />}
    </div>
  );
};

export default OrganizerPreview;
