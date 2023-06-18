import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Event {
  id: string;
  availableTimes: string[];
}

interface User {
  id: string;
  name: string;
}

const ParticipantVoting: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${eventId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setEvent(data);
        setUser(data.createdBy);
      })
      .catch((error) => console.error('There has been a problem with your fetch operation:', error));
  }, [eventId]);

  const handleCheckboxChange = (time: Date) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((selectedTime: Date) => selectedTime !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const vote = {
      votedBy: user?.name,
      userId: user?.id,
      selectedTimes: selectedTimes,
    };

    fetch(`http://localhost:3001/api/events/${eventId}`, {
      method: 'POST',                                          //PUT
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vote),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Vote submitted successfully');
        alert('Vote submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting vote:', error);
      });
  };

//   fetch(`http://localhost:3001/api/events/${eventId}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(vote),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       console.log('Vote submitted successfully');
//       alert('Vote submitted successfully');
//     })
//     .catch((error) => {
//       console.error('Error submitting vote:', error);
//     });
// };



  if (!event || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Select your preferred times:</p>
      <form onSubmit={handleSubmit}>
        {event.availableTimes.map((time: Date) => (
          <div key={time.getDate()}>
            <label>
              <input
                type="checkbox"
                checked={selectedTimes.includes(time)}
                onChange={() => handleCheckboxChange(time)}
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit Vote</button>
      </form>
    </div>
  );
};

export default ParticipantVoting;