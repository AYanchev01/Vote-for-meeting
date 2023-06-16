import React from 'react';

type VotingResultProps = {
  voteData: {
    userName: string;
    selectedTimes: string[];
  }[];
  availableTimes: string[];
};

const VotingResult: React.FC<VotingResultProps> = ({ voteData, availableTimes }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            {availableTimes.map((time) => (
              <th key={time}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {voteData.map((vote) => (
            <tr key={vote.userName}>
              <td>{vote.userName}</td>
              {availableTimes.map((time) => (
                <td key={time}>{vote.selectedTimes.includes(time) ? 'X' : ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VotingResult;