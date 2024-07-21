import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000', {
//   transports: ['websocket', 'polling']
// });

const socket = io('https://person-a.site', {
  transports: ['websocket', 'polling']
});

export default socket;
