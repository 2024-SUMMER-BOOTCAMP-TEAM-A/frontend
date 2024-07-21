import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000/api', {
//   transports: ['websocket', 'polling']
// });

const socket = io('https://person-a.site/api', {
  transports: ['websocket', 'polling']
});

export default socket;
