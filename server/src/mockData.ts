const mockData = [
  {
    id: 1,
    name: 'Event 1',
    createdBy: {
      name: 'Alice'
    },
    createdAt: '2023-06-12T10:00:00.000Z'
  },
  {
    id: 2,
    name: 'Event 2',
    createdBy: {
      name: 'Bob'
    },
    createdAt: '2023-06-13T11:00:00.000Z'
  },
  {
    id: 3,
    name: 'Event 3',
    createdBy: {
      name: 'Mark'
    },
    createdAt: '2023-06-12T10:00:00.000Z'
  },
  {
    id: 4,
    name: 'Event 4',
    createdBy: {
      name: 'Tony'
    },
    createdAt: '2023-06-13T11:00:00.000Z'
  }
];

export default mockData;

export const mockEvents = [
  {
    id: 1,
    name: "Meeting with team",
    createdBy: {
      id: 1,
      name: "Alice"
    },
    createdAt: "2023-06-10T12:00:00Z",
    participants: [
    ],
    votes: [
    ]
  },
  {
    id: 2,
    name: "Lunch with client",
    createdBy: {
      id: 2,
      name: "Bob"
    },
    createdAt: "2023-06-11T13:00:00Z",
    participants: [
    ],
    votes: [
    ]
  }
];
