import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import authToken from '../middlewares/authToken';
import { AuthenticatedRequest } from '../interfaces/AuthenticationRequest';

const prisma = new PrismaClient();
const router = Router();

router.get('/api/events/:eventId',authToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.userID;

        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: { 
                votes: true,
                createdBy: true,
            }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Determine the preview type
        let previewType = 'participant';

        if (event.userId === userId) {
            previewType = 'organizer';
        } else {
            const userVote = event.votes.find(vote => vote.userId === userId);
            if (!userVote) {
                previewType = 'voting';
            }
        }
        // Respond with the event information and preview type
        res.json({
            event,
            previewType
        });

    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/api/events', authToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, duration, availableTimes } = req.body;
        const userId = req.userID;

        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const newEvent = await prisma.event.create({
            data: {
              name,
              duration,
              userId,
              availableTimes,
            },
        });

        //Respond with the newly created event
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/api/user/events', authToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userID;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const events = await prisma.event.findMany({
      where: {
        OR: [
          { userId: userId },
          {
            votes: {
              some: {
                votedBy: { id: userId }
              }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        duration: true,
        createdBy: {
          select: {
            name: true
          }
        },
        userId: true
      }
    });

    res.json({
      userId: userId,
      events: events
    });

  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }
});

router.delete('/api/events/:eventId', authToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.userID;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.userId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this event' });
    }
    await prisma.event.delete({
      where: { id: eventId }
    });

    res.json({ message: 'Event successfully deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
