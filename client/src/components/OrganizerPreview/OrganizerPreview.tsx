import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import {CopyToClipboard} from 'react-copy-to-clipboard';
import './OrganizerPreview.css'
//import { useNavigate } from 'react-router-dom';


const OrganizerPreview: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null);
  // const eventLink = `http://localhost:3000/events/participant/${eventId}`;
  // const [copied, setCopied] = useState(false);   
  // const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${eventId}`)    //     /api/events/${eventId}
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
      <div className="navbar">
        <span className="website-name">Doodle</span>
      </div> 
      <h1>Organizer Preview</h1>
      {/* <p>Name: {event.name}</p>
      <p>Created By: {event.createdBy.name}</p> */}
      {/* <p>Created At: {new Date(event.createdAt).toLocaleDateString()}</p> */}
      {/* <p>Duration: {event.duration}</p>
      <p>Invite participants:</p>
      <button className="inv-button" title="Click to copy invitation link"> Copy link</button>  add onClick "copy to clipboard" logic */}
      {/* <CopyToClipboard text={eventLink} onCopy={handleCopyLink}>
        <button>Copy link</button>
      </CopyToClipboard> */}
    </div>
  );
};

export default OrganizerPreview;