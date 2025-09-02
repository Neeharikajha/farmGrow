// controllers/socketController.js
import msg from "../models/Msg.js";

// Function to handle socket.io events
export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
      const newMessage = new msg({ senderId, receiverId, text, type: "message" });
      await newMessage.save();

      io.emit("receiveMessage", newMessage); // send to all clients
    });

     socket.on("sendOffer", async ({ offer, senderId, receiverId }) => {
      const newOffer = new msg({
        senderId,
        receiverId,
        text: `Offer: ₹${offer}`,
        type: "offer",
      });
      await newOffer.save();
      io.emit("receiveOffer", newOffer); 
    }); 

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
