import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authToken from '../middlewares/authToken';
import { AuthenticatedRequest } from '../interfaces/AuthenticationRequest';

const prisma = new PrismaClient();
const router = Router();

router.post('/api/events/:eventId', authToken, async (req: AuthenticatedRequest, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.userID;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const { selectedTimes } = req.body;

  
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const vote = await prisma.vote.create({
      data: {
        userId,
        eventId,
        selectedTimes,
      },
      include: {
        votedBy: true, 
      },
    });

    res.json({ message: 'Vote created successfully', vote });
  } catch (error) {
    console.error('Error creating vote:', error);
    res.status(500).json({ error: 'An error occurred while creating the vote' });
  }
});


export default router;
