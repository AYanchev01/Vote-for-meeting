import express, { Request, Response } from 'express';
import cors from 'cors';
import mockData from './mockData';
import { mockEvents } from './mockData';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
// Mock API endpoint to fetch events
app.get('/api/events', (req: Request, res: Response) => {
  res.json(mockData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/events/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);

  // Fetch events from db by ID
  // Using mock data for testing purpouses

  const event = mockEvents.find((event) => event.id === eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});