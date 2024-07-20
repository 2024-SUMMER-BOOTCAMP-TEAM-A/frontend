import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000', {
//   transports: ['websocket', 'polling']
// });

const socket = io('http://34.83.113.214:8000', {
  transports: ['websocket', 'polling']
});

export default socket;
