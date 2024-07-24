import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
  path : '/api/socket.io',
  transports: ['websocket', 'polling']
});

// const socket = io('https://person-a.site', {
//   path: '/api/socket.io',
//   transports: ['websocket', 'polling']
// });

export default socket;