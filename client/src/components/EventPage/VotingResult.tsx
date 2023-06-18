import React, { useState } from 'react';

type VotingResultProps = {
  voteData: {
    userName: string;
    selectedTimes: string[];
  }[] | null;
  availableTimes: string[];
};

const VotingResult: React.FC<VotingResultProps> = ({ voteData, availableTimes }) => {
  const [sortBy, setSortBy] = useState<string>('');


  if (!voteData) {
    return <div>No votes yet.</div>;
  }

  const sortData = (data: any[], key: string) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (key === 'mostVoted') {
        const countA = a.selectedTimes.filter((time: string) => availableTimes.includes(time)).length;
        const countB = b.selectedTimes.filter((time: string) => availableTimes.includes(time)).length;
        return countB - countA;
      } else if (key === 'dateOrder') {
        return new Date(a.selectedTimes[0]).getTime() - new Date(b.selectedTimes[0]).getTime();
      }
      return 0;
    });
    return sortedData;
  };

  const handleSortByMostVoted = () => {
    setSortBy('mostVoted');
  };

  const handleSortByDateOrder = () => {
    setSortBy('dateOrder');
  };

  const sortedVoteData = sortData(voteData, sortBy);

  return (
    <div>
      <div>
        <button onClick={handleSortByMostVoted}>Sort by Most Voted</button>
        <button onClick={handleSortByDateOrder}>Sort by Date Order</button>
      </div>
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
          {sortedVoteData.map((vote) => (
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