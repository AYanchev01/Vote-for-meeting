import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ParticipantVoting.css';

const ParticipantVoting: React.FC = () => {
  const [eventId, setEventId] = useState<string>('');
  const [event, setEvent] = useState<any>(null);                         //useState<Event[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);           //does it have to be this
  const [user, setUser] = useState<any>(null);                              //useState<User[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${eventId}`)
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
    fetch(`http://localhost:3001/api/events/${eventId}`) //can i combine all fetches
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
      votedBy: user?.name,   //or id
      userId: user?.id,      //how to get info
      votedTo: eventId,                      //rework
      eventId: eventId,                      //rework
      selectedTimes: selectedTimes,         //???
    };

    // POST request to submit the vote
    fetch('http://localhost:3001/events/${eventId}', {
      //we should post it back to /events/${eventId}
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
        <button type="submit">Submit Vote</button>
      </form>
    </div>
  );
};

export default ParticipantVoting;