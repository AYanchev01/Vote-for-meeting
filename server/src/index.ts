import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/events/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);

  // if (event) {
  //   res.json(event);
  // } else {
  //   res.status(404).json({ message: 'Event not found' });
  // }
});

app.post('/api/events', async (req, res) => {
    try {
        const { name, duration, availableTimes } = req.body;

        const userId = 1; // this should be replaced with the actual user ID
        const eventId = 1; // this should be replaced with the actual event ID
        const data = {
          id : eventId,
          name,
          userId,
          avaliableTimes : availableTimes,
          createdAt: new Date(),
          updatedAt: new Date(),
          duration,
        };

        console.log("Data to be inserted: ", data)
        // Create a new event object in the database

        // const newEvent = await prisma.event.create({
        //     data: data,
        // });

        // Respond with the newly created event
        // res.status(201).json(newEvent);
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});