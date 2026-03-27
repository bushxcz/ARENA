export const initialTeams = [
  {
    id: 'team-1',
    name: 'Byte Force',
    code: 'BYTE-7',
    joinedContest: true,
    members: [
      { id: 'member-1', name: 'Riya Patel', email: 'riya@club.dev', role: 'Captain' },
      { id: 'member-2', name: 'Arman Ali', email: 'arman@club.dev', role: 'Problem Solver' },
      { id: 'member-3', name: 'Neha Shah', email: 'neha@club.dev', role: 'Debugger' },
    ],
  },
  {
    id: 'team-2',
    name: 'Algorithmic Owls',
    code: 'ALGO-21',
    joinedContest: false,
    members: [
      { id: 'member-4', name: 'Kabir Sen', email: 'kabir@club.dev', role: 'Captain' },
      { id: 'member-5', name: 'Meera Roy', email: 'meera@club.dev', role: 'Coordinator' },
    ],
  },
  {
    id: 'team-3',
    name: 'Stack Smashers',
    code: 'STACK-3',
    joinedContest: true,
    members: [
      { id: 'member-6', name: 'Aisha Noor', email: 'aisha@club.dev', role: 'Captain' },
      { id: 'member-7', name: 'Rohan Das', email: 'rohan@club.dev', role: 'Reviewer' },
      { id: 'member-8', name: 'Vikram Nair', email: 'vikram@club.dev', role: 'Strategist' },
    ],
  },
]

export const initialRooms = [
  {
    id: 'room-1',
    name: 'Spring Challenge',
    description: 'Three medium-hard problems focused on data structures and optimization.',
    status: 'not_started',
    statusLabel: 'Not Started',
    participants: ['team-1', 'team-3'],
    active: true,
    elapsedSeconds: 0,
    problem: {
      title: 'Balanced Paths',
      summary: 'Find the maximum balanced path score on a weighted grid with directional constraints.',
      description:
        'Given a grid of non-negative values, compute the highest path score from the top-left to bottom-right while limiting direction changes. The solution should scale for club finals and be explained clearly for reviewers.',
      constraints: ['1 ≤ rows, cols ≤ 200', 'O(rows * cols * 3) preferred', 'Memory should remain under 256 MB'],
      example: 'Input: 3 3\n1 4 2\n3 5 1\n2 6 7\nOutput: 18',
      language: 'JavaScript (Node.js 22)',
    },
  },
  {
    id: 'room-2',
    name: 'Night Arena',
    description: 'A rapid contest round designed for pairs and short solution reviews.',
    status: 'paused',
    statusLabel: 'Paused',
    participants: ['team-1'],
    active: false,
    elapsedSeconds: 1432,
    problem: {
      title: 'Token Stream Cleanup',
      summary: 'Normalize a stream of bracket tokens with minimal deletions.',
      description:
        'Players receive a long token stream and must output the minimum deletions required to produce a valid bracketed expression while preserving order. Edge cases matter more than raw implementation size.',
      constraints: ['Input size up to 1e5', 'Linear or near-linear solution expected', 'Return both deletions and resulting length'],
      example: 'Input: ())(()\nOutput: 2 4',
      language: 'JavaScript (Node.js 22)',
    },
  },
]

export const initialMessages = [
  {
    id: 'msg-1',
    userId: 'member-1',
    teamId: 'team-1',
    author: 'Riya Patel',
    text: 'I will handle the grid DP. Can someone verify boundary cases?',
    timestamp: '09:42',
    type: 'user',
  },
  {
    id: 'msg-2',
    userId: 'system',
    teamId: 'team-1',
    author: 'System',
    text: 'Contest room has been prepared. Teams can join now.',
    timestamp: '09:44',
    type: 'system',
  },
]

export const initialLeaderboard = [
  { id: 'lb-1', teamId: 'team-3', teamName: 'Stack Smashers', score: 420, time: '01:08:12', trend: 'up', rank: 1 },
  { id: 'lb-2', teamId: 'team-1', teamName: 'Byte Force', score: 390, time: '01:13:02', trend: 'up', rank: 2 },
  { id: 'lb-3', teamId: 'team-2', teamName: 'Algorithmic Owls', score: 180, time: '00:44:18', trend: 'steady', rank: 3 },
]
