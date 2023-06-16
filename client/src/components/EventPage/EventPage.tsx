import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();

  return (
    <div>
    </div>
  );
};

export default EventPage;