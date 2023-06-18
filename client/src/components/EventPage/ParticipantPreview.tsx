import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VotingResult from './VotingResult';

interface VoteData {
  userName: string;
  selectedTimes: Date[];           //Date[]
}

interface ParticipantPreviewProps {
  event: {
    voteData: VoteData[]; 
    availableTimes: string[];           //Date[]
  };
}

const ParticipantPreview: React.FC<ParticipantPreviewProps> = ({ event }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventData, setEventData] = useState<{
    voteData: VoteData[];
    availableTimes: string[];
  } | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${eventId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setEventData(data))
      .catch((error) => console.error('There has been a problem with your fetch operation:', error));
  }, [eventId]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  console.log('Info', eventData)

  return (
    <div>
      <h1>Response submitted!</h1>
      <p>Results:</p>
      {/* <VotingResult voteData={eventData.voteData} availableTimes={eventData.availableTimes} />   */}
    </div>
  );
};

export default ParticipantPreview;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import VotingResult from './VotingResult';

// type EventData = {
//   voteData: {
//     userName: string;
//     selectedTimes: string[];
//   }[];
//   availableTimes: string[];
// };

// type ParticipantPreviewProps = {
//   event: EventData;
// };

// const ParticipantPreview: React.FC<ParticipantPreviewProps> = () => {    
//   const { eventId } = useParams<{ eventId: string }>();
//   const [event, setEvent] = useState<EventData | null>(null);

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

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Response submitted!</h1>
//       <p>Results:</p>
//       <VotingResult voteData={event.voteData} availableTimes={event.availableTimes} />
//     </div>
//   );
// };