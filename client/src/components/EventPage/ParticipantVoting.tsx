import React, { useState } from 'react';
import './ParticipantVoting.css';
import { useNavigate } from 'react-router-dom';

type ParticipantVotingProps = { 
  event: {
    id: string;
    availableTimes: Date[];
    participant: {
      id: string;
      name: string;
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

  const handleSubmit = async () => {
    if (submitting || selectedTimes.length === 0) {
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');

      const headers = new Headers();
      headers.append('x-auth-token', token || '');
      headers.append('Content-Type', 'application/json');

      const response = await fetch(`http://localhost:3001/api/events/${event.id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({selectedTimes}),
      });

      if (!response.ok) {
        throw new Error('Failed to create vote');
      }
      setSelectedTimes([]);
      window.location.href = window.location.href;    
    } catch (error) {
      console.error('Error creating vote:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='vote-box'>
      <div>
        <p className='vote-text'>Select your preferred times:</p>
        {event.availableTimes.map((time, index) => {
          const dateObj = new Date(time);
          const formattedDate = dateObj.toUTCString().replace(' GMT', '').replace(/:\d{2}$/, '');
  
          return (
            <div key={index}>
              <label>
                <input
                  className='checkbox-style'
                  type="checkbox"
                  checked={selectedTimes.includes(time)}
                  onChange={() => handleTimeSelection(time)}
                />{' '}
                <div className='checkbox-text-style'>
                  {formattedDate}
                </div>
              </label>
            </div>
          );
        })}
      </div>
      <div className="button-vote-container">
        <button
          className='submit-button'
          onClick={handleSubmit}
          disabled={submitting || selectedTimes.length === 0}
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
};

export default ParticipantVoting;