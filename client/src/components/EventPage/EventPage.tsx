import React, { useEffect, useState } from 'react';
import EventInformation from './EventInformation';
import OrganizerPreview from './OrganizerPreview';
import ParticipantPreview from './ParticipantPreview';
import ParticipantVoting from './ParticipantVoting';

const EventPage: React.FC<{ match: any }> = ({ match }) => {
  const [eventData, setEventData] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

//if not logged go to login

  useEffect(() => {
    const eventId = match.params.eventId;
    // Fetch event data from the server
    fetch(`http://localhost:3001/api/events/${eventId}`)                   
      .then((res) => res.json())
      .then((data) => {
        setEventData(data.event);
        setUserRole(data.userRole);
      });
  }, [match.params.eventId]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const { name, createdBy, duration, selectedTimes } = eventData;

  //or switch - think
  return (
    <div>
      <h1>Event Page</h1>
      <EventInformation name={name} creator={createdBy.name} duration={duration} />
      {/* {userRole === 'organizer' ? (
        <OrganizerPreview event={eventData} />
      ) : userRole === 'participant' ? (
        selectedTimes && selectedTimes.length > 0 ? (
          <ParticipantVoting event={eventData} />
        ) : (
          <ParticipantPreview event={eventData} />
        )
      ) : (
        <NotLoggedInMessage />
      )} */}
    </div>
  );
};

export default EventPage;
