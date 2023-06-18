// import { Router, Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// const router = Router();

// router.put('/api/events/:eventId/votes', async (req, res) => {
//     try {
//       const eventId = req.params.eventId;
//       const userId = req.user.id; // Assuming you have user authentication implemented
  
//       // Extract the vote data from the request body
//       const { selectedTimes } = req.body;
  
//       // Retrieve the event from the database
//       const event = await prisma.event.findUnique({
//         where: { id: eventId },
//         include: { votes: true },
//       });
  
//       if (!event) {
//         return res.status(404).json({ message: 'Event not found' });
//       }
  
//       // Check if the user has already voted
//       const userVote = event.votes.find((vote) => vote.userId === userId);
  
//       if (userVote) {
//         // User has already voted, update the selected times
//         await prisma.vote.update({
//           where: { id: userVote.id },
//           data: { selectedTimes },
//         });
//       } else {
//         // User hasn't voted, create a new vote
//         await prisma.vote.create({
//           data: {
//             votedBy: req.user.name,
//             userId,
//             votedTo: event.id,
//             eventId: event.id,
//             selectedTimes,
//           },
//         });
//       }
  
//       res.json({ message: 'Vote submitted successfully' });
//     } catch (error) {
//       console.error('Error submitting vote:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import authToken from '../middlewares/authToken';
import { AuthenticatedRequest } from '../interfaces/AuthenticationRequest';

const prisma = new PrismaClient();
const router = Router();

router.post('/api/events', authToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { eventId, selectedTimes } = req.body;
      const userId = req.userID;
  
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { votes: true },
      });
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      const existingVote = event.votes.find((vote) => vote.userId === userId);
      if (existingVote) {
        return res.status(400).json({ message: 'User has already voted for this event' });
      }
  
      const newVote = await prisma.vote.create({
        data: {
          votedBy: { connect: { id: userId } },
          votedTo: { connect: { id: eventId } },
          selectedTimes,
        },
      });
  
      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: { votes: { connect: { id: newVote.id } } },
        include: { votes: true },
      });
  
      res.status(201).json(updatedEvent);
    } catch (error) {
      console.error('Error creating vote:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  export default router;