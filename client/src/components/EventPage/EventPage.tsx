import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import OrganizerPreview from "./OrganizerPreview";
import ParticipantPreview from "./ParticipantPreview";
import ParticipantVoting from "./ParticipantVoting";
import EventInformation from "./EventInformation"; 
import './EventPage.css';

const EventPage = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState<any>(); 
  const [previewType, setPreviewType] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const headers = new Headers();
    headers.append('x-auth-token', token || '');
    
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/events/${eventId}`, { headers });
        const data = await response.json();
        setEventData(data.event);
        setPreviewType(data.previewType);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, [eventId]);



  if (!eventData) {
    return <div>Loading...</div>;
  }

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  console.log('Data for event :', eventData)

  return (
    <div>
      <div className="navbar">
        <span className="website-name">Doodle</span>
        <button className="create-event-btn" onClick={handleDashboard}>Dashboard</button>
      </div>
      <EventInformation
        name={eventData.name}
        creator={eventData.createdBy.name}
        duration={eventData.duration}
      />

                      {/* OrganizerPreview */}

      {previewType === "organizer" && <ParticipantVoting event={eventData} />}          
      {/* {previewType === "participant" && <ParticipantPreview event={eventData} />}
      {previewType === "voting" && <ParticipantVoting event={eventData} />} */}
      {/* {previewType !== "organizer" && previewType !== "participant" && previewType !== "voting" && (
        <div>Something went wrong</div>
      )} */}
    </div>
  );
};

export default EventPage;