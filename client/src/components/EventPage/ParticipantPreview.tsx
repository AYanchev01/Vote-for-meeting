import React from 'react';
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

  return (
    <div>
      <h1>Response submitted!</h1>
      <VotingResult event={event}/>  
    </div>
  );
};

export default ParticipantPreview;
