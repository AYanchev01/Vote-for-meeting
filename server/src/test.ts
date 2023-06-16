import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({log: ['query']});


async function seed() {
  // Create mock users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password1',
      name: 'User 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password2',
      name: 'User 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create mock event
  const event = await prisma.event.create({
    data: {
      name: 'Mock Event',
      userId: undefined,        //what
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
    createdAt: new Date(),
    updatedAt: new Date(),
    },
  });

  // Create mock vote
  const vote = await prisma.vote.create({
    data: {
      userId: user2.id,
      eventId: event.id,
      selectedTimes: ['2023-06-16T10:00:00Z'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('Mock data seeded successfully!');
}

seed()
  .catch((error) => {
    console.error('Error seeding mock data:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });