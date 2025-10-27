// // services/socket.js (frontend)
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   auth: {
//     // if you have tokens, put them here
//     token: localStorage.getItem("token"),
//     userId: currentUserId,
//   },
//   autoConnect: true,
// });

// export default socket;

// src/services/socket.js
import { io } from "socket.io-client";

// Connect to your backend server
// Use your actual backend URL or localhost during development
const socket = io("http://localhost:5000", {
  autoConnect: false, // we’ll connect manually after user logs in
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
    socket.emit("init", { userId });
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
