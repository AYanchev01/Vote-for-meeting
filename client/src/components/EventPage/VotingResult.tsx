import React, { useState } from 'react';

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

type VotingResultsProps = {
  event: EventData;
};

const VotingResult: React.FC<VotingResultsProps> = ({ event }) => {
  const [sortedVotes, setSortedVotes] = useState(event.votes);

  const toggleSort = () => {
    const sorted = [...event.votes];
    sorted.sort((a, b) => b.selectedTimes.length - a.selectedTimes.length);
    setSortedVotes(sorted);
  };

  return (
    <div>
      <h2>Voting Results</h2>
      <button onClick={toggleSort}>Sort by Votes (Most to Least)</button>
      <div className="vote-results">
        <div className="vote-results-header">
          {event.availableTimes.map((time, index) => (
            <div key={index} className="vote-results-cell">
              {time.toString()}
            </div>
          ))}
        </div>
        {sortedVotes.map((vote) => (
          <div key={vote.votedBy.id} className="vote-results-row">
            <div className="vote-results-cell">{vote.votedBy.name}</div>
            {event.availableTimes.map((time, index) => (
              <div key={index} className="vote-results-cell">
                {vote.selectedTimes.includes(time) ? 'X' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingResult;