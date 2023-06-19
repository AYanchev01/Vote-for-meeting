import React, { useEffect, useState } from 'react';
import './VotingResults.css';

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

  useEffect(() => {
    setSortedVotes(event.votes);
  }, [event.votes]);

  const sorting = () => {
    const sorted = [...sortedVotes];
    sorted.sort((a, b) => b.selectedTimes.length - a.selectedTimes.length);
    setSortedVotes(sorted);
  };
    
  return (
    <div className="event-info">
      <h2>Voting Results</h2>
       <div className="button-sort-container">
        <button className="sort-button" onClick={sorting}> See who has voted the most </button>
       </div>
      <div className="table-container">
      <table className="vote-results">
        <thead>
          <tr>
            <th className="vote-results-cell voter-name">Name</th>
            {event.availableTimes.map((time, index) => {
              const dateObj = new Date(time);
              const formattedDate = dateObj.toUTCString().replace(" GMT", "").replace(/:\d{2}$/, "");
              return (
                <th key={index} className="vote-results-cell vote-time">
                  {formattedDate}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedVotes.map((vote) => (
            <tr key={vote.votedBy.id}>
              <td className="vote-results-cell voter-name">{vote.votedBy.name}</td>
              {event.availableTimes.map((time, index) => (
                <td
                 key={index}
                  className="vote-results-cell vote-time">
                     {vote.selectedTimes.includes(time) ? "✔️" : ""}
                  </td>
            ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
  
};

export default VotingResult;