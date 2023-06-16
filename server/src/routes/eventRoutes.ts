import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/api/events/:eventId', (req: Request, res: Response) => {
  const eventId = parseInt(req.params.eventId, 10);

  // if (event) {
  //   res.json(event);
  // } else {
  //   res.status(404).json({ message: 'Event not found' });
  // }
});

router.post('/api/events', async (req: Request, res: Response) => {
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

export default router;
