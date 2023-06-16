import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './OrganizerPreview.css'


const OrganizerPreview: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null); 

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
/////////////////////////////////////////////////////////////////////////////////////////////////////////
  const eventLink = `http://localhost:3001/events/participate/${eventId}`;
  const [copied, setCopied] = useState(false);  

  const handleCopyLink = () => {
    const link = `http://localhost:3001/api/events/participate/${eventId}`;   //but how will we know if we should go to preview or voting link/ maybe default is preview  
    navigator.clipboard.writeText(link)
      .then(() => {
        console.log('Link copied to clipboard:', link);
      })
      .catch((error) => {
        console.error('Failed to copy link to clipboard:', error);
      });
  };
/////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="navbar">
        <span className="website-name">Doodle</span>
      </div> 
      <h1>Organizer Preview</h1>
      <p>Name: {event.name}</p>
      <p>Created By: {event.createdBy.name}</p>
      <p>Created At: {new Date(event.createdAt).toLocaleDateString()}</p>
      <p>🕒 Duration: {event.duration}</p>
      <p>Invite participants:</p>
      <button className="inv-button" title="Click to copy invitation link"> Copy link</button>  add onClick "copy to clipboard" logic
      <CopyToClipboard text={eventLink} onCopy={handleCopyLink}>
        <button>Copy link</button>
      </CopyToClipboard>
    </div>
  );
};

export default OrganizerPreview;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './OrganizerPreview.css';

// const OrganizerPreview: React.FC = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   const [event, setEvent] = useState<any>(null);

//   useEffect(() => {
//     fetch(`http://localhost:3001/api/events/${eventId}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => setEvent(data))
//       .catch((error) => console.error('There has been a problem with your fetch operation:', error));
//   }, [eventId]);

//   const sortVotesByCount = (votes: any[]) => {
//     return votes.sort((a, b) => b.selectedTimes.length - a.selectedTimes.length);
//   };

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   const sortedVotes = sortVotesByCount(event.votes);

//   return (
//     <div>
//       <div className="navbar">
//         <span className="website-name">Doodle</span>
//       </div>
//       <h1>Event {event.name} </h1>
//       <p>Name: {event.name}</p>
//       <p>Created By: {event.createdBy.name}</p>
//       <p>🕒Duration: {event.duration}</p>

      // <button className="inv-button" title="Click to copy invitation link"> Copy link</button>  add onClick "copy to clipboard" logic
      // <CopyToClipboard text={eventLink} onCopy={handleCopyLink}>
      //   <button>Copy link</button>
      // </CopyToClipboard>

//       <h2>List of Votes/Results</h2>
//       {sortedVotes.map((vote: any) => (              //⭐ for most voted
//         <div key={vote.id} className="vote">
//           <p>Voter: {vote.votedBy.name}</p>
//           <p>Selected Options:</p>
//           <ul>
//             {vote.selectedTimes.map((time: string) => (
//               <li key={time}>{time}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrganizerPreview;