import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ParticipantVoting.css';

const ParticipantVoting: React.FC = () => {
  const [eventId, setEventId] = useState<string>('');
  const [event, setEvent] = useState<any>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/eventId')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setEventId(data.eventId))
      .catch((error) => console.error('There has been a problem with your fetch operation:', error));
  }, []);

  useEffect(() => {
    if (eventId) {
      fetch(`http://localhost:3001/api/events/${eventId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setEvent(data))
        .catch((error) => console.error('There has been a problem with your fetch operation:', error));
    }
  }, [eventId]);

  useEffect(() => {
    fetch('http://localhost:3001/api/user') //we shoul get it again from /events/${eventId}
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => console.error('There has been a problem with your fetch operation:', error));
  }, [eventId]);

  const handleCheckboxChange = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((selectedTime: string) => selectedTime !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Create a vote object
    const vote = {
      votedBy: user?.id,
      userId: user?.id,
      votedTo: event?.id,
      eventId: event?.id,
      selectedTimes: selectedTimes,
    };

    // POST request to submit the vote
    fetch('http://localhost:3001/api/votes', {
      //we shoul post it back to /events/${eventId}
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vote),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Vote submitted successfully');
        alert('Vote submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting vote:', error);
      });
  };

  if (!event || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Select your preferred times:</p>
      <form onSubmit={handleSubmit}>
        {event.availableTimes.map((time: string) => (
          <div key={time}>
            <label>
              <input
                type="checkbox"
                checked={selectedTimes.includes(time)}
                onChange={() => handleCheckboxChange(time)}
              />
              {time}
            </label>
          </div>
        ))}
        <input type="text" value={user.name} readOnly placeholder="Your Name" />
        <button type="submit">Submit Vote</button>
      </form>
    </div>
  );
};

export default ParticipantVoting;