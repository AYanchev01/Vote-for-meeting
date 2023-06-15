import express, { Request, Response } from 'express';
import cors from 'cors';
import mockData from './mockData';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
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

  const event = mockData.find((event) => event.id === eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

app.post('/api/events', (req, res) => {
    // Extract data from the request body
    const { name, duration, customDuration } = req.body;
    
    const newId = mockData.length + 1;
    
    // Create a new event object
    const newEvent = {
        id: newId,
        name: name,
        createdBy: {
            name: 'User',
        },
        createdAt: new Date().toISOString(),
        duration: duration,
        // customDuration ?
    };

    // Write new event to file for testing purpouses
    mockData.push(newEvent);

    const fileContent = `const mockData = ${JSON.stringify(mockData, null, 2)};\n\nexport default mockData;`;

    fs.writeFile(path.join(__dirname, 'mockData.ts'), fileContent, (err) => {
        if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Respond with the newly created event
        res.status(201).json(newEvent);
    });
});

app.get('/events/participate/:eventId', (req, res) => {
    const eventId = req.params.eventId;

    // Logic to add the event with eventId to the user's events in the database
    // Redirect to participant preview of event

    res.redirect(`http://localhost:3000/events/participant/${eventId}`);
});