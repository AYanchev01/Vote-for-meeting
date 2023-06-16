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

        const newUser = await prisma.user.create({
          data: {
            email: "Some email",
            password: "pass",
            name: "naem",
          }
        });

        const userId = newUser.id;

        const data = {
          name,
          duration,
          userId,
          availableTimes,
        };

        console.log("Data to be inserted: ", data)

        const newEvent = await prisma.event.create({
            data: data,
        });

        //Respond with the newly created event
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
