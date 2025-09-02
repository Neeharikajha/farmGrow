// controllers/socketController.js
import msg from "../models/Msg.js";

// Function to handle socket.io events
export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
      const newMessage = new msg({ senderId, receiverId, text });
      await newMessage.save();

      io.emit("receiveMessage", newMessage); // send to all clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
