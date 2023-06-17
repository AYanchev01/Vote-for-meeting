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