import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();


router.get('/api/events/:eventId', async (req, res) => {
  try {
      const eventId = req.params.eventId;
      // const userId = req.user.id;
      const userId = "some uuid"; 

      const event = await prisma.event.findUnique({
          where: { id: eventId },
          include: { 
              votes: true,
              createdBy: true,
              participants: true
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

router.post('/api/events', async (req, res) => {
  try {
    // Create mock users
    const user1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        password: 'password1',
        name: 'User 1',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'user2@example.com',
        password: 'password2',
        name: 'User 2',
      },
    });

    // Create mock event
    const event = await prisma.event.create({
      data: {
        name: 'Mock Event',
        userId: undefined,
        duration: '2 hours',
        availableTimes: ['2023-06-16T10:00:00Z', '2023-06-17T14:00:00Z', '2023-06-18T16:00:00Z'],
        createdBy: {
          connect: {
            id: user1.id,
          },
        },
        participants: {
          connect: {
            id: user2.id,
          },
        },
      },
    });

    // Create mock vote
    const vote = await prisma.vote.create({
      data: {
        userId: user2.id,
        eventId: event.id,
        selectedTimes: ['2023-06-16T10:00:00Z', '2023-06-17T14:00:00Z'],
      },
    });

    res.status(200).json({ message: 'Mock data seeded successfully!' });
  } catch (error) {
    console.error('Error seeding mock data:', error);
    res.status(500).json({ error: 'Error seeding mock data' });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
