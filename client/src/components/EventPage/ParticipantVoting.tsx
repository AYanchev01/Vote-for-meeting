import React, { useState } from 'react';
import './ParticipantVoting.css';
import { useNavigate } from 'react-router-dom';

interface ParticipantVotingProps {
  event: {
    id: string;
    availableTimes: Date[];
    // Add other properties as needed, including participant information
    participant: {
      id: string;
      name: string;
      // Add other participant properties as needed
    };
  };
}

const ParticipantVoting = ({ event }: ParticipantVotingProps) => {  
  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();


  const handleTimeSelection = (time: Date) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((selectedTime) => selectedTime !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  console.log("Selected times", selectedTimes)

  const handleSubmit = async () => {
    if (submitting || selectedTimes.length === 0) {
      return;
    }

    setSubmitting(true);

    try {
      const vote = {
        userId: event.participant.id,     //but its just the voter who is logged in 's name
        votedBy: event.participant.name,     //but its just the voter who is logged in 's id
        eventId: event.id,
        selectedTimes,
      };

      const token = localStorage.getItem('accessToken');

      const headers = new Headers();
      headers.append('x-auth-token', token || '');
      headers.append('Content-Type', 'application/json');

      const response = await fetch(`http://localhost:3001/api/events/${event.id}/votes`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(vote),
      });

      if (!response.ok) {
        throw new Error('Failed to create vote');
      }

      // Handle successful vote submission

      // Reset selected times
      setSelectedTimes([]);
    } catch (error) {
      console.error('Error creating vote:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='vote-box'>
      <p className='vote-text'>Select your preferred times:</p>
      {event.availableTimes.map((time, index) => (
      <div key={index}>
        <label className='row'>
         <input className='checkbox-style'
            type="checkbox"
            checked={selectedTimes.includes(time)}
            onChange={() => handleTimeSelection(time)}
         />{' '}
         {time.toString()} {/* Convert Date to string */}
       </label>
      </div>
))}

      <button className='submit-button' onClick={handleSubmit} disabled={submitting || selectedTimes.length === 0}>
        Submit Vote
      </button>
    </div>
  );
};

export default ParticipantVoting;